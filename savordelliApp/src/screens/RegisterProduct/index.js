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
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from "@react-navigation/native";

//objeto do esquema de validaçao da biblioteca yup


export function RegisterProduct({ }) {

  const route = useRoute();
  const navigation = useNavigation();
  const schema = yup.object({
    cod_barra: yup.string().max(20, "código de barras não preenchido").required("Insira o código de barra do produto"),
    nome: yup.string().max(45, "nome não preenchido").required("Insira o nome do produto"),
    //categoria: yup.string().max(6, "informe a categoria do produto").required("Insira o nome da categoria"),
    tamanho: yup.string().max(15, "informe o tamanho do produto em ml").required("Insira o tamanho do produto"),
    descricao: yup.string().max(400, "descrição não preenchida").required("Insira a descrição do produto"),
    imagem_link: yup.string().max(300, "informe a url da imagem do produto").required("Insira a url do do produto"),
    imagem_blob: yup.string(),
    data_vencimento: yup.string("Altere a data de validade (dd/mm/yyyy)").max(11, 'Número muito grande'),
    qtd_estoque: yup.number().max(5000, "informe a quantidade do produto").required("Insira a quantidade do produto"),
    qtd_min: yup.number().max(100, "quandidade minima muito grande").required("Insira a quantidade do produto"),
    preco_custo: yup.number().lessThan(3000, "informe o preço de venda do produto").required("Insira o preço do produto"),
    preco_venda: yup.number().lessThan(3000, "informe o preço de venda do produto").required("Insira o preço do produto"),
    marca_id: yup.string().max(15, "informe a marca do produto").required("Insira o nome da marca do produto"),

  })

  //constantes que mudam de estado, por causa da lib react hook form
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const idProduct = route.params?.data.id
  //funçao que valida os valores dos inputs e entra na tela estoque
  async function handleRegisterProduct(data) {

    try {
      data.data_vencimento = data.data_vencimento.split('/').reverse().join('-');
      const response = await fetch('http://18.231.16.235:3030/Produto/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data, { "imagem_blob": ""}),
        });
      // const responseCategoria = await fetch('http://192.168.43.184:3030/Categoria/create',
      // {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // });
      console.log(data)
      if (response.ok) {
        ToastAndroid.show('Produto cadastrado com sucesso 🎉!', ToastAndroid.SHORT);

      } else {
        console.error('Erro ao cadastrar o produto:', response);


      }
    } catch (error) {
      console.error('Erro ao realizar a solicitação:', error);
    }
  }

  //guarda o estado inicial da imagem e o valor alterado
  const [imageSource, setImageSource] = useState();

  //se o botao for clicado um alert vai aparecer pergunta vai usar a camera ou a galeria ,
  // em seguida ele pegunta se pode acessar, se sim, executa o metodo escolhido
  const chooseImage = () => {
    Alert.alert(
      'Escolher imagem',
      'Escolha uma opção para selecionar a imagem',
      [
        {
          text: 'Galeria',
          onPress: () => {
            requestLibrary(imageSource);
          },
        },
        {
          text: 'Câmera',
          onPress: () => {
            requestCamera(imageSource)
          },
        },
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancelar'),
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  }
  const requestCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync(ImagePicker.PermissionStatus.CAMERA);
    if (status === 'granted') {
      handleCameraImagePicker(imageSource);
    } else {
      ToastAndroid.show('Permissão negada', ToastAndroid.SHORT);
    }
  };

  const requestLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync(ImagePicker.PermissionStatus.MEDIA_LIBRARY);
    if (status === 'granted') {
      handleLibraryImagePicker(imageSource);
    } else {
      ToastAndroid.show('Permissão negada', ToastAndroid.SHORT);
    }
  };

  const handleCameraImagePicker = async () => {
    // launchCameraAsync acessa a camera
    // tratando a foto tirada usando camera 
    // a base 64 que possibilita a uri da foto ser gerada
    const { assets, canceled } = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: false
    });


    if (canceled) {
      ToastAndroid.show('Operação cancelada ', ToastAndroid.SHORT);
    } else {

      const fileName = assets[0].uri.substring(
        assets[0].uri.lastIndexOf('/') + 1,
        assets[0].uri.length);

      const extend = fileName.split('.')[1];
      const formData = new FormData();
      formData.append('file', {
        name: fileName,
        uri: assets[0].uri,
        type: 'image/' + extend
      }
      );

      uploadImageCloudinary(formData)

    }
  };

  //mandando a imagem escolhida para o server da cloudnary
  const uploadImageCloudinary = async (formData) => {


    formData
    formData.append('upload_preset', 'krcl6yiz');
    formData.append("cloud_name", "dibrkxgg2")


    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dibrkxgg2/upload", {
        method: 'POST',
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData
      });

      const jsonResponse = await response.json()
      console.log(jsonResponse)

      const imgUploadedCloudinary = jsonResponse.secure_url
      setImageSource(imgUploadedCloudinary)

    } catch (error) {
      console.log(error)
    }
  }



  const handleLibraryImagePicker = async () => {
    // launchImageLibraryAsync acessa a galeria
    // tratando a imagem escolhida da galeria de fotos
    // a base 64 que possibilita a uri imagem ser gerada
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: false
    });

    //se o result não foi cancelado o estado da imagem muda para o valor da uri armazenada pelo expo
    //a prop assets percorre o array de caracteres gerado pela base64 que tranforma em uma uri
    if (canceled) {
      ToastAndroid.show('Operação cancelada ', ToastAndroid.SHORT);
    } else {
      const fileName = assets[0].uri.substring(
        assets[0].uri.lastIndexOf('/') + 1,
        assets[0].uri.length);

      const extend = fileName.split('.')[1];
      const formData = new FormData();
      formData.append('file', {
        name: fileName,
        uri: assets[0].uri,
        type: 'image/' + extend
      }
      );

      uploadImageCloudinary(formData)
    }
  };

  //tratando variaveis do tipo number e date que vao no placeholder


  return (
    <ScrollView style={styles.container}>

      <TouchableOpacity style={styles.imgContainer} onPress={chooseImage}>
        <Image
          style={styles.img}
          source={{ uri: imageSource }}
        />
        <Ionicons name="images-outline" size={32} />
      </TouchableOpacity>

      {/* form de cadastro do produto */}
      <View style={styles.containerForm} >

        {/* component do react-native que ajusta o tamanho do teclado quando abrir um input */}
        <KeyboardAvoidingView >
          <TouchableWithoutFeedback onPressIn={Keyboard.dismiss}>


            <View style={styles.containerInputs}>

              <Text style={styles.title}>Imagem</Text>
              <Controller
                control={control}
                name="imagem_link"
                render={({ field: { onChange, onBlur, value } }) => (

                  <TextInput
                    style={[styles.input, {
                      borderWidth: errors.imagem_link && 2,
                      borderColor: errors.imagem_link && '#ff375b'
                    }]}
                    placeholder={"Digite a URL da imagem"}
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}//quando o text input é tocado
                  />
                )}
              />

              {errors.imagem_link && <Text style={styles.labelError}> {errors.imagem_link?.message} </Text>}

              <Text style={styles.title}>Codigo de barra</Text>
              <Controller
                control={control}
                name="cod_barra"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.boxInputIcon}>
                    <TextInput
                      style={[styles.inputIcon, {
                        borderWidth: errors.cod_barra && 2,
                        borderColor: errors.cod_barra && '#ff375b'
                      }]}
                      placeholder={"Escaneie o codigo de barra do produto"}
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}//quando o text input é tocado

                    />
                    <TouchableOpacity >
                      <Ionicons name='barcode-sharp' size={28} color="#121212" />
                    </TouchableOpacity>
                  </View>
                )}
              />
              {/* //quando errors usename for true, vai renderizar essa altercao */}
              {errors.cod_barra && <Text style={styles.labelError}> {errors.cod_barra?.message} </Text>}

              <Text style={styles.title}>Nome</Text>
              <Controller
                control={control}
                name="nome"
                render={({ field: { onChange, onBlur, value } }) => (

                  <TextInput
                    style={[styles.input, {
                      borderWidth: errors.nome && 2,
                      borderColor: errors.nome && '#ff375b'
                    }]}
                    placeholder={"Escolha o novo nome do produto"}
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}//quando o text input é tocado

                  />
                )}
              />
              {/* //quando errors usename for true, vai renderizar essa altercao */}
              {errors.nome && <Text style={styles.labelError}> {errors.nome?.message} </Text>}

              <Text style={styles.title}>imagem_blob</Text>
              <Controller
                control={control}
                name="imagem_blob"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.boxInputIcon}>
                    <TextInput
                      style={[styles.inputIcon, {
                        borderWidth: errors.imagem_blob && 2,
                        borderColor: errors.imagem_blob && '#ff375b'
                      }]}
                      placeholder="Digite seu e-mail"
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}//quando o text input é tocado

                    />
                    <TouchableOpacity >
                      <Ionicons name='chevron-down' size={28} color="#121212" />
                    </TouchableOpacity>
                  </View>
                )}
              />

              {errors.imagem_blob && <Text style={styles.labelError}> {errors.imagem_blob?.message} </Text>}

              <Text style={styles.title}>Marca</Text>
              <Controller
                control={control}
                name="marca_id"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.boxInputIcon}>
                    <TextInput
                      style={[styles.inputIcon, {
                        borderWidth: errors.marca_id && 2,
                        borderColor: errors.marca_id && '#ff375b'
                      }]}
                      placeholder={"Escolha a marca do produto"}
                      onChangeText={onChange}
                      value={value}
                      onBlur={onBlur}//quando o text input é tocado

                    />
                    <TouchableOpacity >
                      <Ionicons name='chevron-down' size={28} color="#121212" />
                    </TouchableOpacity>
                  </View>
                )}

              />
              {/*quando errors usename for true, vai renderizar essa altercao */}
              {errors.marca_id && <Text style={styles.labelError}> {errors.marca_id?.message} </Text>}

              <Text style={styles.title}>Quantidade</Text>
              <Controller
                control={control}
                name="qtd_estoque"
                render={({ field: { onChange, onBlur, value } }) => (

                  <TextInput
                    style={[styles.input, {
                      borderWidth: errors.qtd_estoque && 2,
                      borderColor: errors.qtd_estoque && '#ff375b'
                    }]}
                    placeholder={"Altere a quantidade de produtos"}
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}//quando o text input é tocado

                  />
                )}
              />
              {/* //quando errors usename for true, vai renderizar essa altercao */}
              {errors.qtd_estoque && <Text style={styles.labelError}> {errors.qtd_estoque?.message} </Text>}

              <Text style={styles.title}>Quantidade Mínima</Text>
              <Controller
                control={control}
                name="qtd_min"
                render={({ field: { onChange, onBlur, value } }) => (

                  <TextInput
                    style={[styles.input, {
                      borderWidth: errors.qtd_min && 2,
                      borderColor: errors.qtd_min && '#ff375b'
                    }]}
                    placeholder={"Altere a quantidade minima do produto"}
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}//quando o text input é tocado

                  />
                )}
              />
              {/* //quando errors usename for true, vai renderizar essa altercao */}
              {errors.qtd_min && <Text style={styles.labelError}> {errors.qtd_min?.message} </Text>}

              <Text style={styles.title}>Preço custo</Text>
              <Controller
                control={control}
                name="preco_custo"
                render={({ field: { onChange, onBlur, value } }) => (

                  <TextInput
                    style={[styles.input, {
                      borderWidth: errors.preco_custo && 2,
                      borderColor: errors.preco_custo && '#ff375b'
                    }]}
                    placeholder={"Altere o preço do produto"}
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}//quando o text input é tocado

                  />
                )}
              />
              {/* //quando errors usename for true, vai renderizar essa altercao */}
              {errors.preco_custo && <Text style={styles.labelError}> {errors.preco_custo?.message} </Text>}

              <Text style={styles.title}>Data de validade</Text>
              <Controller
                control={control}
                name="data_vencimento"
                render={({ field: { onChange, onBlur, value } }) => (

                  <TextInput
                    style={[styles.input, {
                      borderWidth: errors.data_vencimento && 2,
                      borderColor: errors.data_vencimento && '#ff375b'
                    }]}
                    placeholder={"Altere a data de validade"}
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}//quando o text input é tocado

                  />
                )}
              />
              {/* //quando errors usename for true, vai renderizar essa altercao */}
              {errors.data_vencimento && <Text style={styles.labelError}> {errors.data_vencimento?.message} </Text>}



              <Text style={styles.title}>Preço venda</Text>
              <Controller
                control={control}
                name="preco_venda"
                render={({ field: { onChange, onBlur, value } }) => (

                  <TextInput
                    style={[styles.input, {
                      borderWidth: errors.preco_venda && 2,
                      borderColor: errors.preco_venda && '#ff375b'
                    }]}
                    placeholder={"Altere o preço de venda do produto"}
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}//quando o text input é tocado

                  />
                )}
              />
              {/* //quando errors usename for true, vai renderizar essa altercao */}
              {errors.preco_venda && <Text style={styles.labelError}> {errors.preco_venda?.message} </Text>}


              <Text style={styles.title}>Tamanho</Text>
              <Controller
                control={control}
                name="tamanho"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, {
                      borderWidth: errors.tamanho && 2,
                      borderColor: errors.tamanho && '#ff375b'
                    }]}
                    placeholder={"Altere o tamanho do produto"}
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}//quando o text input é tocado

                  />
                )}
              />
              {errors.tamanho && <Text style={styles.labelError}> {errors.tamanho?.tamanho} </Text>}

              <Text style={styles.title}>Descrição</Text>
              <Controller
                control={control}
                name="descricao"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, {
                      borderWidth: errors.descricao && 2,
                      borderColor: errors.descricao && '#ff375b'
                    }]}
                    placeholder={"Altere a descrição do produto"}
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}//quando o text input é tocado

                  />
                )}
              />
              {/* //quando errors usename for true, vai renderizar essa altercao */}
              {errors.descricao && <Text style={styles.labelError}> {errors.descricao?.message} </Text>}



              <View style={styles.containerButtons}>

                <TouchableOpacity onPress={handleSubmit(handleRegisterProduct)} style={styles.buttonCadastro}>
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
    width: '100%',


  },
  img: {
    width: 180,
    height: 180,
    backgroundColor: '#F0A500',
    alignSelf: 'center',
    position: 'absolute'
  },
  imgContainer: {
    width: 170,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
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