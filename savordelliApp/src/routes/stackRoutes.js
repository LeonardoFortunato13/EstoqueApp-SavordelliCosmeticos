import { createStackNavigator } from '@react-navigation/stack';

import { Estoque } from '../screens/Stock'
import {Detail} from  '../screens/Detail'

const Stack = createStackNavigator();

//criando uma função de navegação por pilha, para poder acessar a tela de detalhes dos produtos
export function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Estoque"
                component={Estoque}
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="a"
                component={Detail}
                options={{
                    headerShown: true,
                    title: "detalhes do produto"
                }}
            />
            

        </Stack.Navigator>
    )

}