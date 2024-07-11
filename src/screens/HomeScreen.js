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
                console.log("transaction", tx)
                //Chequear tabla Usuario
                const existeTablaUsuario = await databaseConection.checkTableExistUser(tx)
                console.log("table exists", existeTablaUsuario.rows)
                if (existeTablaUsuario.rows.length) {
                    // await databaseConection.dropTable(tx)
                }
                const crearTablaUsuario = await databaseConection.createUserTable(tx)
                console.log("### results ####", crearTablaUsuario)

                const existeTablaTipoMaquina = await databaseConection.checkTableExistTipoMaquina(tx)
                console.log("table exists", existeTablaTipoMaquina.rows)
                if (existeTablaTipoMaquina.rows.length) {
                    // await databaseConection.dropTable(tx)
                }
                const crearTablaTipoMaquina = await databaseConection.crearTablaTipoMaquina(tx)
                console.log("### results ####", crearTablaTipoMaquina)
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
                                title="Usuario  🏋️‍♂️"
                                iconName="user-plus"
                                btnColor="green"
                            />
                            {/* button Tipo Maquina*/}
                            <MyButton
                                onPress={() => navigation.navigate("TipoMaquina")}
                                title="Tipo de Maquinas"
                                iconName="user-plus"
                                btnColor="green"
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
        marginTop: 30,
        flex: 1,
        flexDirection: "column",

    }
})

export default HomeScreen