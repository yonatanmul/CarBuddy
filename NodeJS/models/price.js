const db = require('../util/database');


module.exports = class Price {
    constructor(item, maker, category, model, supplier, warranty, price) {
        this.item = item;
        this.maker = maker;
        this.category = category;
        this.model = model;
        this.supplier = supplier;
        this.warranty = warranty;
        this.price = price;
    }


    save() {
        return db.execute(
            'INSERT INTO prices (`item`,`maker`,`category`,`model`,`supplier`,`warranty`,`price`) VALUES (?,?,?,?,?,?,?)',
            [this.item, this.maker, this.category, this.model, this.supplier, this.warranty, this.price]
        );
    }


    static getAll() {
        return db.execute('SELECT * FROM prices');
    }


    static getByCategory(category) {
        return db.execute('SELECT * FROM prices WHERE category = ?', [category]);
    }
};
