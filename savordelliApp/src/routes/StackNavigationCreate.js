import { createStackNavigator } from '@react-navigation/stack';
import { RegisterProduct } from '../screens/RegisterProduct';
import { Create } from '../screens/Create';
import { RegisterCategory } from '../screens/RegisterCategory';
import { RegisterSubcategory } from '../screens/RegisterSubcategory';
import { RegisterMarca } from '../screens/RegisterMarca';


const Stack = createStackNavigator();

//criando uma função de navegação por pilha, para poder acessar a tela de detalhes dos produtos
export function CreateRoutes() {
    return (
        <Stack.Navigator>            
          
          <Stack.Screen
                name="create"
                component={Create}
                options={{
                    headerShown: false,           
                }}         
            />
            <Stack.Screen
                name="Cadastrar Produto"
                component={RegisterProduct}
                options={{
                    headerShown: true,           
                }}         
            />
             <Stack.Screen
                name="Cadastrar Categoria"
                component={RegisterCategory}
                options={{
                    headerShown: true,
                  
                }}
            /> 
              <Stack.Screen
                name="Cadastrar Subcategoria"
                component={RegisterSubcategory}
                options={{
                    headerShown: true,
               
                }}
            />
              <Stack.Screen
                name="Cadastrar Marca"
                component={RegisterMarca}
                options={{
                    headerShown: true,
          
                }}
            /> 
        </Stack.Navigator>
    )

}