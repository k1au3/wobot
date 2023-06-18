const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
class UserModel {
    tableName = 'user';
    ordersTable = 'order_tbl';

    find = async (params = {}) => {
        // let sql = `SELECT * FROM ${this.tableName}`;
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

        // const sql = `SELECT * FROM ${this.tableName}
        const sql = `SELECT * FROM ${this.ordersTable}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    create = async ({ username, password, first_name, last_name, email, age = 0 }) => {
        console.log('Request body >>>>', {
            username:username, 
            password:password, 
            first_name:first_name, 
            last_name:last_name, 
            email:email, 
            age:age });

        // const sql = `INSERT INTO ${this.tableName}
        // (username, password, first_name, last_name, email, age) VALUES (?,?,?,?,?,?,?)`;

        // Calls the stored procedure
        const sql = 'CALL insert_data(?,?,?,?,?,?)';
        
        const result = await query(sql, [username, password, first_name, last_name, email, age]);
        
        const affectedRows = result ? result.affectedRows : 0;
        
        return affectedRows;
    }

    addOrder = async ({ order_name, order_category, order_rating, order_img, order_price, discount_rate, discount_price }) => {

        const sql = `INSERT INTO ${this.ordersTable}
        (order_name, order_category, order_rating, order_img, order_price, discount_rate, discount_price) VALUES (?,?,?,?,?,?,?)`;
        
        const result = await query(sql, [order_name, order_category, order_rating, order_img, order_price, discount_rate, discount_price]);
        
        
        const affectedRows = result ? result.affectedRows : 0;
        
        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE user SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        // const sql = `DELETE FROM ${this.tableName}
        const sql = `DELETE FROM ${this.ordersTable}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    deleteAll = async (params = {}) => {
        // const sql = `DELETE FROM ${this.tableName}
        const sql = `DELETE FROM ${this.ordersTable}`;
        const result = await query(sql);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new UserModel;