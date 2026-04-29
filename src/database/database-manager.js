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
        await database.runAsync("CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, nom_usuario VARCHAR(50), apellido VARCHAR(50), ci VARCHAR(8), fechaNac date, rol_id INTEGER NOT NULL, FOREIGN KEY (rol_id) REFERENCES rol(id))");

        const columns = await database.getAllAsync("PRAGMA table_info(users)");
        const hasRolId = columns.some(col => col.name === 'rol_id');
        if (!hasRolId) {
            await database.runAsync("ALTER TABLE users ADD COLUMN rol_id INTEGER REFERENCES rol(id)");
        }

        return true;
    },

    async createUser(nombre, apellido, ci, fechaNac, rolId) {
        const database = await this.getConnection();
        const result = await database.runAsync(`INSERT INTO users (nom_usuario, apellido, ci, fechaNac, rol_id) VALUES (?, ?, ?, ?, ?)`, [nombre, apellido, ci, fechaNac, rolId]);
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
        const rows = await database.getAllAsync(`
            SELECT u.*, r.nombre as nom_rol 
            FROM users u 
            LEFT JOIN rol r ON u.rol_id = r.id
        `);
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
        return await database.execAsync(`INSERT INTO users(nom_usuario, apellido, ci, fechaNac, rol_id) VALUES
            ('Henry', 'González', '12345678', '26/09/2001', 1),
            ('Juan', 'Pedro', '23232378', '21/02/1998', 1),
            ('Pepe', 'Garciaz', '87654321', '12/03/1995', 1),
            ('Maria', 'Martinez', '1121321', '05/11/1986', 1)`);
    },

    // Roles
    async crearTablaRol() {
        const database = await this.getConnection();
        return await database.runAsync("CREATE TABLE IF NOT EXISTS rol (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT UNIQUE)");
    },

    async createRol(nombre) {
        const database = await this.getConnection();
        const result = await database.runAsync("INSERT INTO rol (nombre) VALUES (?)", [nombre]);
        return { rowsAffected: result.changes };
    },

    async getAllRoles() {
        const database = await this.getConnection();
        const rows = await database.getAllAsync("SELECT * FROM rol");
        return { rows };
    },

    async agregarRoles() {
        const database = await this.getConnection();
        return await database.execAsync(`INSERT INTO rol (nombre) VALUES
            ('ADMIN'),
            ('RECEPCIONISTA'),
            ('ENTRENADOR'),
            ('CLIENTE')`);
    },

    async asignarRolAUsuario(userId, rolId) {
        const database = await this.getConnection();
        const result = await database.runAsync("UPDATE users SET rol_id = ? WHERE user_id = ?", [rolId, userId]);
        return { rowsAffected: result.changes };
    },

    async getUsuariosConRol() {
        const database = await this.getConnection();
        const rows = await database.getAllAsync(`
            SELECT u.*, r.nombre as nom_rol 
            FROM users u 
            LEFT JOIN rol r ON u.rol_id = r.id
        `);
        return { rows };
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
        await database.runAsync("CREATE TABLE IF NOT EXISTS ejercicio(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50), maquina INTEGER, videoUrl VARCHAR(200), FOREIGN KEY (maquina) REFERENCES maquina(id))");

        const columns = await database.getAllAsync("PRAGMA table_info(ejercicio)");
        const hasVideoUrl = columns.some(col => col.name === 'videoUrl');
        if (!hasVideoUrl) {
            await database.runAsync("ALTER TABLE ejercicio ADD COLUMN videoUrl VARCHAR(200)");
        }

        return true;
    },

    async createEjercicio(nombre, maquina, videoUrl) {
        const database = await this.getConnection();
        const result = await database.runAsync(`INSERT INTO ejercicio (nombre, maquina, videoUrl) VALUES (?, ?, ?)`, [nombre, maquina, videoUrl]);
        return { rowsAffected: result.changes };
    },

    async updateEjercicio(nombre, maquina, videoUrl, id) {
        const database = await this.getConnection();
        const result = await database.runAsync(`UPDATE ejercicio SET nombre = ?, maquina = ?, videoUrl = ? WHERE id = ?`, [nombre, maquina, videoUrl, id]);
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

    // Tipo de Ejercicio
    async crearTablaTipoEjercicio() {
        const database = await this.getConnection();
        return await database.runAsync("CREATE TABLE IF NOT EXISTS tipo_ejercicio(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50))");
    },

    async crearTablaEjercicioTipoRelacion() {
        const database = await this.getConnection();
        return await database.runAsync(`
            CREATE TABLE IF NOT EXISTS ejercicio_tipo_relacion (
                ejercicio_id INTEGER,
                tipo_ejercicio_id INTEGER,
                PRIMARY KEY (ejercicio_id, tipo_ejercicio_id),
                FOREIGN KEY (ejercicio_id) REFERENCES ejercicio(id) ON DELETE CASCADE,
                FOREIGN KEY (tipo_ejercicio_id) REFERENCES tipo_ejercicio(id) ON DELETE CASCADE
            )
        `);
    },

    async createTipoEjercicio(nombre) {
        const database = await this.getConnection();
        const result = await database.runAsync(`INSERT INTO tipo_ejercicio (nombre) VALUES (?)`, [nombre]);
        return { rowsAffected: result.changes };
    },

    async getAllTipoEjercicio() {
        const database = await this.getConnection();
        const rows = await database.getAllAsync("SELECT * FROM tipo_ejercicio");
        return { rows };
    },

    async agregarTiposEjercicioIniciales() {
        const database = await this.getConnection();
        return await database.execAsync(`INSERT INTO tipo_ejercicio(nombre) VALUES
            ('Fuerza'),
            ('Hipertrofia'),
            ('Resistencia'),
            ('Cardio'),
            ('Flexibilidad')`);
    },

    async asociarTipoAEjercicio(ejercicioId, tipoEjercicioId) {
        const database = await this.getConnection();
        const result = await database.runAsync(
            `INSERT OR IGNORE INTO ejercicio_tipo_relacion (ejercicio_id, tipo_ejercicio_id) VALUES (?, ?)`,
            [ejercicioId, tipoEjercicioId]
        );
        return { rowsAffected: result.changes };
    },

    async desasociarTodosTiposDeEjercicio(ejercicioId) {
        const database = await this.getConnection();
        const result = await database.runAsync(`DELETE FROM ejercicio_tipo_relacion WHERE ejercicio_id = ?`, [ejercicioId]);
        return { rowsAffected: result.changes };
    },

    async getTiposPorEjercicio(ejercicioId) {
        const database = await this.getConnection();
        const rows = await database.getAllAsync(`
            SELECT te.* 
            FROM tipo_ejercicio te
            INNER JOIN ejercicio_tipo_relacion etr ON te.id = etr.tipo_ejercicio_id
            WHERE etr.ejercicio_id = ?
        `, [ejercicioId]);
        return { rows };
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

    async crearTablaTipoRutina() {
        const database = await this.getConnection();
        return await database.runAsync(`
            CREATE TABLE IF NOT EXISTS tipo_rutina (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre TEXT,
                descripcion TEXT
            )
        `);
    },

    async crearTablaRutina() {
        const database = await this.getConnection();
        await database.runAsync("CREATE TABLE IF NOT EXISTS rutina(id INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(50), ejercicio INTEGER, programaId INTEGER, tipoRutinaId INTEGER, FOREIGN KEY (ejercicio) REFERENCES ejercicio(id), FOREIGN KEY (programaId) REFERENCES programa(id), FOREIGN KEY (tipoRutinaId) REFERENCES tipo_rutina(id))");

        // Migración: Agregar columna programaId si la tabla ya existía sin ella
        const columns = await database.getAllAsync("PRAGMA table_info(rutina)");
        
        const hasProgramaId = columns.some(col => col.name === 'programaId');
        if (!hasProgramaId) {
            await database.runAsync("ALTER TABLE rutina ADD COLUMN programaId INTEGER REFERENCES programa(id)");
        }

        // Migración: Agregar columna tipoRutinaId si no existe
        const hasTipoRutinaId = columns.some(col => col.name === 'tipoRutinaId');
        if (!hasTipoRutinaId) {
            await database.runAsync("ALTER TABLE rutina ADD COLUMN tipoRutinaId INTEGER REFERENCES tipo_rutina(id)");
        }
        return true;
    },

    async createRutina(nombre, programaId = null, tipoRutinaId = null, ejercicioLegacy = null) {
        const database = await this.getConnection();
        const result = await database.runAsync(`INSERT INTO rutina (nombre, programaId, tipoRutinaId, ejercicio) VALUES (?, ?, ?, ?)`, [nombre, programaId, tipoRutinaId, ejercicioLegacy]);
        return { rowsAffected: result.changes };
    },

    async updateRutina(nombre, id, programaId = null, tipoRutinaId = null, ejercicioLegacy = null) {
        const database = await this.getConnection();
        const result = await database.runAsync(`UPDATE rutina SET nombre = ?, programaId = ?, tipoRutinaId = ?, ejercicio = ? WHERE id = ?`, [nombre, programaId, tipoRutinaId, ejercicioLegacy, id]);
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
        const rows = await database.getAllAsync(`
            SELECT r.*, re.series, re.repeticiones, re.orden, re.pesoSugerido, e.nombre as nom_ejercicio, e.id as id_ejercicio
            FROM rutina r
            LEFT JOIN rutina_ejercicio re ON r.id = re.rutina_id
            LEFT JOIN ejercicio e ON re.ejercicio_id = e.id
            WHERE r.nombre LIKE ?
        `, [searchTerm]);
        return { rows };
    },

    async getAllRutina() {
        const database = await this.getConnection();
        const rows = await database.getAllAsync(`
            SELECT r.*, re.series, re.repeticiones, e.nombre as nom_ejercicio
            FROM rutina r
            LEFT JOIN rutina_ejercicio re ON r.id = re.rutina_id
            LEFT JOIN ejercicio e ON re.ejercicio_id = e.id
            ORDER BY r.id, re.orden
        `);
        return { rows };
    },

    async deleteAllRutina() {
        const database = await this.getConnection();
        const result = await database.runAsync("DELETE FROM rutina");
        return { rowsAffected: result.changes };
    },

    async createTipoRutina(nombre, descripcion) {
        const database = await this.getConnection();
        const result = await database.runAsync(
            `INSERT INTO tipo_rutina (nombre, descripcion) VALUES (?, ?)`,
            [nombre, descripcion]
        );
        return { rowsAffected: result.changes };
    },

    async getAllTipoRutina() {
        const database = await this.getConnection();
        const rows = await database.getAllAsync("SELECT * FROM tipo_rutina");
        return { rows };
    },

    // Rutina - Ejercicio (Relación N:N normalizada)
    async crearTablaRutinaEjercicio() {
        const database = await this.getConnection();
        return await database.runAsync(`
            CREATE TABLE IF NOT EXISTS rutina_ejercicio (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                rutina_id INTEGER,
                ejercicio_id INTEGER,
                orden INTEGER,
                series INTEGER,
                repeticiones INTEGER,
                pesoSugerido REAL,
                descansoSegundos INTEGER,
                FOREIGN KEY (rutina_id) REFERENCES rutina(id),
                FOREIGN KEY (ejercicio_id) REFERENCES ejercicio(id)
            )
        `);
    },

    async createRutinaEjercicio(rutinaId, ejercicioId, orden, series, repeticiones, pesoSugerido, descansoSegundos) {
        const database = await this.getConnection();
        const result = await database.runAsync(
            `INSERT INTO rutina_ejercicio (rutina_id, ejercicio_id, orden, series, repeticiones, pesoSugerido, descansoSegundos) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [rutinaId, ejercicioId, orden, series, repeticiones, pesoSugerido, descansoSegundos]
        );
        return { rowsAffected: result.changes };
    },

    async getEjerciciosByRutina(rutinaId) {
        const database = await this.getConnection();
        const rows = await database.getAllAsync(
            `SELECT re.*, e.nombre as nom_ejercicio 
             FROM rutina_ejercicio re 
             INNER JOIN ejercicio e ON re.ejercicio_id = e.id 
             WHERE re.rutina_id = ? 
             ORDER BY re.orden`,
            [rutinaId]
        );
        return { rows };
    },

    async deleteEjerciciosByRutina(rutinaId) {
        const database = await this.getConnection();
        const result = await database.runAsync(
            `DELETE FROM rutina_ejercicio WHERE rutina_id = ?`,
            [rutinaId]
        );
        return { rowsAffected: result.changes };
    },

    async migrarRutinasAEjercicios() {
        const database = await this.getConnection();
        try {
            // 1. Obtener todas las rutinas que tienen un ejercicio en la columna legacy
            const rutinasLegacy = await database.getAllAsync("SELECT id, ejercicio FROM rutina WHERE ejercicio IS NOT NULL");
            
            for (const rutina of rutinasLegacy) {
                // 2. Verificar si ya existe en la tabla normalizada para evitar duplicados
                const existe = await database.getFirstAsync(
                    "SELECT id FROM rutina_ejercicio WHERE rutina_id = ? AND ejercicio_id = ?",
                    [rutina.id, rutina.ejercicio]
                );

                if (!existe) {
                    // 3. Insertar en la tabla normalizada con valores por defecto (orden 1, series/reps en 0)
                    await database.runAsync(
                        "INSERT INTO rutina_ejercicio (rutina_id, ejercicio_id, orden, series, repeticiones) VALUES (?, ?, ?, ?, ?)",
                        [rutina.id, rutina.ejercicio, 1, 0, 0]
                    );
                }
            }
        } catch (error) {
            console.error("Error migrando datos legacy de rutina:", error);
        }
    },

    // Usuario - Rutina - Ejercicio Override
    async crearTablaUsuarioRutinaEjercicioOverride() {
        const database = await this.getConnection();
        return await database.runAsync(`
            CREATE TABLE IF NOT EXISTS usuario_rutina_ejercicio_override (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                usuario_id INTEGER,
                rutina_id INTEGER,
                ejercicio_original_id INTEGER,
                ejercicio_nuevo_id INTEGER,
                series INTEGER,
                repeticiones INTEGER,
                activo INTEGER,
                FOREIGN KEY (usuario_id) REFERENCES users(user_id),
                FOREIGN KEY (rutina_id) REFERENCES rutina(id)
            )
        `);
    },

    async createOverride(usuarioId, rutinaId, ejercicioOriginalId, ejercicioNuevoId, series, repeticiones, activo) {
        const database = await this.getConnection();
        const result = await database.runAsync(
            `INSERT INTO usuario_rutina_ejercicio_override 
            (usuario_id, rutina_id, ejercicio_original_id, ejercicio_nuevo_id, series, repeticiones, activo) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [usuarioId, rutinaId, ejercicioOriginalId, ejercicioNuevoId, series, repeticiones, activo]
        );
        return { rowsAffected: result.changes };
    },

    async getOverridesByUsuarioYRutina(usuarioId, rutinaId) {
        const database = await this.getConnection();
        const rows = await database.getAllAsync(
            `SELECT o.*, e.nombre as nom_ejercicio_nuevo 
             FROM usuario_rutina_ejercicio_override o
             LEFT JOIN ejercicio e ON o.ejercicio_nuevo_id = e.id
             WHERE o.usuario_id = ? AND o.rutina_id = ? AND o.activo = 1`,
            [usuarioId, rutinaId]
        );
        return { rows };
    },

    async getRutinaCompleta(usuarioId, rutinaId) {
        // 1. Obtener ejercicios base de la rutina (la estructura estándar)
        const { rows: ejerciciosBase } = await this.getEjerciciosByRutina(rutinaId);
        
        // 2. Obtener los overrides (reemplazos) específicos para este usuario y esta rutina
        const { rows: overrides } = await this.getOverridesByUsuarioYRutina(usuarioId, rutinaId);

        // 3. Combinar lógica: Reemplazar base con override si coincide el ejercicio_original_id
        const rutinaCompleta = ejerciciosBase.map(base => {
            const override = overrides.find(o => o.ejercicio_original_id === base.ejercicio_id);

            if (override) {
                return {
                    ...base,
                    ejercicio_id: override.ejercicio_nuevo_id || base.ejercicio_id,
                    nom_ejercicio: override.nom_ejercicio_nuevo || base.nom_ejercicio,
                    series: override.series !== null ? override.series : base.series,
                    repeticiones: override.repeticiones !== null ? override.repeticiones : base.repeticiones,
                    esOverride: true // Flag útil para mostrar visualmente que el ejercicio fue personalizado
                };
            }
            return { ...base, esOverride: false };
        });

        return { rows: rutinaCompleta };
    },

    // Programa (Plan)
    async checkTableExistPrograma() {
        const database = await this.getConnection();
        return await database.getFirstAsync("SELECT name FROM sqlite_master WHERE type='table' AND name='programa'");
    },

    async dropTablePrograma() {
        const database = await this.getConnection();
        return await database.runAsync("DROP TABLE IF EXISTS programa");
    },

    async crearTablaPrograma() {
        const database = await this.getConnection();
        return await database.runAsync(`
            CREATE TABLE IF NOT EXISTS programa (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nombre VARCHAR(100) NOT NULL,
                descripcion TEXT,
                duracionSemanas INTEGER,
                entrenadorId INTEGER,
                usuarioId INTEGER,
                FOREIGN KEY (entrenadorId) REFERENCES users(user_id),
                FOREIGN KEY (usuarioId) REFERENCES users(user_id)
            )
        `);
    },

    async createPrograma(nombre, descripcion, duracionSemanas, entrenadorId, usuarioId) {
        const database = await this.getConnection();
        const result = await database.runAsync(
            `INSERT INTO programa (nombre, descripcion, duracionSemanas, entrenadorId, usuarioId) VALUES (?, ?, ?, ?, ?)`,
            [nombre, descripcion, duracionSemanas, entrenadorId, usuarioId]
        );
        return { rowsAffected: result.changes };
    },

    async updatePrograma(nombre, descripcion, duracionSemanas, entrenadorId, usuarioId, id) {
        const database = await this.getConnection();
        const result = await database.runAsync(
            `UPDATE programa SET nombre = ?, descripcion = ?, duracionSemanas = ?, entrenadorId = ?, usuarioId = ? WHERE id = ?`,
            [nombre, descripcion, duracionSemanas, entrenadorId, usuarioId, id]
        );
        return { rowsAffected: result.changes };
    },

    async deletePrograma(id) {
        const database = await this.getConnection();
        const result = await database.runAsync(`DELETE FROM programa WHERE id = ?`, [id]);
        return { rowsAffected: result.changes };
    },

    async getOnePrograma(searchTerm) {
        const database = await this.getConnection();
        const rows = await database.getAllAsync(`SELECT * FROM programa WHERE nombre LIKE ?`, [`%${searchTerm}%`]);
        return { rows };
    },

    async getAllPrograma() {
        const database = await this.getConnection();
        const rows = await database.getAllAsync("SELECT * FROM programa");
        return { rows };
    },

    async deleteAllPrograma() {
        const database = await this.getConnection();
        const result = await database.runAsync("DELETE FROM programa");
        return { rowsAffected: result.changes };
    },

    async seedDatabaseInicial() {
        const database = await this.getConnection();
        try {
            // Verificamos si ya hay programas como indicador de que el sembrado ya se realizó
            const programaExistente = await database.getFirstAsync("SELECT id FROM programa LIMIT 1");
            if (programaExistente) {
                console.log("ℹ️ La base de datos ya contiene datos iniciales (Seed omitido).");
                return;
            }

            console.log("🌱 Iniciando sembrado (seeding) de base de datos...");

            // =========================
            // 🏋️ TIPOS DE MÁQUINA
            // =========================
            await database.execAsync(`
                INSERT INTO tipoMaquina (nombre, fotoUrl) VALUES
                ('Polea', 'https://via.placeholder.com/150'),
                ('Banco', 'https://via.placeholder.com/150'),
                ('Peso Libre', 'https://via.placeholder.com/150'),
                ('Cardio', 'https://via.placeholder.com/150'),
                ('Pierna', 'https://via.placeholder.com/150')
            `);

            // =========================
            // 🏗️ MÁQUINAS
            // =========================
            await database.execAsync(`
                INSERT INTO maquina (tipoMaquina, sala) VALUES
                (1, 1),
                (1, 1),
                (2, 1),
                (3, 2),
                (4, 2),
                (5, 3)
            `);

            // =========================
            // 🧠 TIPOS DE EJERCICIO
            // =========================
            await database.execAsync(`
                INSERT INTO tipo_ejercicio(nombre) VALUES
                ('Fuerza'),
                ('Hipertrofia'),
                ('Resistencia'),
                ('Cardio'),
                ('Movilidad')
            `);

            // =========================
            // 💪 EJERCICIOS
            // =========================
            await database.execAsync(`
                INSERT INTO ejercicio (nombre, maquina, videoUrl) VALUES
                ('Press banca', 2, ''),
                ('Aperturas con mancuernas', 3, ''),
                ('Curl bíceps', 3, ''),
                ('Tríceps en polea', 1, ''),
                ('Jalón al pecho', 1, ''),
                ('Sentadilla', 5, ''),
                ('Prensa de pierna', 5, ''),
                ('Extensión de cuádriceps', 5, ''),
                ('Bicicleta', 4, ''),
                ('Cinta de correr', 4, '')
            `);

            // =========================
            // 🔗 RELACIÓN EJERCICIO - TIPO
            // =========================
            await database.execAsync(`
                INSERT INTO ejercicio_tipo_relacion VALUES
                (1,1),(1,2),
                (2,2),
                (3,1),
                (4,1),
                (5,1),
                (6,1),
                (7,2),
                (8,2),
                (9,4),
                (10,4)
            `);

            // =========================
            // 🏷️ TIPOS DE RUTINA
            // =========================
            await database.execAsync(`
                INSERT INTO tipo_rutina (nombre, descripcion) VALUES
                ('Full Body', 'Entrena todo el cuerpo'),
                ('Torso', 'Parte superior'),
                ('Pierna', 'Parte inferior'),
                ('Cardio', 'Entrenamiento cardiovascular')
            `);

            // =========================
            // 📋 PROGRAMA (mínimo uno)
            // =========================
            await database.execAsync(`
                INSERT INTO programa (nombre, descripcion, duracionSemanas, entrenadorId, usuarioId)
                VALUES ('Programa Inicial', 'Rutina base', 4, 1, 1)
            `);

            // =========================
            // 📅 RUTINAS
            // =========================
            await database.execAsync(`
                INSERT INTO rutina (nombre, programaId, tipoRutinaId)
                VALUES 
                ('Día 1 - Torso', 1, 2),
                ('Día 2 - Pierna', 1, 3),
                ('Día 3 - Cardio', 1, 4)
            `);

            // =========================
            // 🔥 RUTINA - EJERCICIOS
            // =========================
            await database.execAsync(`
                INSERT INTO rutina_ejercicio (rutina_id, ejercicio_id, orden, series, repeticiones, pesoSugerido, descansoSegundos) VALUES
                (1, 1, 1, 4, 10, 0, 60),
                (1, 5, 2, 4, 10, 0, 60),
                (1, 3, 3, 3, 12, 0, 45),
                (2, 6, 1, 4, 10, 0, 60),
                (2, 7, 2, 4, 10, 0, 60),
                (2, 8, 3, 3, 12, 0, 45),
                (3, 9, 1, 1, 20, 0, 0),
                (3, 10, 2, 1, 20, 0, 0)
            `);

            console.log("✅ Base de datos inicial cargada correctamente");
        } catch (error) {
            console.error("❌ Error en seedDatabaseInicial:", error);
        }
    },
};

export default databaseConnection;
