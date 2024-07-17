import { useEffect } from "react"
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native"
import MyButton from "../components/MyButton"
import databaseConection from "../database/database-manager"
import OpenDatabase from "../database/import-database"

const db = databaseConection.getConnection()

const HomeScreen = ({ navigation }) => {
    useEffect(() => {
        const init = async () => {
            const readOnly = false;
            await db.transactionAsync(async tx => {

                await databaseConection.dropTableUser(tx)
                await databaseConection.dropTabletipoMaquina(tx)
                await databaseConection.dropTableMaquina(tx)
                await databaseConection.dropTableEjercicio(tx)
                await databaseConection.dropTableRutina(tx)
                console.log("transaction", tx)
                //Chequear tabla Usuario
                const existeTablaUsuario = await databaseConection.checkTableExistUser(tx)
                console.log("table usuario exists", existeTablaUsuario.rows)
                if (existeTablaUsuario.rows.length) {
                    // await databaseConection.dropTable(tx)
                }
                const crearTablaUsuario = await databaseConection.createUserTable(tx)
                console.log("### tabla usuario ####", crearTablaUsuario)

                //Chequear tabla TipoMaquina 
                const existeTablaTipoMaquina = await databaseConection.checkTableExistTipoMaquina(tx)
                console.log("table tipoMaquina exists", existeTablaTipoMaquina.rows)
                if (existeTablaTipoMaquina.rows.length) {
                    // await databaseConection.dropTable(tx)
                }
                const crearTablaTipoMaquina = await databaseConection.crearTablaTipoMaquina(tx)
                console.log("### tabla maquina ####", crearTablaTipoMaquina)

                //Chequear tabla Maquina
                const existeTablaMaquina = await databaseConection.checkTableExistMaquina(tx)
                console.log("table maquina exists", existeTablaMaquina.rows)
                if (existeTablaMaquina.rows.length) {
                    // await databaseConection.dropTable(tx)
                }
                const crearTablaMaquina = await databaseConection.crearTablaMaquina(tx)
                console.log("### tabla maquina ####", crearTablaMaquina)

                

                await databaseConection.crearTablaEjercicio(tx)
                
                await databaseConection.crearTablaRutina(tx)
                //Agregar datos de prueba
                await databaseConection.agregarUsuarios(tx)
                await databaseConection.agregarTipoMaquina(tx)
                await databaseConection.agregarMaquinas(tx)
                await databaseConection.agregarEjercicios(tx)
                await databaseConection.agregarRutinas(tx)
            }, readOnly);
        }

        init().then(() => console.log("exec"))
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <View style={styles.internalView}>
                        <ScrollView style={styles.scollview}>
                            {/* button Usuario*/}
                            <MyButton
                                onPress={() => navigation.navigate("Usuario")}
                                title="Usuarios"
                                iconName="user-plus"
                                btnColor="#AFB42B"
                            />
                            {/* button Tipo Maquina*/}
                            <MyButton
                                onPress={() => navigation.navigate("TipoMaquina")}
                                title="Tipos de Maquinas"
                                iconName="user-plus"
                                btnColor="#689F38"
                            />

                            {/* button Maquina*/}
                            <MyButton
                                onPress={() => navigation.navigate("Maquina")}
                                title="Maquinas"
                                iconName="user-plus"
                                btnColor="green"
                            />

                            {/* button Rutina*/}
                            <MyButton
                                onPress={() => navigation.navigate("Rutina")}
                                title="Rutinas"
                                iconName="user-plus"
                                btnColor="#00838F"
                            />

                            {/* button Ejercicio*/}
                            <MyButton
                                onPress={() => navigation.navigate("Ejercicio")}
                                title="Ejercicios"
                                iconName="user-plus"
                                btnColor="#673AB7"
                            />



                            {/* Importar db */}
                            <MyButton
                                onPress={() => OpenDatabase("database.db")}
                                title="Importar DB"
                                iconName="add"
                                btnColor="gray"
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