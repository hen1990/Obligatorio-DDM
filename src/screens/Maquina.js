import { useEffect } from "react"
import {SafeAreaView, View, StyleSheet, ScrollView} from "react-native"
import MyButton from "../components/MyButton"
import { globalStyles } from "./globalStyles"
import databaseConection from "../database/database-manager"
import OpenDatabase from "../database/import-database"

const db = databaseConection.getConnection()

const Maquina = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <View style={styles.internalView}>
                        <ScrollView style={[styles.scollview, globalStyles.standardPadding]}>
                            {/* Agregar Maquina*/}
                            <MyButton 
                                onPress={() => navigation.navigate("CrearMaquina")} 
                                title="◽ Agregar" 
                                iconName="user-plus" 
                                btnColor="green"
                                style={globalStyles.btnSmall}
                            />
                            
                            {/* Actualizar Maquina */}
                            <MyButton 
                                onPress={() => navigation.navigate("ActualizarMaquina")} 
                                title="◽ Actualizar" 
                                iconName="user-circle" 
                                btnColor="green"
                                style={globalStyles.btnSmall}
                            />

                              {/*Eliminar maquina*/}
                              <MyButton 
                                onPress={() => navigation.navigate("ElimiarMaquina")} 
                                title="◽ Borrar" 
                                iconName="user-times" 
                                btnColor="green"
                                style={globalStyles.btnSmall}
                            />

                            {/* Ver todos maquina*/}
                            <MyButton 
                                onPress={() => navigation.navigate("VerTodoMaquina")} 
                                title="◽ Ver" 
                                iconName="user-times" 
                                btnColor="green"
                                style={globalStyles.btnSmall}
                            />

                             {/* borrar todos maquinas*/}
                             <MyButton 
                                onPress={() => navigation.navigate("EliminarTodoMaquina")} 
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
        backgroundColor: "#e3f7dc",
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


export default Maquina;