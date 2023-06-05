import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard, ScrollView,
    Image,
    Alert,
    ToastAndroid
} from "react-native";

import { TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Controller, useForm } from 'react-hook-form'
import { Ionicons } from '@expo/vector-icons'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

//objeto do esquema de validaçao da biblioteca yup


export function RegisterMarca({ }) {

    const route = useRoute();
    const navigation = useNavigation();
    const schema = yup.object({
        marca: yup.string().max(25, "Texto muito grande").required("Insira o nome da marca desejada"),

    })

    //constantes que mudam de estado, por causa da lib react hook form
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    //funçao que valida os valores dos inputs e entra na tela estoque
    async function handleRegisterMarca(data) {
     
        try {

            const response = await fetch('http://18.231.16.235:3030/Marca/create',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
            console.log(data)
            if (response.ok) {
                ToastAndroid.show('Marca cadastrada com sucesso 🎉!', ToastAndroid.SHORT);

            } else {
                console.error('Erro ao cadastrar marca:', response);


            }
        } catch (error) {
            console.error('Erro ao realizar a solicitação:', error);
        }
    }


    //tratando variaveis do tipo number e date que vao no placeholder


    return (
        <ScrollView style={styles.container}>


            {/* form de cadastro do produto */}
            <View style={styles.containerForm} >

                {/* component do react-native que ajusta o tamanho do teclado quando abrir um input */}
                <KeyboardAvoidingView >
                    <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>


                        <View style={styles.containerInputs}>

                            <Text style={styles.title}>Marca</Text>
                
                            <Controller
                                control={control}
                                name="marca"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={[styles.input, {
                                            borderWidth: errors.marca && 2,
                                            borderColor: errors.marca && '#ff375b'
                                        }]}
                                        placeholder={"Digite o novo nome da sua nova categoria"}
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}//quando o text input é tocado

                                    />
                                )}
                            />
                            {/* //quando errors usename for true, vai renderizar essa altercao */}
                            {errors.marca && <Text style={styles.labelError}> {errors.marca?.message} </Text>}

                            <View style={styles.containerButtons}>

                                <TouchableOpacity onPress={handleSubmit( handleRegisterMarca)} style={styles.buttonCadastro}>
                                    <Text style={styles.buttonText}>Feito</Text>
                                </TouchableOpacity>

                            </View>
                        </View>


                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 20,
        width: '100%'

    },
    img: {
        width: 180,
        height: 180,
        backgroundColor: 'purple',
        alignSelf: 'center'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 2,

    },
    titleLogin: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,

    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        paddingStart: 8,
        paddingRight: 8,
    },
    inputIcon: {
        width: '90%',
        maxWidth: '90%',
        height: 30,
        backgroundColor: '#fff',
        borderRadius: 3, paddingStart: 8
    },
    boxInputIcon: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingStart: 8,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    buttonCadastro: {
        width: '40%',
        backgroundColor: 'black',
        borderRadius: 5,
        paddingVertical: 8,
        alignSelf: 'flex-end',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: '10%'
    },
    buttonText: {
        color: '#f2f2f2',
        fontSize: 16,
        fontWeight: 'bold'
    },
    labelError: {
        alignSelf: 'flex-start',
        color: '#ff375b',

    },




})