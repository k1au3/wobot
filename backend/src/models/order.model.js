const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class OrderModel{

    ordersTable = 'order_tbl';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.ordersTable}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.ordersTable}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    addOrder = async ({ order_name, order_category, order_rating, order_img, order_price, discount_rate, discount_price }) => {
    
        const sql = `INSERT INTO ${this.ordersTable}
        (order_name, order_category, order_rating, order_img, order_price, discount_rate, discount_price) VALUES (?,?,?,?,?,?,?)`;
        
        const result = await query(sql, [order_name, order_category, order_rating, order_img, order_price, discount_rate, discount_price]);
        
        
        const affectedRows = result ? result.affectedRows : 0;
        
        return affectedRows;
    }

    delete = async (id) => {
        // const sql = `DELETE FROM ${this.tableName}
        const sql = `DELETE FROM ${this.ordersTable}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new OrderModel;