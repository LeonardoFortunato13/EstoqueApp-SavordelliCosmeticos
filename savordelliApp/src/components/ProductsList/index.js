import { Text, StyleSheet, View, TouchableOpacity, Image, Modal, ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { ButtonContext } from '../../components/ButtonContext/index';
import api from '../../services/api';
export function ProductsList({ data }) {
    const navigation = useNavigation();
    data.data_vencimento = data.data_vencimento.split("T")[0];
    data.data_vencimento = data.data_vencimento.split("-").reverse().join("/");
    let nome = data.nome;
    
    //guarta o contexto do estado normal
    const { deleteButtonVisible } = useContext(ButtonContext);
    const handleDeleteItem = async () => {
        try {

            const response = await fetch('http://192.168.43.184:3030/Produto/delete',
              {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });
            console.log(data)
            if (response.ok) {
              ToastAndroid.show('Delete com sucesso 🎉!', ToastAndroid.SHORT);
             
            } else {
              console.error('Erro ao cadastrar o produto:', response);
      
      
            }
          } catch (error) {
            console.error('Erro ao realizar a solicitação:', error);
          }
        

        // // Atualizar os dados após a exclusão
        // const updatedData = data.filter((item) => item.id !== itemId);
        // setData(updatedData);
    };


    function handleNavigate({ }) {
        return (
            navigation.navigate("a", { data: data })

        )
    }
    return (
        <TouchableOpacity style={styles.container} onPress={handleNavigate}>

            <View style={styles.card}>

                <Image style={styles.img}
                    source={{ uri: data.imagem_link }} />

                <View style={styles.containerText} >
                    <Text style={styles.styleNome}>{data.nome}</Text>
                    <Text style={styles.styleText}>código: {data.cod_barra}</Text>
                    <Text style={styles.styleText}>quantidade: {data.qtd_estoque}</Text>


                </View>
                <View style={styles.containerText2}>
                    <Text style={styles.styleText}>preço venda: R$:{data.preco_venda}</Text>
                    <Text style={styles.styleText} >validade: {data.data_vencimento}</Text>


                </View>

                {deleteButtonVisible && (
                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleDeleteItem(nome)}>
                        <Ionicons name='trash' size={20} color="#2F2E2E" />

                    </TouchableOpacity>
                )}

            </View>

        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 110,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 8,
       
    },
    containerText: {
        width: '38%',
        height: 90,
        flexDirection: 'column',
        marginStart: 2,
        paddingStart: 10,
        paddingTop: 5,
        paddingEnd: 5,

    },
    containerText2: {
        width: '23%',
        height: 90,
        flexDirection: 'column-reverse',
        marginStart: 1,
        maxHeight: 90,
        paddingStart: 5,
        paddingBottom: 5,
    },
    img: {
        width: '25%',
        height: '80%',
        backgroundColor: 'white',
        marginStart: 12,
        
        
    },
    styleNome: {
        fontWeight: 'bold',

    },
    styleText: {
        fontSize: 12,
        paddingTop: 4
    },
    deleteButton: {
        width: 30,
        height: 30,
        backgroundColor: '#F36464',
        borderRadius: 5,
        alignSelf: 'flex-start',
        marginTop: 10,
        padding: 5,

    },
  
})