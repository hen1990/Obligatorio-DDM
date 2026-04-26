import * as SQLite from 'expo-sqlite';

const dbName = "database.db"
let db = null;

const databaseConnection = {
    async getConnection() {
        if (!db) {
            db = await SQLite.openDatabaseAsync(dbName);
        }
        return db;
    },

    // Usuario
    async checkTableExistUser() {
        const database = await this.getConnection();
        return await database.getFirstAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='users'");
    },

    async dropTableUser() {
        const database = await this.getConnection();
        return await database.runAsync("DROP TABLE IF EXISTS users");
    },

    async createUserTable() {
        const database = await this.getConnection();
        return await database.runAsync("CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, nom_usuario VARCHAR(50), apellido VARCHAR(50), ci VARCHAR(8), fechaNac date)");
    },

    async createUser(nombre, apellido, ci, fechaNac) {
        const database = await this.getConnection();
        const result = await database.runAsync(`INSERT INTO users (nom_usuario, apellido, ci, fechaNac) VALUES (?, ?, ?, ?)`, [nombre, apellido, ci, fechaNac]);
        return { rowsAffected: result.changes };
    },

    async updateUser(nombre, apellido, ci, fechaNac, userId) {
        const database = await this.getConnection();
        const result = await database.runAsync(`UPDATE users SET nom_usuario = ?, apellido = ?, ci = ?, fechaNac = ? WHERE user_id = ?`, [nombre, apellido, ci, fechaNac, userId]);
        return { rowsAffected: result.changes };
    },

    async deleteUser(userId) {
        const database = await this.getConnection();
        const result = await database.runAsync(`DELETE FROM users WHERE user_id = ?`, [userId]);
        return { rowsAffected: result.changes };
    },

    async getOneUser(usuario) {
        const database = await this.getConnection();
        const searchTerm = `%${usuario}%`;
        const rows = await database.getAllAsync(`SELECT * FROM users WHERE nom_usuario like ? or apellido like ? or ci like ?`, [searchTerm, searchTerm, searchTerm]);
        return { rows };
    },

    async getAllUsers() {
        const database = await this.getConnection();
        const rows = await database.getAllAsync("SELECT * FROM users");
        return { rows };
    },

    async deleteAllUser() {
        const database = await this.getConnection();
        const result = await database.runAsync("DELETE FROM users");
        return { rowsAffected: result.changes };
    },

    async usuarioExisteDB(ci) {
        const database = await this.getConnection();
        const rows = await database.getAllAsync(`SELECT * FROM users WHERE ci = ?`, [ci]);
        return { rows };
    },

    async agregarUsuarios() {
        const database = await this.getConnection();
        return await database.execAsync(`INSERT INTO users(nom_usuario, apellido, ci, fechaNac) VALUES
            ('Henry', 'González', '12345678', '26/09/2001'),
            ('Juan', 'Pedro', '23232378', '21/02/1998'),
            ('Pepe', 'Garciaz', '87654321', '12/03/1995'),
            ('Maria', 'Martinez', '1121321', '05/11/1986')`);
    },

    // Tipo de Maquina
    async checkTableExistTipoMaquina() {
        const database = await this.getConnection();
        return await database.getFirstAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='tipoMaquina'");
    },

    async dropTabletipoMaquina() {
        const database = await this.getConnection();
        return await database.runAsync("DROP TABLE IF EXISTS tipoMaquina");
    },

    async crearTablaTipoMaquina() {
        const database = await this.getConnection();
        return await database.runAsync("CREATE TABLE IF NOT EXISTS tipoMaquina(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50), fotoUrl VARCHAR(200))");
    },

    async createTipoMaquina(nombre, fotoUrl) {
        const database = await this.getConnection();
        const result = await database.runAsync(`INSERT INTO tipoMaquina(nombre, fotoUrl) VALUES (?, ?)`, [nombre, fotoUrl]);
        return { rowsAffected: result.changes };
    },

    async updateTipoMaquina(nombre, fotoUrl, Id) {
        const database = await this.getConnection();
        const result = await database.runAsync(`UPDATE tipoMaquina SET nombre = ?, fotoUrl = ? WHERE id = ?`, [nombre, fotoUrl, Id]);
        return { rowsAffected: result.changes };
    },

    async deleteTipoMaquina(Id) {
        const database = await this.getConnection();
        const result = await database.runAsync(`DELETE FROM tipoMaquina WHERE id = ?`, [Id]);
        return { rowsAffected: result.changes };
    },

    async getOneTipoMaquina(nombre) {
        const database = await this.getConnection();
        const searchTerm = `%${nombre}%`;
        const rows = await database.getAllAsync(`SELECT * FROM tipoMaquina WHERE nombre like ?`, [searchTerm]);
        return { rows };
    },

    async getAllTipoMaquina() {
        const database = await this.getConnection();
        const rows = await database.getAllAsync("SELECT * FROM tipoMaquina");
        return { rows };
    },

    async deleteAllTipoMaquina() {
        const database = await this.getConnection();
        const result = await database.runAsync("DELETE FROM tipoMaquina");
        return { rowsAffected: result.changes };
    },

    async agregarTipoMaquina() {
        const database = await this.getConnection();
        return await database.execAsync(`INSERT INTO tipoMaquina(nombre, fotoUrl) VALUES
            ('Polea Doble', 'https://dcdn.mitiendanube.com/stores/001/358/569/products/polea-doble-enfrentada1-40cbf68175faee810116022595090988-640-0.jpg'),
            ('Eliptica', 'https://www.suplementos.uy/pub/media/catalog/product/cache/b6cd9ba2ecc3ac531fe12d57b014dcd6/e/l/eliptica_sl.jpg'),
            ('Prensa De Pierna', 'https://cdn.etenonfitness.com/assets/products/PL1018/PL1018%20-%20Etenon%20Uni-Bi-Lateral%20Leg%20Press-large.png'),
            ('Bicicleta', 'https://www.kangaroofitness.com.au/cdn/shop/files/100_2_2d7a9a63-83df-4d6a-83e6-dff1fe29b518.png?v=1711545867')`);
    },

    // Maquina
    async checkTableExistMaquina() {
        const database = await this.getConnection();
        return await database.getFirstAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='maquina'");
    },

    async dropTableMaquina() {
        const database = await this.getConnection();
        return await database.runAsync("DROP TABLE IF EXISTS maquina");
    },

    async crearTablaMaquina() {
        const database = await this.getConnection();
        return await database.runAsync("CREATE TABLE IF NOT EXISTS maquina(id INTEGER PRIMARY KEY AUTOINCREMENT, tipoMaquina INTEGER, sala INTEGER, FOREIGN KEY (tipoMaquina) REFERENCES tipoMaquina(id))");
    },

    async createMaquina(tipoMaquina, sala) {
        const database = await this.getConnection();
        const result = await database.runAsync(`INSERT INTO maquina (tipoMaquina, sala) VALUES (?, ?)`, [tipoMaquina, sala]);
        return { rowsAffected: result.changes };
    },

    async updateMaquina(tipoMaquina, sala, Id) {
        const database = await this.getConnection();
        const result = await database.runAsync(`UPDATE maquina SET tipoMaquina = ?, sala = ? WHERE id = ?`, [tipoMaquina, sala, Id]);
        return { rowsAffected: result.changes };
    },

    async deleteMaquina(Id) {
        const database = await this.getConnection();
        const result = await database.runAsync(`DELETE FROM maquina WHERE id = ?`, [Id]);
        return { rowsAffected: result.changes };
    },

    async getOneMaquina(nombre) {
        const database = await this.getConnection();
        const searchTerm = `%${nombre}%`;
        const rows = await database.getAllAsync(`SELECT tm.nombre, tm.fotoUrl, m.id, m.sala, m.tipoMaquina FROM maquina m inner join tipoMaquina tm on m.tipoMaquina = tm.id WHERE tm.nombre like ?`, [searchTerm]);
        return { rows };
    },

    async maquinaEnUsoBD(id) {
        const database = await this.getConnection();
        const rows = await database.getAllAsync(`SELECT * FROM maquina WHERE tipoMaquina = ?`, [id]);
        return { rows };
    },

    async getAllMaquina() {
        const database = await this.getConnection();
        const rows = await database.getAllAsync("SELECT * FROM maquina");
        return { rows };
    },

    async deleteAllMaquina() {
        const database = await this.getConnection();
        const result = await database.runAsync("DELETE FROM maquina");
        return { rowsAffected: result.changes };
    },

    // Ejercicio
    async checkTableExistEjercicio() {
        const database = await this.getConnection();
        return await database.getFirstAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='ejercicio'");
    },

    async dropTableEjercicio() {
        const database = await this.getConnection();
        return await database.runAsync("DROP TABLE IF EXISTS ejercicio");
    },

    async crearTablaEjercicio() {
        const database = await this.getConnection();
        return await database.runAsync("CREATE TABLE IF NOT EXISTS ejercicio(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50), maquina INTEGER, FOREIGN KEY (maquina) REFERENCES maquina(id))");
    },

    async createEjercicio(nombre, maquina) {
        const database = await this.getConnection();
        const result = await database.runAsync(`INSERT INTO ejercicio (nombre, maquina) VALUES (?, ?)`, [nombre, maquina]);
        return { rowsAffected: result.changes };
    },

    async updateEjercicio(nombre, maquina, id) {
        const database = await this.getConnection();
        const result = await database.runAsync(`UPDATE ejercicio SET nombre = ?, maquina = ? WHERE id = ?`, [nombre, maquina, id]);
        return { rowsAffected: result.changes };
    },

    async deleteEjercicio(id) {
        const database = await this.getConnection();
        const result = await database.runAsync(`DELETE FROM ejercicio WHERE id = ?`, [id]);
        return { rowsAffected: result.changes };
    },

    async getOneEjercicio(nombre) {
        const database = await this.getConnection();
        const searchTerm = `%${nombre}%`;
        const rows = await database.getAllAsync(`SELECT * FROM ejercicio WHERE nombre like ?`, [searchTerm]);
        return { rows };
    },

    async getAllEjercicio() {
        const database = await this.getConnection();
        const rows = await database.getAllAsync("SELECT * FROM ejercicio");
        return { rows };
    },

    async deleteAllEjercicio() {
        const database = await this.getConnection();
        const result = await database.runAsync("DELETE FROM ejercicio");
        return { rowsAffected: result.changes };
    },

    // Rutina
    async checkTableExistRutina() {
        const database = await this.getConnection();
        return await database.getFirstAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='rutina'");
    },

    async dropTableRutina() {
        const database = await this.getConnection();
        return await database.runAsync("DROP TABLE IF EXISTS rutina");
    },

    async crearTablaRutina() {
        const database = await this.getConnection();
        return await database.runAsync("CREATE TABLE IF NOT EXISTS rutina(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50), ejercicio INTEGER, FOREIGN KEY (ejercicio) REFERENCES ejercicio(id))");
    },

    async createRutina(nombre, ejercicio) {
        const database = await this.getConnection();
        const result = await database.runAsync(`INSERT INTO rutina (nombre, ejercicio) VALUES (?, ?)`, [nombre, ejercicio]);
        return { rowsAffected: result.changes };
    },

    async updateRutina(nombre, ejercicio, id) {
        const database = await this.getConnection();
        const result = await database.runAsync(`UPDATE rutina SET nombre = ?, ejercicio = ? WHERE id = ?`, [nombre, ejercicio, id]);
        return { rowsAffected: result.changes };
    },

    async deleteRutina(id) {
        const database = await this.getConnection();
        const result = await database.runAsync(`DELETE FROM rutina WHERE id = ?`, [id]);
        return { rowsAffected: result.changes };
    },

    async getOneRutina(nombre) {
        const database = await this.getConnection();
        const searchTerm = `%${nombre}%`;
        const rows = await database.getAllAsync(`SELECT * FROM rutina WHERE nombre like ?`, [searchTerm]);
        return { rows };
    },

    async getAllRutina() {
        const database = await this.getConnection();
        const rows = await database.getAllAsync("SELECT * FROM rutina");
        return { rows };
    },

    async deleteAllRutina() {
        const database = await this.getConnection();
        const result = await database.runAsync("DELETE FROM rutina");
        return { rowsAffected: result.changes };
    },
};

export default databaseConnection;
