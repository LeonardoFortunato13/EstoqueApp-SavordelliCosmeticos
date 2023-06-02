import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Keyboard, Button, Alert, ToastAndroid } from "react-native";
import * as Animatable from 'react-native-animatable'
import { TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Controller, useForm } from 'react-hook-form'

//https://github.com/jquense/yup/blob/master/README.md --> DOCUMENTAÇÂO DA BIBLIOTECA
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { SafeAreaView } from "react-native-safe-area-context";

//objeto do esquema de validaçao da biblioteca yup 
//aqui passo o nome do atributo e seus tipos
//passo a quantidade maxima e mínima de caracteres que podem ser inseridos
//se ele é obrigatório ou não
const schema = yup.object({
    username: yup.string().required("Informe seu nome"),
    email: yup.string().email("Email invalido").max(64).required("Insira seu e-mail"),
    password: yup.string().min(6, "A senha deve ter no minimo seis digitos").required("Defina uma senha"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem ser iguais').required("Insira as senhas corretamente"),

})

export function SignUp({ navigation }) {

    //função que recebe o objeto data, que contem todos atributos que o usuário inseriu nos campos,
    // realiza a requisição http do tipo POST mandando data para o endpoint User/create e cria o usuario
    //e por fim trata o callback da api e navega para tela de login
    async function handleCreateUser(data) {

        try {
            const response = await fetch('http://192.168.15.45:3030/User/create',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
            
            if (response.ok) {             
                
                ToastAndroid.show('Usuario cadastrado com sucesso!', ToastAndroid.SHORT);
                return navigation.navigate("SignIn")
            
            } else {
                console.error('Erro ao cadastrar o usuario:', response.error);
            }
        } catch (error) {
            console.error('Erro ao realizar a solicitação:', error);
        }

    }

    //parametros da lib reactHookForm para enviar um formulário
    //control 
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    return (
        <SafeAreaView style={styles.container}>

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

                            {/* //quando errors username for true, vai renderizar essa altercao */}
                            <Text style={styles.label}>Nome</Text>
                            <Controller
                                control={control}
                                name="username"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        style={[styles.input, {
                                            borderWidth: errors.username && 2,
                                            borderColor: errors.username && '#ff375b',
                                        }]}
                                        placeholder="Digite seu username de usuário"
                                        onChangeText={onChange}
                                        value={value}
                                        onBlur={onBlur}//quando o text input é tocado

                                    />
                                )}
                            />
                        
                            {errors.username && <Text style={styles.labelError}> {errors.username?.message} </Text>}

                            <Text style={styles.label}>Email</Text>
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
                       
                            {errors.email && <Text style={styles.labelError}> {errors.email?.message} </Text>}

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
                           
                            {errors.confirmPassword && <Text style={styles.labelError}> {errors.confirmPassword?.message} </Text>}


                            <View style={styles.containerButtons}>
                                <TouchableOpacity onPress={handleSubmit(handleCreateUser)} style={styles.buttonCadastro}>
                                    <Text style={styles.buttonText}>Cadastrar</Text>
                                </TouchableOpacity>

                            </View>
                        </Animatable.View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
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
        maxWidth: '100%',
        width: '100%',
        maxHeight: '100%',
        borderTopLeftRadius: 11,
        borderTopRightRadius: 11,
        borderBottomLeftRadius: 11,
        borderBottomRightRadius: 11,
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
        color: '#000',
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
        marginBottom: 30,
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

    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000'
    }



})