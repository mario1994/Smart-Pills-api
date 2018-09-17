const database		  = require('../../knex/knex.js');         // define database based on above
const bcrypt          = require('bcrypt-nodejs');                        // bcrypt will encrypt passwords to be saved in db
const crypto          = require('crypto') 
const debug = require('debug')('my-namespace')

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, salt ,null,(err, hash) => {
      err ? reject(err) : resolve(hash)
    })
  )
}
const createUser = (user) => {
  return database.raw(
    "INSERT INTO users (email, first_name, last_name, date_of_birth, password_digest, token, created_at) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id, email, first_name, last_name, date_of_birth, token, created_at",
    [user.email, user.first_name, user.last_name,user.date_of_birth,user.password_digest, user.token, new Date()]
  )
  .then((data) => data.rows[0])
  .catch((error) => {
      return new Promise((resolve, reject) => {
        reject("invalid user registration data sent");
        })
    })
}

const createToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, data) => {
      err ? reject(err) : resolve(data.toString('base64'))
    })
  })
}

const signup = (request, response) => {
  const user = request.body
  hashPassword(user.password)
    .then((hashedPassword) => {
      delete user.password
      user.password_digest = hashedPassword
    })
    .then(() => createToken())
    .then(token => user.token = token)
    .then(() => createUser(user))
    .then(user => {
      delete user.password_digest
      user.bottles = [];
      response.status(201).json(user)
    })
    .catch((error) => {
      response.status(404).json({error});
    })
}

const findUserByEmail = (userReq) => {
  return database.raw("SELECT * FROM users WHERE email = ?", [userReq.email])
    .then((data) => {
      if(data.rowCount !=0){
        return data.rows[0];
      }else{
        return new Promise((resolve, reject) => {
        reject({"error":"user not found"});
        })
      }
    })
}

const findUserById = (userReq) => {
  return database.raw("SELECT * FROM users WHERE id = ?", [userReq.id])
    .then((data) => {
      if(data.rowCount !=0){
        return data.rows[0];
      }else{
        return new Promise((resolve, reject) => {
        reject({"error":"user not found"});
        })
      }
    })
}

const checkUserToken = (userReq) => {
  return database.raw("SELECT * FROM users WHERE id = ? AND token = ?", [userReq.id,userReq.token])
  .then((data) => {
      if(data.rowCount !=0){
        return data.rows[0];
      }else{
        return new Promise((resolve, reject) => {
        reject({"error":"user not loggedIn"});
        })
      }
    })
}

const checkPassword = (reqPassword, foundUser) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(reqPassword, foundUser.password_digest, (err, response) => {
        if (err) {
          reject(err)
        }
        else if (response) {
          resolve(response)
        } else {
          reject({"message":"passwords do not match"});
        }
    })
  )
}

const findUserBottles = (user_id) => {
  return database.raw("SELECT * FROM bottles WHERE user_id = ?",[user_id])
    .then((data)=> {
        var bottles = [];
        for  (var i = 0; i < data.rowCount; i++){
        bottles.push(data.rows[i].bottle_id);
      }
        return bottles;
    })
  }

const checkIfUserIsloggedIn = (request, response) => {
  debug(request.session.id);
  const userReq = request.body
  let user
     checkUserToken(userReq)
    .then(checkedUser => {
      delete checkedUser.password_digest
      response.status(200).json(checkedUser)
    })
    .catch(err => {
      debug(err);
      response.status(404).json(err);
    })
  }

const updateUserToken = (token, user) => {
  return database.raw("UPDATE users SET token = ? WHERE id = ? RETURNING id, email, token", [token, user.id])
    .then((data) => data.rows[0])
}

const signin = (request, response) => {
  const userReq = request.body
  let user
  	 findUserByEmail(userReq)
    .then(foundUser => {
      user = foundUser
      return checkPassword(userReq.password, foundUser)
      })
    .then((res) => createToken())
    .then(token => updateUserToken(token, user))
    .then(() => findUserBottles(user.id))
    .then((bottleArray) => {
      delete user.password_digest
      user.bottles = bottleArray;
      response.status(200).json(user)
    })
    .catch(err => {
      debug(err);
      response.status(404).json(err);
    })
}

// don't forget to export!
module.exports = {
  signup,
  signin,
}