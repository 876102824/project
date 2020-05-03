const sqlMap = {
  getName: 'SELECT * FROM user ',
  setValue: 'UPDATE user SET name = ? WHERE id = ?',
  setUser: 'insert into user  (name, password, address, avatar) values(?,?,?,?)',
  deleteUser: 'DELETE FROM user WHERE name = ?',
  getAddress: 'SELECT * FROM user WHERE name = ?',
  addUser: 'insert into user (name, password) values(?, ?)',
  getLogin: 'select count(*) as count from user where name = ? and password = ?',
  getSignup: 'select count(*) as count from user where name = ?',
  getSeller: 'select * from seller',
  getSellerID: 'select * from seller where id=?',
  getGoods: 'select * from seller_goods where seller_id=?',
  getGoodsType: 'select * from goodsType where goods_id=?',
  getTypenum: 'select count(*) as count from goodsType where goods_id=?'
}

module.exports = sqlMap
