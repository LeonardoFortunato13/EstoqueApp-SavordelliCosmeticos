import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//criando a barra de navegação
const Tab = createBottomTabNavigator();
import { Home } from '../screens/home';
import { Estoque } from '../screens/estoque';
import { Menu } from '../screens/menu'

//biblioteca de icones
import { Ionicons } from '@expo/vector-icons'

//executando e renderizando a tab barra de navegação
export function Routes() {
    return (
        <Tab.Navigator
            screenOptions={{
                //esconde a barra de navegacao quando abrir o teclado
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#f2f2f2",
                tabBarStyle: {
                    backgroundColor: "#121212",
                    borderTopWidth: 0
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name='home' color="#f2f2f2" size={size} />
                        } else {
                            return <Ionicons name='home-outline' color={color} size={size} />
                        }

                    }
                }}

            />
            <Tab.Screen
                name="Estoque"
                component={Estoque}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name='cube' color="#f2f2f2" size={size} />
                        }
                        return <Ionicons name='cube-outline' color="#f2f2f2" size={size} />

                    }

                }}
            />
            <Tab.Screen name="Menu"
                component={Menu}
                options={{
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name='menu' color="#f2f2f2" size={size} />
                        }
                        return <Ionicons name='menu-outline' color="#f2f2f2" size={size} />

                    }

                }}
            />
        </Tab.Navigator>
    )



}

