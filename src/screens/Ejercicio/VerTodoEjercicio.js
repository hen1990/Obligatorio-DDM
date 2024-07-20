import { useState, useEffect } from "react";
import React, { useCallback } from 'react';
import { StyleSheet, SafeAreaView, FlatList, View, Alert, Text, Image, Linking, Button, Platform } from "react-native";
//import Video, { VideoRef } from 'react-native';
import MyText from "../../components/MyText";

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const VerTodoEjercicio = () => {
    // estados
    const [ejercicio, setEjercicio] = useState([]);

    useEffect(() => {
        const cargarEjercicio = async () => {
            const res = await buscarEjercicios();
            if (res.rows.length > 0) {
                let elements = []
                for (let i = 0; i < res.rows.length; i++) {
                    elements.push(res.rows[i])
                }
                setEjercicio(elements);
            }
        }
        cargarEjercicio();
    }, []);

    const buscarEjercicios = async () => {
        const readOnly = false;
        let result = null;
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getAllEjercicio(tx);
        }, readOnly);
        return result;
    };

    const OpenURLButton = ({ url, children }) => {
        const handlePress = useCallback(async () => {
            if (url.toString().trim()) {
                const supported = await Linking.canOpenURL(url);

                if (supported) {
                    await Linking.openURL(url);
                } else {
                    Alert.alert(`No se pudo abrir la siguiente URL: "${url}"`);
                }
            } else {
                Alert.alert(`No hay video para mostrar en este ejericio`);
            }
        }, [url]);

        const buttonColor = Platform.select({
            ios: '#673AB7',
            android: '#673AB7'
        });

        return <Button title={children} onPress={handlePress} color={buttonColor} />;
    };



    const listItemView = (item) => {
        return (
            <View key={item.id_ejercicio} style={styles.listItemView}>
                <View style={styles.textContainer}>
                    <MyText text={item.nom_ejercicio} style={styles.text_data} />
                    {item.nombre ? (
                        <MyText text={`Máquina: ${item.nombre}`} style={styles.text_data} />
                    ) : (
                        <MyText text="Sin máquina" style={styles.text_data} />
                    )}
                </View>
                <View style={styles.imageContainer}>
                    {item.fotoUrl ? (
                        <Image
                            source={{ uri: item.fotoUrl }}
                            style={styles.image}
                        />
                    ) : (
                        <Image
                            source={{ uri: 'https://st4.depositphotos.com/3265223/24936/v/450/depositphotos_249366040-stock-illustration-fitness-gym-logo-with-strong.jpg' }}
                            style={styles.image}
                        />
                    )}
                    {item.videoUrl ? (
                        <OpenURLButton url={item.videoUrl} style={styles.button}>Ver Video</OpenURLButton>
                    ) : (
                        <OpenURLButton url="" style={styles.button}>Sin Video</OpenURLButton>
                    )}
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {ejercicio.length ? (
                <FlatList
                    data={ejercicio}
                    contentContainerStyle={styles.flatContainer}
                    keyExtractor={(item) => item.id_ejercicio.toString()}
                    renderItem={({ item }) => listItemView(item)}
                />
            ) : (
                <View style={styles.empty}>
                    <Text style={styles.emptyText}> No se encuentran ejercicios</Text>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text_data: {
        padding: 3,
        marginLeft: 5,
        color: "#2f2f2f",
        alignContent: "center",
        alignItems: "center",
        fontSize: 20,
    },
    empty: {
        flex: 1,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    emptyText: {
        fontSize: 20,
        alignSelf: "center",
        alignContent: "center",
    },

    listItemView: {
        backgroundColor: '#f4edff',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#673AB7",
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
        flex: 1,
        resizeMode: 'cover',
        borderColor: "#673AB7",
        borderWidth: 2,
    },
});

export default VerTodoEjercicio;
