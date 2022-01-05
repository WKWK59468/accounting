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
  fetchOneUser: (userName) => {
    return new Promise((resolve, reject) => {
      User.find(userName, (err, res) => {
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
}

module.exports = userCollection
