import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

// importo todas las pantallas
//Home Screen
import HomeScreen from "../screens/HomeScreen";
import Usuario from "../screens/Usuario";

//Usuario screen
import RegisterUser from "../screens/Usuario/RegisterUser";
import UpdateUser from "../screens/Usuario/UpdateUser";
import DeleteUser from "../screens/Usuario/DeleteUser";
import ViewUser from "../screens/Usuario/ViewUser";
import ViewAllUsers from "../screens/Usuario/ViewAllUsers"
import UsuarioBorrarTodo from "../screens/Usuario/UsuarioBorrarTodo";
import TipoMaquina from "../screens/TipoMaquina";
import CrearTipoMaquina from "../screens/TipoMaquina/CrearTipoMaquina";
import ActualizarTipoMaquina from "../screens/TipoMaquina/ActualizarTipoMaquina";
import EliminarTodosTipoMaquina from "../screens/TipoMaquina/EliminarTodosTipoMaquina";
import VerTodosTipoMaquina from "../screens/TipoMaquina/VerTodosTipoMaquina";
import Maquina from "../screens/Maquina";
import CrearMaquina from "../screens/Maquina/CrearMaquina";
import ActualizarMaquina from "../screens/Maquina/ActualizarMaquina";
import VerTodoMaquina from "../screens/Maquina/VerTodasMaquinas";
import EliminarTodoMaquina from "../screens/Maquina/EliminarTodasMaquinas";
import ElimiarMaquina from "../screens/Maquina/EliminarMaquina";
import EliminarTipoMaquina from "../screens/TipoMaquina/EliminarTipoMaquina";
import Ejercicio from "../screens/Ejercicio";
import CrearEjercicio from "../screens/Ejercicio/CrearEjercicio";
import ActualizarEjercicio from "../screens/Ejercicio/ActualizarEjercicio";
import EliminarEjercicio from "../screens/Ejercicio/EliminarEjercicio";
import VerTodoEjercicio from "../screens/Ejercicio/VerTodoEjercicio";
import EliminarTodoEjercicio from "../screens/Ejercicio/EliminarTodoEjercicio";
import Rutina from "../screens/Rutina";
import CrearRutina from "../screens/Rutina/CrearRutina";
import ActualizarRutina from "../screens/Rutina/ActualizarRutina";
import VerTodoRutina from "../screens/Rutina/VerTodoRutina";
import EliminarRutina from "../screens/Rutina/EliminarRutina";
import EliminarTodoRutina from "../screens/Rutina/EliminarTodoRutina";

