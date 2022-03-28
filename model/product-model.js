const db = require('../config/db');

class Product {

    static getProducts(cb) {
        const sql = `SELECT * FROM product_info`;

        db.query(sql, (err, row) => {
            cb(err, row)
        })
    }

    static getProduct(id, cb) {
        let sql = `SELECT * FROM product_info WHERE id = ?`;

        // let id = req.params.id

        db.query(sql, [id], (err, row) => {
            cb(err, row)
        })
    }

    // static addProduct(body, cb) {
    //     let sql = `INSERT INTO product_info
    //     (id, name, quantity, price)
    //     VALUES(?,?,?,?)`;

    //     const dataProduct = [
    //         body.id,
    //         body.name,
    //         body.quantity,
    //         body.price
    //     ];

    //     db.query(sql, dataProduct, (err, row) => {
    //         cb(err, row)
    //     })
    // }

    static addProduct(data) {
        let sql = `INSERT INTO product_info
        (id, name, quantity, price)
        VALUES(?,?,?,?)`;

        const dataProduct = [
            data.id,
            data.name,
            data.quantity,
            data.price
        ];

        return new Promise ((resolve, reject) => {
            db.query(sql, dataProduct, (err, result) => {
                resolve(result);
                reject(err);
            })
    
        })
    }

    static findId(id) {
        let sql = `SELECT id FROM product_info WHERE id = ${id}`

        return new Promise ((resolve, reject) => {
            db.query(sql, (err, result) => {
                resolve(result);
                reject(err);
            })
        })
    }

    static updateProduct(req, cb) {
        let sql = `UPDATE product_info SET
        name = ?,
        quantity = ?,
        price = ?
        WHERE id = ?`;

        let data = req.body

        const dataProduct = [
            data.name,
            data.quantity,
            data.price,
            req.params.id
        ];

        db.query(sql, dataProduct, (err, row) => {
            cb(err, row)
        })

    }

    static deleteProduct(id, cb) {
        let sql = `DELETE FROM product_info WHERE id = ?`;

        db.query(sql, [id], (err, row) => {
            cb(err, row)
        })
    }
};

module.exports = Product