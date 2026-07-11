const db = require('../util/database');
module.exports = class User {
    constructor(username, password, fname, lname, email, phone, idnum, birth, city, license, plate) {
        this.username = username;
        this.password = password;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.phone = phone;
        this.idnum = idnum;
        this.birth = birth;
        this.city = city;
        this.license = license;
        this.plate = plate;
    }
    save() {
        return db.execute(
            'INSERT INTO users (`username`,`password`,`fname`,`lname`,`email`,`phone`,`idnum`,`birth`,`city`,`license`,`plate`) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
[this.username, this.password, this.fname, this.lname, this.email, this.phone, this.idnum, this.birth, this.city, this.license, this.plate]
        );
    }
    static getByName(username) {
        return db.execute('SELECT * FROM users WHERE username=?', [username]);
    }
};