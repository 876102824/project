const express = require('express')
const router = express.Router()
const api = require('./api')

router.get('/getName', (req, res, next) => {
  api.getName(req, res, next)
})
router.get('/getAddress', (req, res, next) => {
  api.getAddress(req, res, next)
})
router.get('/getLogin', (req, res, next) => {
  api.getLogin(req, res, next)
})
router.get('/getSignup', (req, res, next) => {
  api.getSignup(req, res, next)
})
router.get('/getGoods', (req, res, next) => {
  api.getGoods(req, res, next)
})
router.get('/getSeller', (req, res, next) => {
  api.getSeller(req, res, next)
})
router.get('/getGoodsType', (req, res, next) => {
  api.getGoodsType(req, res, next)
})
router.get('/getTypenum', (req, res, next) => {
  api.getTypenum(req, res, next)
})
router.get('/getSellerID', (req, res, next) => {
  api.getSellerID(req, res, next)
})
router.post('/setValue', (req, res, next) => {
  api.setValue(req, res, next)
})
router.post('/setUser', (req, res, next) => {
  api.setUser(req, res, next)
})
router.post('/addUser', (req, res, next) => {
  api.addUser(req, res, next)
})
router.post('/deleteUser', (req, res, next) => {
  api.deleteUser(req, res, next)
})

module.exports = router
