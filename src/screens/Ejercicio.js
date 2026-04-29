import { useEffect } from "react"
import {SafeAreaView, View, StyleSheet, ScrollView} from "react-native"
import MyButton from "../components/MyButton"
import { globalStyles } from "./globalStyles"
import databaseConection from "../database/database-manager"
import OpenDatabase from "../database/import-database"

const db = databaseConection.getConnection()

const Ejercicio = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <View style={styles.internalView}>
                        <ScrollView style={[styles.scollview, globalStyles.standardPadding]}>
                            {/* Agregar Ejercicio*/}
                            <MyButton 
                                onPress={() => navigation.navigate("CrearEjercicio")} 
                                title="◽ Agregar" 
                                iconName="user-plus" 
                                btnColor="#673AB7"
                                style={globalStyles.btnSmall}
                            />
                            
                            {/* Actualizar Ejercicio */}
                            <MyButton 
                                onPress={() => navigation.navigate("ActualizarEjercicio")} 
                                title="◽ Actualizar" 
                                iconName="user-circle" 
                                btnColor="#673AB7"
                                style={globalStyles.btnSmall}
                            />

                              {/*Eliminar Ejercicio*/}
                              <MyButton 
                                onPress={() => navigation.navigate("ElimiarEjercicio")} 
                                title="◽ Borrar" 
                                iconName="user-times" 
                                btnColor="#673AB7"
                                style={globalStyles.btnSmall}
                            />

                            {/* Ver todos Ejercicio*/}
                            <MyButton 
                                onPress={() => navigation.navigate("VerTodoEjercicio")} 
                                title="◽ Ver" 
                                iconName="user-times" 
                                btnColor="#673AB7"
                                style={globalStyles.btnSmall}
                            />

                             {/* borrar todos Ejercicios*/}
                             <MyButton 
                                onPress={() => navigation.navigate("EliminarTodoEjercicio")} 
                                title="◽ Borrar todos!" 
                                iconName="user-times" 
                                btnColor="red"
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
        flex:1,
        flexDirection: "column",
        margin: 0
    }
})


export default Ejercicio;