import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

import { Home } from '../screens/Home';
import { StackRoutes } from './StackNavigation';

//biblioteca de icones
import { Ionicons } from '@expo/vector-icons'
import { CreateRoutes } from './StackNavigationCreate';



//usando o evento de criar navegações da lib ReacNavigation
export const Tab = createBottomTabNavigator();
export const Stack = createStackNavigator();

export function TabNavigation() {
    return (
        //usando a const Tab que cria a barra de navegação em baixo
        <Tab.Navigator
            screenOptions={{
                //esconde a barra de navegacao quando abrir o teclado
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#f2f2f2",
                tabBarStyle: {
                    backgroundColor: "#161719",
                    borderTopWidth: 0,
                    borderTopLeftRadius: 28,
                    borderTopRightRadius: 28,
                    height: '10%',
                }
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name='home' color="#F0A500" size={size} />
                        } else {
                            return <Ionicons name='home-outline' color={"#f2f2f2"} size={size} />
                        }

                    }
                }}

            />
        
     {/* renderizando o componenet stackRoutes, que gurada as telas do estoque e dos detalhes */}
     
     <Tab.Screen name="Create"
            component={CreateRoutes}
            options={{
                headerShown: false,
                tabBarIcon: ({ color, size, focused }) => {
                    if (focused) {
                        return <Ionicons name='add-circle' color="#F0A500" size={35} />
                    }
                    return <Ionicons name='add' color="#F0A500" size={35} />

                }

            }}
        />
            <Tab.Screen
                name="Produtos"
                component={StackRoutes}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size, focused }) => {
                        if (focused) {
                            return <Ionicons name='cube' color={"#F0A500"} size={size} />
                        }
                        return <Ionicons name='cube-outline' color={"#f2f2f2"} size={size} />

                    }

                }}
            />
        </Tab.Navigator>
    )

}