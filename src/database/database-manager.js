import * as SQLite from 'expo-sqlite/legacy';
const dbName = "database.db"

const databaseConection = {
    getConnection() {
        return SQLite.openDatabase(dbName)
    },

    //Usuario
    async checkTableExistUser(tx) {
        const res = await tx.executeSqlAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", [])
        return res
    },
    async dropTableUser(tx) {
        const res = await tx.executeSqlAsync("DROP TABLE IF EXISTS users", [])
        return res
    },
    async createUserTable(tx) {
        const res = await tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, nom_usuario VARCHAR(50), apellido VARCHAR(50), ci VARCHAR(8), fechaNac date)", [])
        return res
    },
    async createUser(tx, nombre, apellido, ci, fechaNac) {
        const res = await tx.executeSqlAsync("INSERT INTO users (nom_usuario, apellido, ci, fechaNac) VALUES (?, ?, ?, ?)", [nombre, apellido, ci, fechaNac])
        return res
    },
    async updateUser(tx, nombre, apellido, ci, fechaNac, userId) {
        const res = await tx.executeSqlAsync("UPDATE users SET nom_usuario = ?, apellido = ?, ci = ?, fechaNac = ? WHERE user_id = ?", [nombre, apellido, ci, fechaNac, userId])
        return res
    },
    async deleteUser(tx, userId) {
        const res = await tx.executeSqlAsync("DELETE FROM users WHERE user_id = ?", [userId])
        return res
    },
    async getOneUser(tx, nombre) {
        const res = await tx.executeSqlAsync("SELECT * FROM users WHERE nom_usuario like ? or apellido like ?", [nombre, nombre])
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

    async agregarUsuarios(tx) {
        const res = await tx.executeSqlAsync("INSERT INTO users(nom_usuario, apellido, ci, fechaNac) VALUES" +
            "('Henry', 'González', '12345678', '26/09/2001')," +
            "('Juan', 'Pedro', '23232378', '21/02/1998'),"  +
            "('Pepe', 'Garciaz', '87654321', '12/03/1995')," +
            "('Maria', 'Martinez', '1121321', '05/11/1986')" , [])
            console.log("Datos agregados, Usuarios")
            return res
    },

    //Tipo de Maquina
    async checkTableExistTipoMaquina(tx) {
        const res = await tx.executeSqlAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='tipoMaquina'", [])
        return res
    },
    async dropTabletipoMaquina(tx) {
        const res = await tx.executeSqlAsync("DROP TABLE IF EXISTS tipoMaquina", [])
        return res
    },
    async crearTablaTipoMaquina(tx) {
        const res = await tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS tipoMaquina(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50), fotoUrl VARCHAR(200))", [])
        return res
    },
    async createTipoMaquina(tx, nombre, fotoUrl) {
        const res = await tx.executeSqlAsync("INSERT INTO tipoMaquina(nombre, fotoUrl) VALUES (?, ?)", [nombre, fotoUrl])
        return res
    },
    async updateTipoMaquina(tx, nombre, fotoUrl, Id) {
        const res = await tx.executeSqlAsync("UPDATE tipoMaquina SET nombre = ?, fotoUrl = ? WHERE id = ?", [nombre, fotoUrl, Id])
        return res
    },
    async deleteTipoMaquina(tx, Id) {
        const res = await tx.executeSqlAsync("DELETE FROM tipoMaquina WHERE id = ?", [Id])
        return res
    },
    async getOneTipoMaquina(tx, nombre) {
        const res = await tx.executeSqlAsync("SELECT * FROM tipoMaquina WHERE nombre like ?", [nombre])
        return res
    },
    async getAllTipoMaquina(tx) {
        const res = await tx.executeSqlAsync("SELECT * FROM tipoMaquina", [])
        return res
    },
    async deleteAllTipoMaquina(tx) {
        const res = await tx.executeSqlAsync("DELETE FROM tipoMaquina", [])
        return res
    },

    async agregarTipoMaquina(tx) {
        const res = await tx.executeSqlAsync("INSERT INTO tipoMaquina(nombre, fotoUrl) VALUES" +
            "('Polea Doble', 'https://dcdn.mitiendanube.com/stores/001/358/569/products/polea-doble-enfrentada1-40cbf68175faee810116022595090988-640-0.jpg')," +
            "('Eliptica', 'https://www.suplementos.uy/pub/media/catalog/product/cache/b6cd9ba2ecc3ac531fe12d57b014dcd6/e/l/eliptica_sl.jpg')," +
            "('Prensa De Pierna', 'https://cdn.etenonfitness.com/assets/products/PL1018/PL1018%20-%20Etenon%20Uni-Bi-Lateral%20Leg%20Press-large.png')," +
            "('Bicicleta', 'https://www.kangaroofitness.com.au/cdn/shop/files/100_2_2d7a9a63-83df-4d6a-83e6-dff1fe29b518.png?v=1711545867')" , [])
            console.log("Datos agregados, tipoMaquina")
            return res
    },

    //Maquina
    async checkTableExistMaquina(tx) {
        const res = await tx.executeSqlAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='maquina'", [])
        return res
    },
    async dropTableMaquina(tx) {
        const res = await tx.executeSqlAsync("DROP TABLE IF EXISTS maquina", [])
        return res
    },
    async crearTablaMaquina(tx) {
        const res = await tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS maquina(id INTEGER PRIMARY KEY AUTOINCREMENT, tipoMaquina INTEGER, sala INTEGER, FOREIGN KEY (tipoMaquina) REFERENCES tipoMaquina(id))", [])
        return res
    },
    async createMaquina(tx, tipoMaquina, sala) {
        const res = await tx.executeSqlAsync("INSERT INTO maquina (tipoMaquina, sala) VALUES (?, ?)", [tipoMaquina, sala])
        return res
    },
    async updateMaquina(tx, tipoMaquina, sala, Id) {
        const res = await tx.executeSqlAsync("UPDATE maquina SET tipoMaquina = ?, sala = ? WHERE id = ?", [tipoMaquina, sala, Id])
        return res
    },
    async deleteMaquina(tx, Id) {
        const res = await tx.executeSqlAsync("DELETE FROM maquina WHERE id = ?", [Id])
        return res
    },
    async getOneMaquina(tx, nombre) {
        const res = await tx.executeSqlAsync("SELECT tm.nombre, tm.fotoUrl, m.id, m.sala, m.tipoMaquina FROM maquina m inner join tipoMaquina tm on m.tipoMaquina = tm.id WHERE tm.nombre like ?", [nombre])
        return res
    },
    async maquinaEnUsoBD(tx, id) {
        const res = await tx.executeSqlAsync("SELECT * FROM maquina WHERE tipoMaquina = ?", [id])
        console.log(id)
        return res
    },
    async getAllMaquina(tx) {
        const res = await tx.executeSqlAsync("SELECT * FROM maquina", [])
        return res
    },
    async deleteAllMaquina(tx) {
        const res = await tx.executeSqlAsync("DELETE FROM maquina", [])
        return res
    },

    async agregarMaquinas(tx) {
        const res = await tx.executeSqlAsync("INSERT INTO maquina(tipoMaquina, sala) VALUES" +
            "(1, 1)," +
            "(2, 3),"  +
            "(3, 2)," +
            "(1, 2)," +
            "(1, 3),"  +
            "(3, 2)," +
            "(4, 3)" , [])
            console.log("Datos agregados, Maquinas")
            return res
    },


