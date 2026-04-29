import React from "react"
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native"
import MyButton from "../components/MyButton"
import { globalStyles } from "./globalStyles"

const Rol = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <View style={styles.internalView}>
                        <ScrollView style={[styles.scollview, globalStyles.standardPadding]}>
                            <MyButton 
                                onPress={() => navigation.navigate("CrearRol")} 
                                title="◽ Agregar Rol" 
                                iconName="plus" 
                                btnColor="#795548"
                                style={globalStyles.btnSmall}
                            />
                            <MyButton 
                                onPress={() => navigation.navigate("VerTodosRoles")} 
                                title="◽ Ver Roles" 
                                iconName="list" 
                                btnColor="#795548"
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
        backgroundColor: "#efebe9",
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

export default Rol;