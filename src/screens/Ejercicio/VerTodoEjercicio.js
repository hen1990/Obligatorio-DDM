import { useState, useEffect } from "react";
import React, {useCallback} from 'react';
import {
    StyleSheet,
    SafeAreaView,
    FlatList,
    View,
    Text,
    Image,
    Linking,
    Button,
    Platform
} from "react-native";
import Video, { VideoRef } from 'react-native';
import MyText from "../../components/MyText";

import databaseConection from "../../database/database-manager";
import Maquina from "../Maquina";
const db = databaseConection.getConnection();

const VerTodoEjercicio = () => {
    // estado
    const [ejercicio, setEjercicio] = useState([]);
    //const [listaTiposMaquinas, setListaTiposMaquinas] = useState([]);

    useEffect(() => {
        console.log("cargando Ejercicios");
        const cargarEjercicio = async () => {
            const res = await buscarEjercicios();
            if (res.rows.length > 0) {
                let elements = []
                for (let i = 0; i < res.rows.length; i++) {
                    elements.push(res.rows[i])
                }
                setEjercicio(elements);
                console.log("Ejercicios", elements);
            }
        }
        cargarEjercicio();
    }, []);

    const buscarEjercicios = async () => {
        console.log("buscando ejercicio")
        const readOnly = false;
        let result = null;
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getAllEjercicio(tx);
            console.log("resultado", result)
        }, readOnly);
        // seteara test
        return result;
    };

    const OpenURLButton = ({url, children}) => {
        const handlePress = useCallback(async () => {
          // Checking if the link is supported for links with custom URL scheme.
          const supported = await Linking.canOpenURL(url);
      
          if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
          } else {
            Alert.alert(`Don't know how to open this URL: ${url}`);
          }
        }, [url]);

          // Define the color based on the platform
  const buttonColor = Platform.select({
    ios: '#007AFF',   // Blue color for iOS
    android: '#3DDC84' // Green color for Android
  });
      
        return <Button title={children} onPress={handlePress}  color={buttonColor}/>;
      };

 

    const listItemView = (item) => {
        const supportedURL = 'https://google.com';

        return (
            <View key={item.id} style={styles.listItemView}>
                <View style={styles.textContainer}>
                    <MyText text={item.nom_ejercicio} style={styles.text_data} />
                    <MyText text={`Máquina: ${item.nombre}`} style={styles.text_data1} />
                </View>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: item.fotoUrl }}
                        style={styles.image}
                    />

                    <OpenURLButton url={item.videoUrl} style={styles.button}>Ver Video</OpenURLButton>

                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
                <View style={styles.generalView}>
                    {ejercicio.length ? (
                        <FlatList
                            data={ejercicio}
                            contentContainerStyle={styles.flatContainer}
                            keyExtractor={(index) => index.toString()}
                            renderItem={({ item }) => listItemView(item)}
                        />
                    ) : (
                        <View style={styles.empty}>
                            <Text style={styles.emptyText}> No se encuentran máquinas</Text>
                        </View>
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },
    generalView: {
        flex: 1,
    },
    listView: {
        marginTop: 0,
    },
    listItemView: {
        backgroundColor: "#d9f1d1",
        padding: 30,
        borderColor: "#c6eab9",
        borderWidth: 2,
    },
    text_data: {
        padding: 5,
        marginLeft: 10,
        color: "black",
        alignContent: "center",
        alignItems: "center",
        fontSize: 28,
    },
    text_data1: {
        padding: 5,
        marginLeft: 10,
        color: "#2f2f2f",
        alignContent: "center",
        alignItems: "center",
        fontSize: 24,
    },
    empty: {
        flex: 1,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    emptyText: {
        fontSize: 30,
        alignSelf: "center",
        alignContent: "center",
    },

    listItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#A9DFBF',
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    imageContainer: {
        width: 120,
        height: 120,
    },
    image: {
        flex: 1, // Para que la imagen ocupe todo el espacio disponible
        resizeMode: 'cover', // Ajustar tamaño de la imagen según el espacio disponible
    },
});

export default VerTodoEjercicio;
