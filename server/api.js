const mysql = require('mysql')
const dbConfig = require('./db')
const sqlMap = require('./sqlMap')
const path = require('path')
var resultJson = ''
const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true // 多语句查询
})

module.exports = {
  getName: function (req, res, next) {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log('getName success')
      const sql = sqlMap.getName
        connection.query(sql, (err, result) => {
          if (err) {
            console.log(err.stack)
          }
          resultJson = JSON.stringify(result)
          console.log(resultJson)
          res.json(result)
          connection.release()
        })
    }
})
  },
  setValue(req, res, next) {
    console.log(req.body)
    const id = req.body.id
    const name = req.body.name
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err.stack)
      }
      const sql = sqlMap.setValue
      connection.query(sql, [name, id], (err, result) => {
        if (err) {
        console.log(err.stack)
      }
        res.json(result)
        connection.release()
      })
    })
  },
  setUser(req, res, next) {
    console.log(req.body)
    const name = req.body.name
    const password = req.body.password
    const address = req.body.address
    const avatar = req.body.avatar
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log('setUser success')
      const sql = sqlMap.setUser
      connection.query(sql, [name, password, address, avatar], (err, result) => {
        if (err) {
          console.log(err.stack)
        }
        res.json(result)
        connection.release()
      })
    }
    }
    )
  },
  getAddress: function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    req.header('Access-Control-Allow-Origin', '*')
    req.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
    req.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    const name = req.query.name
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log('getAddress success')
        const sql = sqlMap.getAddress
        connection.query(sql, [name], (err, result) => {
          if (err) {
            console.log(err.stack)
          }
          res.json(result)
          connection.release()
        })
      }
    })
  },
  addUser(req, res, next) {
    const name = req.body.name
    const password = req.body.password
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log('addUser success')
        const sql = sqlMap.addUser
        connection.query(sql, [name, password], (err, result) => {
          if (err) {
            console.log(err.stack)
          }
          res.json(result)
          connection.release()
        })
      }
    })
  },
  deleteUser(req, res, next) {
    const name = req.body.name
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log('deleteUser success')
        const sql = sqlMap.deleteUser
        connection.query(sql, [name], (err, result) => {
          if (err) {
            console.log(err.stack)
          }
          res.json(result)
          connection.release()
        })
      }
    })
  },
  getLogin(req, res, next) {
    const name = req.query.name
    const password = req.query.password
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log('getLogin success')
        const sql = sqlMap.getLogin
        connection.query(sql, [name, password], (err, result) => {
          if (err) {
            console.log(err.stack)
          }
          res.json(result)
          connection.release()
        })
      }
    })
  },
  getSeller(req, res, next) {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log('getSeller success')
        const sql = sqlMap.getSeller
        connection.query(sql, (err, result) => {
          if (err) {
            console.log(err.stack)
          }
          res.json(result)
          connection.release()
        })
      }
    })
  },
  getSellerID (req, res, next) {
    const id = req.query.id
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log('getSellerID success')
        const sql = sqlMap.getSellerID
        connection.query(sql, [id], (err, result) => {
          if (err) {
            console.log(err.stack)
          }
          res.json(result)
          connection.release()
        })
      }
    })
    },
  getGoods (req, res, next) {
    const seller_id = req.query.id
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log('getGoods success')
        const sql = sqlMap.getGoods
        connection.query(sql, [seller_id], (err, result) => {
          if (err) {
            console.log(err.stack)
          }
          res.json(result)
          connection.release()
        })
      }
    })
  },
  getGoodsType (req, res, next) {
    const goods_id = req.query.id
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log('getGoodsType success')
        const sql = sqlMap.getGoodsType
        connection.query(sql, [goods_id], (err, result) => {
          if (err) {
            console.log(err.stack)
          }
          res.json(result)
          connection.release()
        })
      }
    })
  },
  getTypenum (req, res, next) {
    const goods_id = req.query.id
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log('getGoodsType success')
        const sql = sqlMap.getGoodsType
        connection.query(sql, [goods_id], (err, result) => {
          if (err) {
            console.log(err.stack)
          }
          res.json(result)
          connection.release()
        })
      }
    })
  },
  getSignup (req, res, next) {
    const name = req.query.name
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log('getSignup success')
        const sql = sqlMap.getSignup
        connection.query(sql, [name], (err, result) => {
          if (err) {
            console.log(err.stack)
          }
          res.json(result)
          connection.release()
        })
      }
    })
  }
}