const RootStack = () => {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="HomeScreen">
                    {/* home */}
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={{
                            title: "Inicio - CTC GYM",
                            headerStyle: {
                                backgroundColor: "#b1cb72",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />
                    {/*usuario */}
                    <Stack.Screen
                        name="Usuario"
                        component={Usuario}
                        options={{
                            title: "Usuario",
                            headerStyle: {
                                backgroundColor: "#C0CA33",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 36
                            }
                        }}
                    />
                    {/* crear usuario */}
                    <Stack.Screen
                        name="RegisterUser"
                        component={RegisterUser}
                        options={{
                            title: "Registrar Usuario",
                            headerStyle: {
                                backgroundColor: "#C0CA33",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 26
                            }
                        }}
                    />
                    {/* update de usuario */}
                    <Stack.Screen
                        name="UpdateUser"
                        component={UpdateUser}
                        options={{
                            title: "Actualizar Usuario",
                            headerStyle: {
                                backgroundColor: "#C0CA33",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 26
                            }
                        }}
                    />
                    {/* borrar un usuario */}
                    <Stack.Screen
                        name="DeleteUser"
                        component={DeleteUser}
                        options={{
                            title: "Borrar Usuario",
                            headerStyle: {
                                backgroundColor: "#C0CA33",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 26
                            }
                        }}
                    />
                    {/* ver un usuario */}
                    <Stack.Screen
                        name="ViewUser"
                        component={ViewUser}
                        options={{
                            title: "Ver Usuario",
                            headerStyle: {
                                backgroundColor: "#C0CA33",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 26
                            }
                        }}
                    />
                    {/* ver todos los usuario */}
                    <Stack.Screen
                        name="ViewAllUsers"
                        component={ViewAllUsers}
                        options={{
                            title: "Todos los Usuarios",
                            headerStyle: {
                                backgroundColor: "#C0CA33",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 26
                            }
                        }}
                    />
                    {/* Borrar todos los usuario */}
                    <Stack.Screen
                        name="UsuarioBorrarTodo"
                        component={UsuarioBorrarTodo}
                        options={{
                            title: "Borrar Todos los Usuario",
                            headerStyle: {
                                backgroundColor: "#C0CA33",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 26
                            }
                        }}
                    />
                    {/* Tipo Maquina ____________________________________________________________________________________________________________________*/}
                    <Stack.Screen
                        name="TipoMaquina"
                        component={TipoMaquina}
                        options={{
                            title: "Tipos Maquinas",
                            headerStyle: {
                                backgroundColor: "#8BC34A",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 36
                            }
                        }}
                    />
                    {/* Crear Tipo Maquina */}
                    <Stack.Screen
                        name="CrearTipoMaquina"
                        component={CrearTipoMaquina}
                        options={{
                            title: "Agregar Máquina",
                            headerStyle: {
                                backgroundColor: "#8BC34A",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />
                    {/* ActualizarTipo Maquina */}
                    <Stack.Screen
                        name="ActualizarTipoMaquina"
                        component={ActualizarTipoMaquina}
                        options={{
                            title: "Actualizar Tipos de Maquinas",
                            headerStyle: {
                                backgroundColor: "#8BC34A",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />
                    {/* Eliminar Tipo Maquina */}
                    <Stack.Screen
                        name="EliminarTipoMaquina"
                        component={EliminarTipoMaquina}
                        options={{
                            title: "Eliminar Tipo de Maquina",
                            headerStyle: {
                                backgroundColor: "#8BC34A",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />
                    {/* Ver Tipo Maquina */}
                    <Stack.Screen
                        name="VerTodosTipoMaquina"
                        component={VerTodosTipoMaquina}
                        options={{
                            title: "Listar Tipos de Maquinas",
                            headerStyle: {
                                backgroundColor: "#8BC34A",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />

                    {/* Eliminar Todo Tipo Maquina */}
                    <Stack.Screen
                        name="EliminarTodosTipoMaquina"
                        component={EliminarTodosTipoMaquina}
                        options={{
                            title: "Eliminar todos los Tipos de Maquinas",
                            headerStyle: {
                                backgroundColor: "#8BC34A",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />

                    {/* Maquina _____________________________________________________________________________________________________________________*/}
                    <Stack.Screen
                        name="Maquina"
                        component={Maquina}
                        options={{
                            title: "Maquinas",
                            headerStyle: {
                                backgroundColor: "#4CAF50",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 36
                            }
                        }}
                    />
                    {/* Crear Maquina */}
                    <Stack.Screen
                        name="CrearMaquina"
                        component={CrearMaquina}
                        options={{
                            title: "Ingresar Maquinas",
                            headerStyle: {
                                backgroundColor: "#4CAF50",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />
                    {/* Actualizar Maquina */}
                    <Stack.Screen
                        name="ActualizarMaquina"
                        component={ActualizarMaquina}
                        options={{
                            title: "Actualizar Maquinas",
                            headerStyle: {
                                backgroundColor: "#4CAF50",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />
                    {/* Ver Maquina */}
                    <Stack.Screen
                        name="VerTodoMaquina"
                        component={VerTodoMaquina}
                        options={{
                            title: "Listar Maquinas",
                            headerStyle: {
                                backgroundColor: "#4CAF50",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />
                    {/* Eliminar Maquina */}
                    <Stack.Screen
                        name="ElimiarMaquina"
                        component={ElimiarMaquina}
                        options={{
                            title: "Eliminar Maquinas",
                            headerStyle: {
                                backgroundColor: "#4CAF50",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />

                    {/* Eliminar Todo Maquina */}
                    <Stack.Screen
                        name="EliminarTodoMaquina"
                        component={EliminarTodoMaquina}
                        options={{
                            title: "Eliminar todas las Maquinas",
                            headerStyle: {
                                backgroundColor: "#4CAF50",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />

                    {/* Ejercicio _____________________________________________________________________________________________________________________*/}
                    <Stack.Screen
                        name="Ejercicio"
                        component={Ejercicio}
                        options={{
                            title: "Ejercicios",
                            headerStyle: {
                                backgroundColor: "#9575CD",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 36
                            }
                        }}
                    />
                    {/* Crear Ejercicio */}
                    <Stack.Screen
                        name="CrearEjercicio"
                        component={CrearEjercicio}
                        options={{
                            title: "Ingresar Ejercicio",
                            headerStyle: {
                                backgroundColor: "#9575CD",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />
                    {/* Actualizar Ejercicio */}
                    <Stack.Screen
                        name="ActualizarEjercicio"
                        component={ActualizarEjercicio}
                        options={{
                            title: "Actualizar Ejercicio",
                            headerStyle: {
                                backgroundColor: "#9575CD",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />
                    {/* Ver Ejercicio */}
                    <Stack.Screen
                        name="VerTodoEjercicio"
                        component={VerTodoEjercicio}
                        options={{
                            title: "Listar Ejercicios",
                            headerStyle: {
                                backgroundColor: "#9575CD",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />
                    {/* Eliminar Ejercicio */}
                    <Stack.Screen
                        name="ElimiarEjercicio"
                        component={EliminarEjercicio}
                        options={{
                            title: "Eliminar Ejercicio",
                            headerStyle: {
                                backgroundColor: "#9575CD",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />

                    {/* Eliminar Todo Ejercicios */}
                    <Stack.Screen
                        name="EliminarTodoEjercicio"
                        component={EliminarTodoEjercicio}
                        options={{
                            title: "Eliminar todos los Ejercicios",
                            headerStyle: {
                                backgroundColor: "#9575CD",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />

                    {/* Rutina _____________________________________________________________________________________________________________________*/}
                    <Stack.Screen
                        name="Rutina"
                        component={Rutina}
                        options={{
                            title: "Rutinas",
                            headerStyle: {
                                backgroundColor: "#00a1a7",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 36
                            }
                        }}
                    />
                    {/* Crear Rutina */}
                    <Stack.Screen
                        name="CrearRutina"
                        component={CrearRutina}
                        options={{
                            title: "Ingresar Rutina",
                            headerStyle: {
                                backgroundColor: "#00a1a7",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />
                    {/* Actualizar Rutina */}
                    <Stack.Screen
                        name="ActualizarRutina"
                        component={ActualizarRutina}
                        options={{
                            title: "Actualizar Rutina",
                            headerStyle: {
                                backgroundColor: "#00a1a7",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />
                    {/* Ver Rutina */}
                    <Stack.Screen
                        name="VerTodoRutina"
                        component={VerTodoRutina}
                        options={{
                            title: "Listar Rutinas",
                            headerStyle: {
                                backgroundColor: "#00a1a7",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />
                    {/* Eliminar Rutina */}
                    <Stack.Screen
                        name="ElimiarRutina"
                        component={EliminarRutina}
                        options={{
                            title: "Eliminar Rutina",
                            headerStyle: {
                                backgroundColor: "##00a1a7",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />

                    {/* Eliminar Todo Rutina */}
                    <Stack.Screen
                        name="EliminarTodoRutina"
                        component={EliminarTodoRutina}
                        options={{
                            title: "Eliminar todas las Rutinas",
                            headerStyle: {
                                backgroundColor: "#00a1a7",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 30
                            }
                        }}
                    />

                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default RootStack
