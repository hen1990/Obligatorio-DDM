import { useEffect } from "react"
import {SafeAreaView, View, StyleSheet, ScrollView} from "react-native"
import MyButton from "../components/MyButton"
import databaseConection from "../database/database-manager"
import OpenDatabase from "../database/import-database"

const db = databaseConection.getConnection()

const TipoMaquina = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <View style={styles.internalView}>
                        <ScrollView style={styles.scollview}>
                            {/* Agregar Tipo Maquina*/}
                            <MyButton 
                                onPress={() => navigation.navigate("CrearTipoMaquina")} 
                                title="Agregar Tipo de Máquina 🖋" 
                                iconName="user-plus" 
                                btnColor="green"
                            />
                            
                            {/* Actualizar tipo Maquina */}
                            <MyButton 
                                onPress={() => navigation.navigate("ActualizarTipoMaquina")} 
                                title="Actualizar Tipo de Máq  ✔✔" 
                                iconName="user-circle" 
                                btnColor="green"
                            />

                              {/*Eliminar tipo de maquina*/}
                              <MyButton 
                                onPress={() => navigation.navigate("EliminarTipoMaquina")} 
                                title="Borrar Tipo de Máquina 🚫" 
                                iconName="user-times" 
                                btnColor="green"
                            />

                            {/* Ver todos tipos de maquina*/}
                            <MyButton 
                                onPress={() => navigation.navigate("VerTodosTipoMaquina")} 
                                title="Ver Tipos de Máquinas 👁‍🗨" 
                                iconName="user-times" 
                                btnColor="green"
                            />

                             {/* borrar todos tipos de maquinas*/}
                             <MyButton 
                                onPress={() => navigation.navigate("EliminarTodosTipoMaquina")} 
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
        padding:20,
        margin: 10
    }
})

export default TipoMaquina;