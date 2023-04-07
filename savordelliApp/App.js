
import { StyleSheet } from 'react-native';
import { Routes } from './src/routes'
import { NavigationContainer } from '@react-navigation/native'

//Componente principal
export default function App() {
  return (

    //executa a barra de navegacao com as rotas
    <NavigationContainer>
      <Routes/>
    </NavigationContainer>

  );
}

//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
