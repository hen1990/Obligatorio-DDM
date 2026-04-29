import { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  View,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
// importar inputs
import MyInputText from "../../components/MyInputText";
import MyButton from "../../components/MyButton";
import { globalStyles } from "../globalStyles";
import databaseConection from "../../database/database-manager";

const RegisterUser = ({ navigation }) => {
  // Definir los estados.
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [ci, setCi] = useState("");
  
  // Estados para Fecha y Roles
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [roles, setRoles] = useState([]);
  const [rolId, setRolId] = useState("");

  useEffect(() => {
    const loadRoles = async () => {
      const res = await databaseConection.getAllRoles();
      setRoles(res.rows);
      if (res.rows.length > 0) {
        setRolId(res.rows[0].id);
      }
    };
    loadRoles();
  }, []);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  // funcion de borrar los estados
  const clearData = () => {
    setNombre("");
    setApellido("");
    setCi("");
    setRolId(roles.length > 0 ? roles[0].id : "");
    setDate(new Date());
  };

  // Validar datos
  //Nombre
  const validateData = () => {
    if (!nombre.trim()) {
      Alert.alert("Ingresr nombre.");
      return false;
    }
    //Apellido
    if (!apellido.trim()) {
      Alert.alert("Ingresar apellido.");
      return false;
    }
    //Cedula
    if (!ci.trim()) {
      Alert.alert("Ingresar cedula.");
      return false;
    } else {
      for (let i = 0; i < ci.length; i++) {
        const code = ci.charCodeAt(i);
        if (code < 48 || code > 57) {
          Alert.alert("Ingrese solo números.");
          return false;
        } else if (ci.length != 8) {
          Alert.alert("Cédula debe contener 8 dígitos.");
          return false;
        }
      }
    }
    //Rol
    if (!rolId) {
      Alert.alert("Debe seleccionar un rol.");
      return false;
    }
    return true;
  };

  const usuarioExiste = async () => {
    try {
      const result = await databaseConection.usuarioExisteDB(ci);
      return result;
    } catch (error) {
      Alert.alert("Error al consultar usuario");
      return null;
    }
  };

  const saveUser = async () => {
    try {
      // Formato DD/MM/AAAA
      const fechaNacLocal = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      const result = await databaseConection.createUser(nombre, apellido, ci, fechaNacLocal, rolId);
      return result;
    } catch (error) {
      Alert.alert("Error al guardar usuario");
      return null;
    }
  };

  // funcion que se encargue de guardar los datos.
  const registerUser = async () => {
    if (validateData()) {
      const res = await usuarioExiste();
      if (res) {
        if (!res.rows[0]) {
          //guardar datos
          const result = await saveUser();
          if (result && result.rowsAffected > 0) {
            //  validar si se guardar los datos
            Alert.alert(
              "Exito",
              "Usuario registrado correctamente.",
              [
                {
                  text: "OK",
                  onPress: () => navigation.navigate("Usuario"),
                },
              ],
              {
                cancelable: false,
              }
            );
          } else {
            Alert.alert("Error al registrar usuario.");
          }
        } else {
          Alert.alert(
            "Usuario existente.",
            "La cédula ingresada ya se encuentra registrada.",
            [
              {
                text: "Aceptar",
              },
            ],
            {
              cancelable: false,
            }
          );
        }
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={styles.generalView}>
          <ScrollView contentContainerStyle={globalStyles.standardPadding}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboard}>

              <Text style={globalStyles.label}>Nombre *</Text>
              <MyInputText
                placeholder="Ingrese el nombre"
                onChangeText={setNombre}
                value={nombre}
              />

              <Text style={globalStyles.label}>Apellido *</Text>
              <MyInputText
                placeholder="Ingrese el apellido"
                onChangeText={setApellido}
                value={apellido}
              />

              <Text style={globalStyles.label}>Cédula *</Text>
              <MyInputText
                placeholder="12345678"
                onChangeText={setCi}
                maxLength={8}
                keyboardType="numeric"
                value={ci}
              />

              <Text style={globalStyles.label}>Fecha de Nacimiento *</Text>
              <TouchableOpacity style={globalStyles.dateButton} onPress={() => setShowDatePicker(true)}>
                <Text style={globalStyles.dateText}>
                  {`${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChangeDate}
                  maximumDate={new Date()}
                />
              )}

              <Text style={globalStyles.label}>Rol *</Text>
              <View style={globalStyles.pickerContainer}>
                <Picker
                  selectedValue={rolId}
                  onValueChange={(itemValue) => setRolId(itemValue)}
                >
                  {roles.map((rol) => (
                    <Picker.Item key={rol.id} label={rol.nombre} value={rol.id} />
                  ))}
                </Picker>
              </View>

              <Text style={globalStyles.legend}>* Campos obligatorios</Text>

              <MyButton 
                onPress={registerUser} 
                title="◽ Guardar" 
                btnColor="#AFB42B"
                style={globalStyles.btnSmall}
              />
            </KeyboardAvoidingView>
          </ScrollView>
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
    backgroundColor: "#ecf8e8",
  },
  generalView: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default RegisterUser;
