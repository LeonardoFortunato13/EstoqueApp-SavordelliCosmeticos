import { Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground } from "react-native";
import * as Animatable from 'react-native-animatable'


export function Welcome({ navigation }) {
  return (
    <View style={styles.container}>


      <View style={styles.containerLogo}>
        <Animatable.Image
          animation="flipInX"
          source={require('../../../assets/b.png')}
          style={{ width: '100%' }}
          resizeMode="contain"

        />

      </View>

      <Animatable.View delay={600} animation="fadeInUp" style={styles.containerForm} >
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.text}>Faça login para começar</Text>
        
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")} style={styles.button}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      
      </Animatable.View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1C20'
  },
  containerLogo: {
    flex: 2,

    justifyContent: 'center',
    alignItems: 'center'
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,
    marginBottom: 12,
  },
  text: {
    color: 'black'
  },
  button: {
    position: 'absolute',
    backgroundColor: '#F0A500',
    borderRadius: 5,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center',
    bottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',

  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  



})