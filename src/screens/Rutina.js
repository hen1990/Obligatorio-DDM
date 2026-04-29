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
                            {/* Agregar Rutina*/}
                            <MyButton 
                                onPress={() => navigation.navigate("CrearRutina")} 
                                title="◽ Agregar" 
                                iconName="user-plus" 
                                btnColor="#00838F"
                                style={globalStyles.btnSmall}
                            />
                            
                            {/* Actualizar Rutina */}
                            <MyButton 
                                onPress={() => navigation.navigate("ActualizarRutina")} 
                                title="◽ Actualizar" 
                                iconName="user-circle" 
                                btnColor="#00838F"
                                style={globalStyles.btnSmall}
                            />

                              {/*Eliminar Rutina*/}
                              <MyButton 
                                onPress={() => navigation.navigate("ElimiarRutina")} 
                                title="◽ Borrar" 
                                iconName="user-times" 
                                btnColor="#00838F"
                                style={globalStyles.btnSmall}
                            />

                            {/* Ver todos Rutinas*/}
                            <MyButton 
                                onPress={() => navigation.navigate("VerTodoRutina")} 
                                title="◽ Ver" 
                                iconName="user-times" 
                                btnColor="#00838F"
                                style={globalStyles.btnSmall}
                            />

                             {/* borrar todos Rutinas*/}
                             <MyButton 
                                onPress={() => navigation.navigate("EliminarTodoRutina")} 
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
        backgroundColor: "#e3fafc",
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