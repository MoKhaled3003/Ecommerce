const {sequelize} = require("../models/index");

module.exports.ProductsService = class {
  async  findAll (category_id){
    let result = await sequelize.query(`select *
    from Products 
    inner join
    (
    select product_id,provider_id,price from Provider_Products where product_id in 
    (select id from Products where category_id in (select id from Categories where parent_id = ${category_id} or category_id = ${category_id}))
    and available = 1
    ) res on res.product_id = Products.id
    order by price`)
  }
}