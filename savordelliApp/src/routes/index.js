import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

import { Home } from '../screens/Home';
import { StackRoutes } from './stackRoutes';
import { Menu } from '../screens/Menu'

//biblioteca de icones
import { Ionicons } from '@expo/vector-icons'
import { Welcome } from '../screens/Welcome';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';


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
                            return <Ionicons name='home' color="#f2f2f2" size={size} />
                        } else {
                            return <Ionicons name='home-outline' color={color} size={size} />
                        }

                    }
                }}

            />
        
     {/* renderizando o componenet stackRoutes, que gurada as telas do estoque e dos detalhes */}
     <Tab.Screen
                name="Produtos"
                component={StackRoutes}
                options={{
                    headerShown: false,
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
                    headerShown: false,
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

//função que manipula minhas rotas de navegação, quais ser'ao exibidas
export function Routes() {
    return (
        //usando a const Stack que cria a barra de navegação em pilhas
        <Stack.Navigator
            screenOptions={{
                headerShown:false,
            }}
        >
            <Stack.Screen
                name="Welcome"
                component={Welcome} />

            <Stack.Screen
                name="SignIn"
                component={SignIn} />

            <Stack.Screen
                name="SignUp"
                component={SignUp} />

            <Stack.Screen
                name="Main"
                component={TabNavigation} />
        </Stack.Navigator>
    );
}