//Ejercicio
    async checkTableExistEjercicio(tx) {
        const res = await tx.executeSqlAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='ejercicio'", [])
        return res
    },
    async dropTableEjercicio(tx) {
        const res = await tx.executeSqlAsync("DROP TABLE IF EXISTS ejercicio", [])
        return res
    },
    async crearTablaEjercicio(tx) {
        const res = await tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS ejercicio(id_ejercicio INTEGER PRIMARY KEY AUTOINCREMENT, nom_ejercicio VARCHAR(50), id_tipoMaquina INTEGER, videoUrl VARCHAR(200), FOREIGN KEY (id_tipoMaquina) REFERENCES tipoMaquina(id))", [])
        return res
    },
    async createEjercicio(tx, nombre, id_tipoMaquina, videoUrl) {
        const res = await tx.executeSqlAsync("INSERT INTO ejercicio(nom_ejercicio, id_tipoMaquina, videoUrl) VALUES (?, ?, ?)", [nombre, id_tipoMaquina, videoUrl])
        return res
    },
    async updateEjercicio(tx, nombre, id_tipoMaquina, videoUrl, Id) {
        const res = await tx.executeSqlAsync("UPDATE ejercicio SET nom_ejercicio = ?, id_tipoMaquina = ?, videoUrl = ? WHERE id_ejercicio  = ?", [nombre, id_tipoMaquina, videoUrl, Id])
        return res
    },
    async deleteEjercicio(tx, Id) {
        const res = await tx.executeSqlAsync("DELETE FROM ejercicio WHERE id_ejercicio  = ?", [Id])
        return res
    },
    async getOneEjercicio(tx, nombre) {
        const res = await tx.executeSqlAsync("SELECT e.*, tm.nombre, tm.fotoUrl FROM ejercicio e left join tipoMaquina tm on e.id_tipoMaquina = tm.id WHERE nom_ejercicio like ?", [nombre])
        return res
    },
    async getAllEjercicio(tx) {
        const res = await tx.executeSqlAsync("SELECT e.*, tm.fotoUrl, tm.nombre FROM ejercicio e left join tipoMaquina tm on e.id_tipoMaquina = tm.id", [])
        return res
    },
    async deleteAllEjercicio(tx) {
        const res = await tx.executeSqlAsync("DELETE FROM ejercicio", [])
        return res
    },

    async agregarEjercicios(tx) {
        const res = await tx.executeSqlAsync("INSERT INTO ejercicio(nom_ejercicio, id_tipoMaquina, videoUrl) VALUES" +
            "('Pecho Cruzado', 1, 'https://www.youtube.com/watch?v=lbUogkeItuc')," +
            "('Calentamiento en Bici', 2, 'https://www.youtube.com/watch?v=Sbv44Rf-5U0'),"  +
            "('Cuádriceps en Prensa', 3, 'https://www.youtube.com/watch?v=D1FvjYNX9QI')," +
            "('Pecho Paloma', 1, 'https://www.youtube.com/watch?v=lbUogkeItuc')," +
            "('Serratos', 1, 'https://www.youtube.com/watch?v=lbUogkeItuc'),"  +
            "('Estiramiento Estrecho', 3, 'https://www.youtube.com/watch?v=D1FvjYNX9QI')," +
            "('Spinning', 4, 'https://www.youtube.com/watch?v=jlHOotjWK_w')," +
            "('Estocadas', null , 'https://www.youtube.com/watch?v=X61IReICHkA')," +
            "('Abdominales', null , 'https://www.youtube.com/watch?v=2tXQbi16EdI')," +
            "('Plancha Abdominal', null  , 'https://www.youtube.com/watch?v=mMieHCr-H0c')" , [])
            console.log("Datos agregados, Ejercicios")
            return res
    },

    //Ejercicio
    async checkTableExistRutina(tx) {
        const res = await tx.executeSqlAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='rutina'", [])
        return res
    },
    async dropTableRutina(tx) {
        const res = await tx.executeSqlAsync("DROP TABLE IF EXISTS rutina", [])
        return res
    },
    async crearTablaRutina(tx) {
        const res = await tx.executeSqlAsync("CREATE TABLE IF NOT EXISTS rutina(id INTEGER PRIMARY KEY AUTOINCREMENT, dia_rutina VARCHAR(10), id_usuario INTEGER, id_ejercicio INTEGER, series INTEGER, repeticiones INTEGER, FOREIGN KEY (id_usuario) REFERENCES usuario(user_id), FOREIGN KEY (id_ejercicio) REFERENCES ejercicio(id_ejercicio))", [])
        return res
    },
    async createRutina(tx, dia, usuario, ejercicio, series, repeticiones) {
        const res = await tx.executeSqlAsync("INSERT INTO rutina(dia_rutina, id_usuario, id_ejercicio, series, repeticiones) VALUES (?, ?, ?, ?, ?)", [dia, usuario, ejercicio, series, repeticiones])
        return res
    },
    async updateRutina(tx, dia, usuario, ejercicio, series, repeticiones, Id) {
        const res = await tx.executeSqlAsync("UPDATE rutina SET dia_rutina = ?, id_usuario = ?, id_ejercicio = ?, series = ?, repeticiones = ? WHERE id = ?", [dia, usuario, ejercicio, series, repeticiones, Id])
        return res
    },
    async deleteRutina(tx, Id) {
        const res = await tx.executeSqlAsync("DELETE FROM rutina WHERE id = ?", [Id])
        return res
    },
    async getOneRutina(tx, nombre) {
        const res = await tx.executeSqlAsync("SELECT r.id, r.dia_rutina, r.series, r.repeticiones, r.id_usuario, r.id_ejercicio, e.nom_ejercicio FROM rutina r inner join users u on r.id_usuario = u.user_id inner join ejercicio e on r.id_ejercicio = e.id_ejercicio WHERE u.nom_usuario like ? order by r.dia_rutina", [nombre])
        return res
    },
    async getAllRutinas(tx) {
        const res = await tx.executeSqlAsync("SELECT r.dia_rutina, r.series, r.repeticiones, u.nom_usuario, e.nom_ejercicio FROM rutina r inner join users u on r.id_usuario = u.user_id inner join ejercicio e on r.id_ejercicio = e.id_ejercicio order by r.dia_rutina", [])
        return res
    },
    async deleteAllRutina(tx) {
        const res = await tx.executeSqlAsync("DELETE FROM rutina", [])
        return res
    },

    async agregarRutinas(tx) {
        const res = await tx.executeSqlAsync("INSERT INTO rutina(dia_rutina, id_usuario, id_ejercicio, series, repeticiones) VALUES" +
            "('Lunes', 1, 1, 4, 12)," +
            "('Lunes', 1, 8, 4, 12)," +
            "('Martes', 1, 2, 4, 12)," +
            "('Martes', 1, 7, 1, 20)," +
            "('Lunes', 1, 4, 4, 10)," +
            "('Lunes', 2, 1, 4, 12)," +
            "('Lunes', 2, 8, 4, 12)," +
            "('Martes', 2, 2, 4, 12)," +
            "('Martes', 3, 7, 1, 20)," +
            "('Martes', 1, 2, 4, 30)," +
            "('Martes', 1, 3, 4, 10)," +
            "('Martes', 1, 9, 4, 100)," +
            "('Lunes', 1, 9, 4, 100)," +
            "('Lunes', 3, 4, 4, 10)" , [])
            console.log("Datos agregados, rutinas")
            return res
    },
}
export default databaseConection