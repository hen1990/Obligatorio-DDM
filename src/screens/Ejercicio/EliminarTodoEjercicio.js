import MySingleButton from "../../components/MySingleButton"
import MyText from "../../components/MyText"
import { StyleSheet, View, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert } from "react-native";

import databaseConection from "../../database/database-manager";

const EliminarTodoEjercicio = ({ navigation }) => {

    const borrarEjercicios = async () => {
        try {
            await databaseConection.deleteAllEjercicio();
            Alert.alert(
                "Exito",
                "Ejercicios eliminados!!!",
                [
                  {
                    text: "OK",
                    onPress: () => navigation.navigate("Ejercicio"),
                  },
                ],
                {
                  cancelable: false,
                }
              );
        } catch (error) {
            console.error("Error:", error);
            Alert.alert("Error", "Error al eliminar ejercicios");
        }
    };

    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View styles={styles.generalView}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <KeyboardAvoidingView behavior="padding" style={styles.KeyboardAvoidingView}>
 <View style={styles.presenterView}>
                            <MyText text="ADVERTENCIA!!" style={styles.textDanger} />
                           
                                <MyText text="Estás a punto de eliminar TODOS los Ejercicios. Esta acción no se puede desacer. ¿Seguro desea eliminar Todos los datos existentes?" style={styles.texto} />
                            </View>
                            <MySingleButton
                                title="Borrar TODO"
                                onPress={borrarEjercicios}
                                style={styles.button}
                            />
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    viewContainer: {
        flex: 1,
        backgroundColor: "white"
    },
    generalView: {
        flex: 1
    },
    KeyboardAvoidingView: {
        flex: 1,
        justifyContent: "space-between"
    },

    button: {
        backgroundColor: 'red',
    },
    textDanger: {
        color: "red",
        fontSize: 40,
        textAlign: 'left',
        marginLeft: 0,
        marginTop: 8
    },
    texto: {
        color: "black",
        fontSize: 20,
        textAlign: 'left',
        marginLeft: 0,
        margin: 10
    },
    presenterView: {
        marginLeft: 24,
        marginRight: 24,
        marginTop: 15,
        backgroundColor: "2f2f2f",
        borderColor: "2f2f2f",
        borderRadius: 5,
        borderWidth: 1,
        padding: 20,
    },
})


export default EliminarTodoEjercicio;