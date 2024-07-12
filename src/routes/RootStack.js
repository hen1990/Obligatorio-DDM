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
                                backgroundColor: "#b1cb72",
                            },
                            headerTintColor: "#fff",
                            headerTitleStyle: {
                                fontWeight: "bold",
                                fontSize: 26
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
                                backgroundColor: "#b1cb72",
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
                                backgroundColor: "#b1cb72",
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
                                backgroundColor: "#b1cb72",
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
                                backgroundColor: "#b1cb72",
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
                                backgroundColor: "#b1cb72",
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
                        name="UsuarioBorrarTodo"
                        component={UsuarioBorrarTodo}
                        options={{
                            title: "Borrar Todos los Usuario",
                            headerStyle: {
                                backgroundColor: "#b1cb72",
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
                            title: "Tipos de Maquinas",
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
                    {/* Crear Tipo Maquina */}
                    <Stack.Screen
                        name="CrearTipoMaquina"
                        component={CrearTipoMaquina}
                        options={{
                            title: "Ingresar Maquinas",
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
                    {/* ActualizarTipo Maquina */}
                    <Stack.Screen
                        name="ActualizarTipoMaquina"
                        component={ActualizarTipoMaquina}
                        options={{
                            title: "Actualizar Tipos de Maquinas",
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
                      {/* Eliminar Tipo Maquina */}
                      <Stack.Screen
                        name="EliminarTipoMaquina"
                        component={EliminarTipoMaquina}
                        options={{
                            title: "Eliminar Tipo de Maquina",
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
                    {/* Ver Tipo Maquina */}
                    <Stack.Screen
                        name="VerTodosTipoMaquina"
                        component={VerTodosTipoMaquina}
                        options={{
                            title: "Listar Tipos de Maquinas",
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

                    {/* Eliminar Todo Tipo Maquina */}
                    <Stack.Screen
                        name="EliminarTodosTipoMaquina"
                        component={EliminarTodosTipoMaquina}
                        options={{
                            title: "Eliminar todos los Tipos de Maquinas",
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

                    {/* Maquina _____________________________________________________________________________________________________________________*/}
                    <Stack.Screen
                        name="Maquina"
                        component={Maquina}
                        options={{
                            title: "Maquinas",
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
                    {/* Crear Maquina */}
                    <Stack.Screen
                        name="CrearMaquina"
                        component={CrearMaquina}
                        options={{
                            title: "Ingresar Maquinas",
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
                    {/* Actualizar Maquina */}
                    <Stack.Screen
                        name="ActualizarMaquina"
                        component={ActualizarMaquina}
                        options={{
                            title: "Actualizar Maquinas",
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
                    {/* Ver Maquina */}
                    <Stack.Screen
                        name="VerTodoMaquina"
                        component={VerTodoMaquina}
                        options={{
                            title: "Listar Maquinas",
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
                     {/* Eliminar Maquina */}
                     <Stack.Screen
                        name="ElimiarMaquina"
                        component={ElimiarMaquina}
                        options={{
                            title: "Eliminar Maquinas",
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

                    {/* Eliminar Todo Maquina */}
                    <Stack.Screen
                        name="EliminarTodoMaquina"
                        component={EliminarTodoMaquina}
                        options={{
                            title: "Eliminar todas las Maquinas",
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

                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}

export default RootStack
