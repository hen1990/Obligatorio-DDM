import { useState } from "react"
import { SafeAreaView, View, StyleSheet, ScrollView, FlatList, Text } from "react-native"
import MyButton from "../components/MyButton"
import MyInputText from "../components/MyInputText"
import MyText from "../components/MyText"
import { globalStyles } from "./globalStyles"
import databaseConection from "../database/database-manager"

const Usuario = ({ navigation }) => {
    const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [usuarios, setUsuarios] = useState([]);

    // Función para buscar usuarios en tiempo real
    const buscarUsuarios = async (text) => {
        setBusqueda(text);
        if (text.trim().length > 0) {
            const res = await databaseConection.getOneUser(text);
            setUsuarios(res.rows);
        } else {
            setUsuarios([]);
        }
    };

    const listItemView = (item) => {
        return (
            <View key={item.user_id} style={styles.listItemView}>
                <View style={styles.textContainer}>
                    <MyText text={`${item.nom_usuario} ${item.apellido}`} style={styles.text_name} />
                    <MyText text={`CI: ${item.ci}`} style={styles.text_details} />
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    <View style={styles.internalView}>
                        <ScrollView style={[styles.scollview, globalStyles.standardPadding]}>
                            {/* button add user*/}
                            <MyButton 
                                onPress={() => navigation.navigate("RegisterUser")} 
                                title="◽ Registrar" 
                                iconName="user-plus" 
                                btnColor="#AFB42B"
                                style={globalStyles.btnSmall}
                            />

                            {/* Botón para alternar la búsqueda */}
                            <MyButton 
                                onPress={() => setMostrarBusqueda(!mostrarBusqueda)} 
                                title="◽ Buscar" 
                                iconName="search" 
                                btnColor="#AFB42B"
                                style={globalStyles.btnSmall}
                            />

                            {mostrarBusqueda && (
                                <View style={styles.searchSection}>
                                    <MyInputText
                                        placeholder="Nombre, Apellido o CI"
                                        onChangeText={buscarUsuarios}
                                        value={busqueda}
                                    />
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View>
                <FlatList
                    data={usuarios}
                    keyExtractor={(item) => item.user_id.toString()}
                    renderItem={({ item }) => listItemView(item)}
                    style={styles.list}
                />
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
        flex: 0, // Ajustado para que no ocupe toda la pantalla y deje espacio a la lista
        justifyContent: "flex-start",
        paddingTop: 20
    },
    internalView: {
        justifyContent: "flex-start"
    },
    scollview: {
        flexGrow: 0,
        flexDirection: "column",
    },
    searchSection: {
        paddingHorizontal: 0,
    },
    list: {
        flex: 1,
        marginTop: 0,
        padding: 10,
    },
    listItemView: {
        backgroundColor: "white",
        marginHorizontal: 20,
        marginVertical: 5,
        padding: 15,
        borderRadius: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    textContainer: {
        flexDirection: 'column',
    },
    text_name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    text_details: {
        fontSize: 14,
        color: '#666',
    }
})

export default Usuario;