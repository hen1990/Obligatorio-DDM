import { useEffect } from "react"
import {SafeAreaView, View, StyleSheet, ScrollView} from "react-native"
import MyButton from "../components/MyButton"
import databaseConection from "../database/database-manager"
import OpenDatabase from "../database/import-database"

const db = databaseConection.getConnection()

const Maquina = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <View style={styles.internalView}>
                        <ScrollView style={styles.scollview}>
                            {/* Agregar Maquina*/}
                            <MyButton 
                                onPress={() => navigation.navigate("CrearMaquina")} 
                                title="Agregar Máquina 🖋" 
                                iconName="user-plus" 
                                btnColor="green"
                            />
                            
                            {/* Actualizar Maquina */}
                            <MyButton 
                                onPress={() => navigation.navigate("ActualizarMaquina")} 
                                title="Actualizar Máquina  ✔✔" 
                                iconName="user-circle" 
                                btnColor="green"
                            />

                              {/*Eliminar maquina*/}
                              <MyButton 
                                onPress={() => navigation.navigate("ElimiarMaquina")} 
                                title="Borrar Máquina 🚫" 
                                iconName="user-times" 
                                btnColor="green"
                            />

                            {/* Ver todos maquina*/}
                            <MyButton 
                                onPress={() => navigation.navigate("VerTodoMaquina")} 
                                title="Ver Máquinas 👁‍🗨" 
                                iconName="user-times" 
                                btnColor="green"
                            />

                             {/* borrar todos maquinas*/}
                             <MyButton 
                                onPress={() => navigation.navigate("EliminarTodoMaquina")} 
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


export default Maquina;