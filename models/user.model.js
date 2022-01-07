const User = require("../schema/user.schema")

const userCollection = {
  addUser: (data) => {
    return new Promise((resolve, reject) => {
      const userData = new User(data)

      User.count(
        {
          email: data.email,
        },
        (err, res) => {
          if (err) {
            reject(err)
          } else if (res > 0) {
            reject("此email已經被註冊了!")
          } else {
            userData
              .save()
              .then((result) => {
                resolve(result)
              })
              .catch((err) => {
                reject(err)
              })
          }
        }
      )
    })
  },
  findOneUser: (userID) => {
    return new Promise((resolve, reject) => {
      User.find(userID, (err, res) => {
        if (err) {
          reject(err)
        } else if (!res.length) {
          reject("noData")
        } else {
          resolve(res)
        }
      })
    })
  },
  findAllUser: () => {
    return new Promise((resolve, reject) => {
      User.find({}, (err, res) => {
        if (err) {
          reject(err)
        } else if (!res.length) {
          reject("noData")
        } else {
          resolve(res)
        }
      })
    })
  },
  patchUser: (_id, data) => {
    return new Promise((resolve, reject) => {
      User.findByIdAndUpdate(_id, data, (err, res) => {
        if (err) {
          reject(err)
        } else if (res.matchedCount === 0) {
          reject("noData")
        } else {
          resolve(res)
        }
      })
    })
  },
  deleteUser: (_id) => {
    return new Promise((resolve, reject) => {
      User.findByIdAndDelete(_id, (err, res) => {
        if (err) {
          reject(err)
        } else if (res.deletedCount === 0) {
          reject("noData")
        } else {
          resolve(res)
        }
      })
    })
  },
}

module.exports = userCollection
