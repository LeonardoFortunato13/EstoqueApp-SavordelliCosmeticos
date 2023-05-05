import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Keyboard, Button, Alert } from "react-native";
import * as Animatable from 'react-native-animatable'
import { TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Controller, useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

//objeto do esquema de validaçao
const schema = yup.object({

    name: yup.string().required("Informe seu nome"),
    username: yup.string().email("Email invalido").required("Email pode estar incorreto"),
    password: yup.string().min(6, "A senha deve ter no minimo seis digitos").required("Senha pode estar incorreta"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null],'As senhas devem ser iguais'),

})

export function SignUp({ navigation }) {

    //constantes que mudam de estado, por causa da lib react hook form
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    //funçao que valida os valores dos inputs e entra na tela home
    function handleSignIn(values) {

        return (

            console.log(values)
        )
    }

    return (
        <View style={styles.container}>



            {/* form de login */}
            <View style={styles.containerForm} >
                <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>
                    {/* component do react-native que ajusta o tamanho do teclado quando abrir um input */}
                    <KeyboardAvoidingView behavior="position" enabled>

                        <Animatable.View animation="fadeInLeft" style={styles.containerHeader}>
                            <Text style={styles.title}>Crie uma conta para poder acessar o app</Text>
                        </Animatable.View>


                        <Animatable.View delay={500} animation="fadeInUp" style={styles.containerInputs}>

                            <Text style={styles.titleCadastro}>Cadastro</Text>

                            <Text style={styles.label}>Nome</Text>
                            <Controller
                                control={control}
                                name="name"
                                render={({ field: { onChange, onBlur, value } }) => (

                                    <TextInput
                                        style={[styles.input, {
                                            borderWidth: errors.name && 2,
                                            borderColor: errors.name && '#ff375b',


                                        }]}
                                        placeholder="Digite seu e-mail"
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}//quando o text input é tocado

                                    />
                                )}
                            />
                            {/* //quando errors usename for true, vai renderizar essa altercao */}
                            {errors.name && <Text style={styles.labelError}> {errors.name?.message} </Text>}

                            <Text style={styles.label}>Email</Text>
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

                            <Text style={styles.label}>Senha</Text>
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

                            <Text style={styles.label}>Confirmar senha</Text>
                            <Controller
                                control={control}
                                name="confirmPassword"
                                render={({ field: { onChange, onBlur, value } }) => (

                                    <TextInput
                                        style={[styles.input, {
                                            borderWidth: errors.confirmPassword && 2,
                                            borderColor: errors.confirmPassword && '#ff375b',
                                            marginTop: errors.confirmPassword && 1
                                        }]}
                                        placeholder="Confirme sua senha"
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}//quando o text input é tocado
                                        secureTextEntry={true}
                                    />
                                )}
                            />
                            {/* //quando errors usename for true, vai renderizar essa altercao */}
                            {errors.confirmPassword && <Text style={styles.labelError}> {errors.confirmPassword?.message} </Text>}


                            <View style={styles.containerButtons}>
                                <TouchableOpacity onPress={handleSubmit(handleSignIn)} style={styles.buttonCadastro}>
                                    <Text style={styles.buttonText}>Cadastrar</Text>
                                </TouchableOpacity>

                            </View>
                        </Animatable.View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0A500'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',

    },
    containerForm: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingStart: '5%',
        paddingEnd: '5%',

    },

    containerInputs: {
        maxWidth:'100%',
        width: '100%',
        maxHeight:'100%', 
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        borderBottomLeftRadius:11,
        borderBottomRightRadius:11,
        paddingStart: '5%',
        paddingEnd: '5%',
        backgroundColor: '#F0A500'
    
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: '1%',
        paddingTop: '1%'
    },
    titleCadastro: {
        color:'#000',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 2,
        paddingStart: 10,
        paddingEnd: 10
    },

    buttonCadastro: {
        marginTop: '6%',
        marginBottom:30,
        start: '60%',
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
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000'
    }



})