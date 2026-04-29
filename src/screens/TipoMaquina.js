import { useEffect } from "react"
import {SafeAreaView, View, StyleSheet, ScrollView} from "react-native"
import MyButton from "../components/MyButton"
import { globalStyles } from "./globalStyles"
import databaseConection from "../database/database-manager"
import OpenDatabase from "../database/import-database"

const db = databaseConection.getConnection()

const TipoMaquina = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <View style={styles.internalView}>
                        <ScrollView style={[styles.scollview, globalStyles.standardPadding]}>
                            {/* Agregar Tipo Maquina*/}
                            <MyButton 
                                onPress={() => navigation.navigate("CrearTipoMaquina")} 
                                title="◽ Agregar" 
                                iconName="user-plus" 
                                btnColor="#689F38"
                                style={globalStyles.btnSmall}
                            />
                            
                            {/* Actualizar tipo Maquina */}
                            <MyButton 
                                onPress={() => navigation.navigate("ActualizarTipoMaquina")} 
                                title="◽ Actualizar" 
                                iconName="user-circle" 
                                btnColor="#689F38"
                                style={globalStyles.btnSmall}
                            />

                              {/*Eliminar tipo de maquina*/}
                              <MyButton 
                                onPress={() => navigation.navigate("EliminarTipoMaquina")} 
                                title="◽ Borrar" 
                                iconName="user-times" 
                                btnColor="#689F38"
                                style={globalStyles.btnSmall}
                            />

                            {/* Ver todos tipos de maquina*/}
                            <MyButton 
                                onPress={() => navigation.navigate("VerTodosTipoMaquina")} 
                                title="◽ Ver" 
                                iconName="user-times" 
                                btnColor="#689F38"
                                style={globalStyles.btnSmall}
                            />

                             {/* borrar todos tipos de maquinas*/}
                             <MyButton 
                                onPress={() => navigation.navigate("EliminarTodosTipoMaquina")} 
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

export default TipoMaquina;