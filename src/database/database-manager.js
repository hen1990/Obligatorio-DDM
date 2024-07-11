import * as SQLite from 'expo-sqlite/legacy';
const dbName = "database.db"

const databaseConection = {
     getConnection() {
        return SQLite.openDatabase(dbName)
    },
    //Usuario
    async checkTableExist(tx) {
        const res = await tx.executeSqlAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", []) 
        return res
    },
    async dropTable(tx) {
        const res = await tx.executeSqlAsync("DROP TABLE IF EXISTS users", [])
        return res
    },
    async createUserTable(tx) {
        const res = await tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50), apellido VARCHAR(50), ci VARCHAR(8), fechaNac date)", [])
        return res
    },
    async createUser(tx, nombre, apellido, ci, fechaNac) {
        const res = await tx.executeSqlAsync("INSERT INTO users (nombre, apellido, ci, fechaNac) VALUES (?, ?, ?, ?)", [nombre, apellido, ci, fechaNac])
        return res
    },
    async updateUser(tx, nombre, apellido, ci, fechaNac, userId) {
        console.log(userId)
        const res = await tx.executeSqlAsync("UPDATE users SET nombre = ?, apellido = ?, ci = ?, fechaNac = ? WHERE user_id = ?", [nombre, apellido, ci, fechaNac, userId]) 
        return res
    },
    async deleteUser(tx, userId) {
        const res = await tx.executeSqlAsync("DELETE FROM users WHERE user_id = ?", [userId])
        return res
    },
    async getOneUser(tx, nombre) {
        const res = await tx.executeSqlAsync("SELECT * FROM users WHERE nombre like ? or apellido like ?", [nombre, nombre])
        return res
    },
    async getAllUsers(tx) {
        const res = await tx.executeSqlAsync("SELECT * FROM users", [])
        return res
    },
    async deleteAllUser(tx) {
        const res = await tx.executeSqlAsync("DELETE FROM users", [])
        return res
    },
}

export default databaseConection