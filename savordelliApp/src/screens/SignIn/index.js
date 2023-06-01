import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Keyboard, Button, Alert, ToastAndroid } from "react-native";
import * as Animatable from 'react-native-animatable'
import { TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Controller, useForm } from 'react-hook-form'

//https://github.com/jquense/yup/blob/master/README.md --> DOCUMENTAÇÂO DA BIBLIOTECA
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// arquivo JavaScript que guarda no metodo api a base a URL da conexão com a api
import api from "../../services/api"; 


//objeto do esquema de validaçao da biblioteca yup 
//aqui passo o nome do atributo e seus tipos
//passo a quantidade maxima e mínima de caracteres que podem ser inseridos
//se ele é obrigatório ou não
const schema = yup.object({
  email: yup.string().email("Insira um email já cadastrado").max(64).required("Insira um e-mail válido"),
  password: yup.string().min(6, "A senha deve ter no minimo seis digitos").required("Insira uma senha válida"),
})

export function SignIn({ navigation }) {
 

  //constantes que mudam de estado, por causa da lib react hook form
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

   //função que recebe o objeto data, que contem todos atributos que o usuário inseriu nos campos,
    // realiza a requisição http do tipo POST mandando objeto data para o endpoint User/login e verifica se o usuario existe
    //e por fim trata o callback da api validando se o usuario existe(true) ou não(false) asssim navegando para tela de home
  async function handleLoginUser(data) {

    try {
      // const response = await api.get('/User/login',
      //   data);
      // console.log(response)
      
      //   const arrayData = [response.data]   
      // const value = arrayData.map(arrayData => arrayData.success )
      // const v = value.toString()
      // v == "false"
      if ( true) {
        ToastAndroid.show('Usuário não cadastrado ou algum campo pode estar errado', ToastAndroid.SHORT);     
        return navigation.navigate("Main")
      } else {
        ToastAndroid.show('Bem vindo(a)', ToastAndroid.SHORT);
        return navigation.navigate("Main")
      }
    } catch (error) {
      console.error(error);
    }


  }

  return (
    <View style={styles.container}>

      <Animatable.View animation="fadeInLeft" style={styles.containerLogo}>
        <Animatable.Image
          animation="fadeInLeft"
          source={require('../../../assets/b.png')}
          style={{ width: '60%' }}
          resizeMode="contain"

        />
      </Animatable.View>

      {/* form de login */}
      <Animatable.View delay={500} animation="fadeInUp" style={styles.containerForm} >

        {/* component do react-native que ajusta o tamanho do teclado quando abrir um input */}
        <KeyboardAvoidingView behavior="padding">
          <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>

            <Text style={styles.titleLogin}>Login</Text>

            <View style={styles.containerInputs}>

              <Text style={styles.title}>Email</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (

                  <TextInput
                    style={[styles.input, {
                      borderWidth: errors.email && 2,
                      borderColor: errors.email && '#ff375b'
                    }]}
                    placeholder="Digite seu e-mail"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}//quando o text input é tocado

                  />
                )}
              />
              {/* //quando errors usename for true, vai renderizar essa altercao */}
              {errors.email && <Text style={styles.labelError}> {errors.email?.message} </Text>}

              <Text style={styles.title}>Senha</Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, {
                      borderWidth: errors.password && 2,
                      borderColor: errors.password && '#ff375b'
                    }]}
                    placeholder="Digite sua senha"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}//quando o text input é tocado
                    secureTextEntry={true}
                  />
                )}
              />
              {errors.password && <Text style={styles.labelError}> {errors.password?.message} </Text>}
              <View style={styles.containerButtons}>
                <TouchableOpacity onPress={handleSubmit(handleLoginUser)} style={styles.buttonLogin}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.buttonCadastro}>
                  <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>
                
              </View>
              
            </View>


          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0A500',
  },
  containerLogo: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    top: '5%'
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    marginTop: '15%',
    borderTopLeftRadius: 11,
    borderTopRightRadius: 11,
    paddingStart: '5%',
    paddingEnd: '5%',

  },
  containerButtons: {
    paddingTop: '5%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    marginVertical: '5%'
  },
  containerInputs: {
    width: '100%',
    paddingStart: '5%',
    paddingEnd: '5%',

  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,

  },
  titleLogin: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 28,

  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    paddingStart: '5%',
    paddingEnd: '5%'
  },
  buttonCadastro: {
    width: '40%',
    backgroundColor: 'black',
    borderRadius: 5,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLogin: {
    width: '40%',
    backgroundColor: 'black',
    borderRadius: 5,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#f2f2f2',
    fontSize: 16,
    fontWeight: 'bold'
  },
  labelError: {
    alignSelf: 'flex-start',
    color: '#ff375b',

  }



})