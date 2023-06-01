import { StyleSheet } from 'react-native';
import  {Routes}  from './src/routes'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'; 
import { ButtonProvider } from './src/components/ButtonContext';
//Componente principal
export default function App() {
  return (

    //executa a barra de navegacao com as rotas
    <NavigationContainer>
        <ButtonProvider>
        <StatusBar backgroundColor="#1A1C20" barStyle="light-content" />
        <Routes style={styles.container} />
      </ButtonProvider>
    </NavigationContainer>

  );
}

//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
