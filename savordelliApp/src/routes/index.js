import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
//biblioteca de icones
import { Ionicons } from '@expo/vector-icons'
import { Welcome } from '../screens/Welcome';
import { SignIn } from '../screens/SignIn';
import { SignUp } from '../screens/SignUp';

import { TabNavigation } from './TabNavigation';


//usando o evento de criar navegações da lib ReacNavigation
export const Tab = createBottomTabNavigator();
export const Stack = createStackNavigator();

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

