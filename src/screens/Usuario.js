import { useEffect } from "react"
import {SafeAreaView, View, StyleSheet, ScrollView} from "react-native"
import MyButton from "../components/MyButton"
import databaseConection from "../database/database-manager"
import OpenDatabase from "../database/import-database"

const db = databaseConection.getConnection()

const Usuario = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <View style={styles.internalView}>
                        <ScrollView style={styles.scollview}>
                            {/* button add user*/}
                            <MyButton 
                                onPress={() => navigation.navigate("RegisterUser")} 
                                title="◽ Registrar" 
                                iconName="user-plus" 
                                btnColor="#AFB42B"
                            />
                            
                            {/* button update user */}
                            <MyButton 
                                onPress={() => navigation.navigate("UpdateUser")} 
                                title="◽ Actualizar" 
                                iconName="user-circle" 
                                btnColor="#AFB42B"
                            />

                              {/* button delete user*/}
                              <MyButton 
                                onPress={() => navigation.navigate("DeleteUser")} 
                                title="◽ Borrar" 
                                iconName="user-times" 
                                btnColor="#AFB42B"
                            />

                            {/* button Ver user */}
                            <MyButton 
                                onPress={() => navigation.navigate("ViewUser")} 
                                title="◽ Buscar" 
                                iconName="user-times" 
                                btnColor="#AFB42B"
                            />

                            {/* button Ver todos los usuarios*/}
                            <MyButton 
                                onPress={() => navigation.navigate("ViewAllUsers")} 
                                title="◽ Ver todo" 
                                iconName="user-times" 
                                btnColor="#AFB42B"
                            />

                             {/* button borrar todos los usuarios*/}
                             <MyButton 
                                onPress={() => navigation.navigate("UsuarioBorrarTodo")} 
                                title="◽ Borrar todos!" 
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
        backgroundColor: "#fcfceb",
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
    }
})

export default Usuario;