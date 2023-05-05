import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Keyboard ,Button, Alert } from "react-native";
import * as Animatable from 'react-native-animatable'
import { TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Controller, useForm } from 'react-hook-form'
import { Axios } from 'axios'
import { useEffect, useState } from "react";

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

//objeto do esquema de validaçao
const schema = yup.object({
  username: yup.string().email("Email invalido").required("Informe seu email"),
  password: yup.string().min(6, "A senha deve ter no minimo seis digitos").required("Informe sua senha")
})

export function SignIn({ navigation }) {

  //constantes que mudam de estado, por causa da lib react hook form
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  //funçao que valida os valores dos inputs e entra na tela home
  function handleSignIn(values) {

    return (
       navigation.navigate("Main")
      
    )
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
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (

                  <TextInput
                    style={[styles.input, {
                      borderWidth: errors.username && 2,
                      borderColor: errors.username && '#ff375b'
                    }]}
                    placeholder="Digite seu e-mail"
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}//quando o text input é tocado

                  />
                )}
              />
              {/* //quando errors usename for true, vai renderizar essa altercao */}
              {errors.username && <Text style={styles.labelError}> {errors.username?.message} </Text>}

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
                <TouchableOpacity onPress={handleSubmit(handleSignIn)} style={styles.buttonLogin}>
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
    backgroundColor: '#F0A500'

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
    borderColor:'black',
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
    marginBottom: 8,
  }



})