import { useState, useEffect } from "react";
import {
    StyleSheet,
    SafeAreaView,
    FlatList,
    View,
    Text,
    Image,
} from "react-native";
import MyText from "../../components/MyText";

import databaseConection from "../../database/database-manager";
const db = databaseConection.getConnection();

const VerTodoRutina = () => {
    // estado
    const [rutinas, setRutinas] = useState([]);
    const [listaTiposMaquinas, setListaTiposMaquinas] = useState([]);

    useEffect(() => {
        const cargarRutinas = async () => {
            const res = await buscarRutinas();
            if (res.rows.length > 0) {
                let elements = []
                for (let i = 0; i < res.rows.length; i++) {
                    elements.push(res.rows[i])
                }
                setRutinas(elements);
                console.log("Rutinas", elements);
               
            }
        }
        cargarRutinas();
    }, []);

    
    const buscarRutinas = async () => {
        const readOnly = false;
        let result = null
        await db.transactionAsync(async (tx) => {
            result = await databaseConection.getAllRutinas(tx);
        }, readOnly);
        return result;
    }

  
        const agruparRutinas = () => {
          const grupos = {};
          rutinas.forEach(item => {
            const { nom_usuario, dia_rutina, nom_ejercicio, series, repeticiones } = item;
            if (!grupos[nom_usuario]) {
              grupos[nom_usuario] = {};
            }
            if (!grupos[nom_usuario][dia_rutina]) {
              grupos[nom_usuario][dia_rutina] = [];
            }
            grupos[nom_usuario][dia_rutina].push({ nom_ejercicio, series, repeticiones });
          });
          return grupos;
        };
      
        // Función para renderizar cada elemento de la lista
        const listItemView = (usuario, diaRutina, ejercicios) => {
          return (
            <View key={`${usuario}-${diaRutina}`} style={styles.listItemView}>
              <View style={styles.textContainer}>
                <Text style={styles.text_data}>{usuario}</Text>
                <Text style={styles.text_data1}>{diaRutina}</Text>
                {ejercicios.map((ejercicio, index) => (
                  <View key={index} style={styles.ejercicioContainer}>
                    <Text style={styles.text_data1}>{ejercicio.nom_ejercicio}</Text>
                    <View style={styles.series}>
                    <Text style={styles.text_data1}>Series: {ejercicio.series}</Text>
                    <Text style={styles.text_data1}>Repeticiones: {ejercicio.repeticiones}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          );
        };
      
        return (
          <SafeAreaView style={styles.container}>
            <View style={styles.viewContainer}>
              <View style={styles.generalView}>
                {rutinas.length ? (
                  <FlatList
                    data={Object.keys(agruparRutinas())}
                    contentContainerStyle={styles.flatContainer}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => {
                      const grupos = agruparRutinas();
                      const usuario = item;
                      return (
                        <>
                          {Object.keys(grupos[usuario]).map(diaRutina => (
                            listItemView(usuario, diaRutina, grupos[usuario][diaRutina])
                          ))}
                        </>
                      );
                    }}
                  />
                ) : (
                  <View style={styles.empty}>
                    <Text style={styles.emptyText}> No se encuentran rutinas</Text>
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
        backgroundColor: '#fff',
      },
      viewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      },
      generalView: {
        flex: 1,
        width: '100%',
      },
      flatContainer: {
        flexGrow: 1,
      },
      empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      emptyText: {
        fontSize: 18,
        textAlign: 'center',
      },
      listItemView: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#00838F"
      },
      textContainer: {
        flexDirection: 'column',
      },
      text_data: {
        fontSize: 26,
        marginBottom: 5,
      },
      text_data1: {
        fontSize: 20,
        marginBottom: 3,
        marginLeft: 20,
      },
      series: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#673AB7",
    },
      ejercicioContainer: {
        marginLeft: 20,
        padding: 10,
      },
});

export default VerTodoRutina;
