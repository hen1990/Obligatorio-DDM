import { useEffect } from "react"
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native"
import MyButton from "../components/MyButton"
import databaseConection from "../database/database-manager"
import OpenDatabase from "../database/import-database"

const HomeScreen = ({ navigation }) => {
    useEffect(() => {
        const init = async () => {
            try {
                console.log("Inicializando base de datos...");
                
                // Crear tablas
                await databaseConection.createUserTable();
                console.log("Tabla usuarios creada");
                
                await databaseConection.crearTablaTipoMaquina();
                console.log("Tabla tipo máquina creada");
                
                await databaseConection.crearTablaMaquina();
                console.log("Tabla máquina creada");
                
                await databaseConection.crearTablaEjercicio();
                console.log("Tabla ejercicio creada");
                
                await databaseConection.crearTablaRutina();
                console.log("Tabla rutina creada");

                const users = await databaseConection.getAllUsers();
                if (users.rows.length === 0) {
                    console.log("Agregando usuarios iniciales...");
                    await databaseConection.agregarUsuarios();
                    console.log("Usuarios agregados");
                }

                const tiposMaquina = await databaseConection.getAllTipoMaquina();
                if (tiposMaquina.rows.length === 0) {
                    console.log("Agregando tipos de máquina iniciales...");
                    await databaseConection.agregarTipoMaquina();
                    console.log("Tipos de máquina agregados");
                }
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
                        <ScrollView style={styles.scollview}>
                            {/* button Usuario*/}
                            <MyButton
                                onPress={() => navigation.navigate("Usuario")}
                                title="◽ Usuarios"
                                iconName="user-plus"
                                btnColor="#AFB42B"
                            />
                            {/* button Tipo Maquina*/}
                            <MyButton
                                onPress={() => navigation.navigate("TipoMaquina")}
                                title="◽ Tipos de Maquinas"
                                iconName="user-plus"
                                btnColor="#689F38"
                            />

                            {/* button Maquina*/}
                            <MyButton
                                onPress={() => navigation.navigate("Maquina")}
                                title="◽ Maquinas"
                                iconName="user-plus"
                                btnColor="green"
                            />

                            {/* button Rutina*/}
                            <MyButton
                                onPress={() => navigation.navigate("Rutina")}
                                title="◽ Rutinas"
                                iconName="user-plus"
                                btnColor="#00838F"
                            />

                            {/* button Ejercicio*/}
                            <MyButton
                                onPress={() => navigation.navigate("Ejercicio")}
                                title="◽ Ejercicios"
                                iconName="user-plus"
                                btnColor="#673AB7"
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