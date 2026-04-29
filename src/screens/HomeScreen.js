import { useEffect } from "react"
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native"
import MyButton from "../components/MyButton"
import { globalStyles } from "./globalStyles"
import databaseConection from "../database/database-manager"
import OpenDatabase from "../database/import-database"

const HomeScreen = ({ navigation }) => {
    useEffect(() => {
        const init = async () => {
            try {
                console.log("Inicializando base de datos...");
                
                // Crear tablas
                await databaseConection.crearTablaRol();
                console.log("Tabla rol creada");

                await databaseConection.createUserTable();
                console.log("Tabla usuarios creada");
                
                await databaseConection.crearTablaTipoMaquina();
                console.log("Tabla tipo máquina creada");
                
                await databaseConection.crearTablaMaquina();
                console.log("Tabla máquina creada");
                
                await databaseConection.crearTablaEjercicio();
                console.log("Tabla ejercicio creada");

                await databaseConection.crearTablaTipoEjercicio();
                console.log("Tabla tipo_ejercicio creada");

                await databaseConection.crearTablaEjercicioTipoRelacion();
                console.log("Tabla ejercicio_tipo_relacion creada");
                
                await databaseConection.crearTablaTipoRutina();
                console.log("Tabla tipo_rutina creada");

                await databaseConection.crearTablaRutina();
                console.log("Tabla rutina creada");

                await databaseConection.crearTablaPrograma();
                console.log("Tabla programa creada");

                await databaseConection.crearTablaRutinaEjercicio();
                console.log("Tabla rutina_ejercicio creada");

                await databaseConection.migrarRutinasAEjercicios();

                await databaseConection.crearTablaUsuarioRutinaEjercicioOverride();
                console.log("Tabla usuario_rutina_ejercicio_override creada");

                // Insertamos los roles iniciales si la tabla está vacía
                const roles = await databaseConection.getAllRoles();
                if (roles.rows.length === 0) {
                    await databaseConection.agregarRoles();
                    console.log("Roles iniciales agregados");
                }

                const users = await databaseConection.getAllUsers();
                if (users.rows.length === 0) {
                    console.log("Agregando usuarios iniciales...");
                    await databaseConection.agregarUsuarios();
                    console.log("Usuarios agregados");
                }
                
                // Sembrado masivo de datos si la base de datos está vacía (excepto usuarios)
                await databaseConection.seedDatabaseInicial();
                
            } catch (error) {
                console.error("Error inicializando BD:", error);
            }
        };

        init();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <View style={styles.internalView}>
                        <ScrollView style={[styles.scollview, globalStyles.standardPadding]}>
                            {/* button Roles*/}
                            <MyButton
                                onPress={() => navigation.navigate("Rol")}
                                title="◽ Roles"
                                iconName="user-tag"
                                btnColor="#795548"
                                style={globalStyles.btnSmall}
                            />
                            {/* button Usuario*/}
                            <MyButton
                                onPress={() => navigation.navigate("Usuario")}
                                title="◽ Usuarios"
                                iconName="user-plus"
                                btnColor="#AFB42B"
                                style={globalStyles.btnSmall}
                            />
                            {/* button Tipo Maquina*/}
                            <MyButton
                                onPress={() => navigation.navigate("TipoMaquina")}
                                title="◽ Tipos de Maquinas"
                                iconName="user-plus"
                                btnColor="#689F38"
                                style={globalStyles.btnSmall}
                            />

                            {/* button Maquina*/}
                            <MyButton
                                onPress={() => navigation.navigate("Maquina")}
                                title="◽ Maquinas"
                                iconName="user-plus"
                                btnColor="green"
                                style={globalStyles.btnSmall}
                            />

                            {/* button Rutina*/}
                            <MyButton
                                onPress={() => navigation.navigate("Rutina")}
                                title="◽ Rutinas"
                                iconName="user-plus"
                                btnColor="#00838F"
                                style={globalStyles.btnSmall}
                            />

                            {/* button Ejercicio*/}
                            <MyButton
                                onPress={() => navigation.navigate("Ejercicio")}
                                title="◽ Ejercicios"
                                iconName="user-plus"
                                btnColor="#673AB7"
                                style={globalStyles.btnSmall}
                            />
                        </ScrollView>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center"

    },
    viewContainer: {
        flex: 1,
        backgroundColor: "#ecf8e8",
        alignContent: "center"
    },
    generalView: {
        flex: 1,
        justifyContent: "center"
    },
    internalView: {
        flex: 1,
        justifyContent: "center"
    },
    scollview: {
        flex: 1,
        flexDirection: "column",

    }
})

export default HomeScreen;