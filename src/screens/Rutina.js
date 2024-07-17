import { useEffect } from "react"
import {SafeAreaView, View, StyleSheet, ScrollView} from "react-native"
import MyButton from "../components/MyButton"
import databaseConection from "../database/database-manager"
import OpenDatabase from "../database/import-database"

const db = databaseConection.getConnection()

const Ejercicio = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <View style={styles.internalView}>
                        <ScrollView style={styles.scollview}>
                            {/* Agregar Rutina*/}
                            <MyButton 
                                onPress={() => navigation.navigate("CrearRutina")} 
                                title="Agregar Rutina 🖋" 
                                iconName="user-plus" 
                                btnColor="#00838F"
                            />
                            
                            {/* Actualizar Rutina */}
                            <MyButton 
                                onPress={() => navigation.navigate("ActualizarRutina")} 
                                title="Actualizar Rutina  ✔✔" 
                                iconName="user-circle" 
                                btnColor="#00838F"
                            />

                              {/*Eliminar Rutina*/}
                              <MyButton 
                                onPress={() => navigation.navigate("ElimiarRutina")} 
                                title="Borrar Rutina 🚫" 
                                iconName="user-times" 
                                btnColor="#00838F"
                            />

                            {/* Ver todos Rutinas*/}
                            <MyButton 
                                onPress={() => navigation.navigate("VerTodoRutina")} 
                                title="Ver Rutinas 👁‍🗨" 
                                iconName="user-times" 
                                btnColor="#00838F"
                            />

                             {/* borrar todos Rutinas*/}
                             <MyButton 
                                onPress={() => navigation.navigate("EliminarTodoRutina")} 
                                title="Borrar todos! ❌" 
                                iconName="user-times" 
                                btnColor="red"
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
        flex:1,
        flexDirection: "column",
        padding:10,
        margin: 0
    }
})


export default Ejercicio;