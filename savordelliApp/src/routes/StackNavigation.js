import { createStackNavigator } from '@react-navigation/stack';

import { Estoque } from '../screens/Stock'
import {Detail} from  '../screens/Detail'
import { EditProduct } from '../screens/EditProduct';

const Stack = createStackNavigator();

//criando uma função de navegação por pilha, para poder acessar a tela de detalhes dos produtos
export function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Estoque"
                component={Estoque}
                options={{
                    headerShown: false,
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
             <Stack.Screen
                name="b"
                component={EditProduct}
                options={{
                    headerShown: true,
                    title: "Editar o produto"
                }}
            />
            

        </Stack.Navigator>
    )

}