import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text, Image, Pressable, VirtualizedList } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductsList } from '../../components/ProductsList/index'

import React, { useContext } from 'react';
import { ButtonContext } from '../../components/ButtonContext/index';

import api from '../../services/api'
export function Estoque() {

    // 1°nome do estado, 2° funcao que troca o valor do estado
    const [inputValue, setInputValue] = useState("");
    const [produtos, setProdutos] = useState([]);


    // altera o estado do botao de delete e permite apertar pra deletar
    const { toggleDeleteButton } = useContext(ButtonContext);


    const handleDeleteButtonClick = () => {
        toggleDeleteButton();
    };


    //quando o app é carregado na tela ele vai exucutar o estiver dentro da função anonima
    useEffect(() => {

        //requisição http tipo get para buscar os produtos
        //função assincrona, esperando(await) a requisição para retornar algo
        async function fetchAPI() {
            const response = await api.get("/Produto/mostrar")
            setProdutos(response.data)
        }

        fetchAPI()
    }, [])

    //metodo do botao de filtrar pesquisa
    function handleSearch() {

        console.log(inputValue)
    }

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    if (produtos == null) {
        console.log("Cadastre um produto antes")
    } else {

    }

    return (
        <SafeAreaView style={styles.container}>


            <View style={styles.header}>

                <Text style={styles.textHeader}>Estoque</Text>


                <TouchableOpacity onPress={handleDeleteButtonClick}>
                    <Image source={require('../../assets/DeleteButton.png')} />
                </TouchableOpacity>


                <TouchableOpacity>
                    <Image source={require('../../assets/FilterButton.png')} />
                </TouchableOpacity>

            </View>
            <View style={styles.boxInput}>
                <TextInput
                    placeholder='digite o nome do produto'
                    style={styles.input}
                    value={inputValue}

                    /*pegando o texto digitado, recebendo na variavel text e passandoo pelo inputValue que guarda la no use state*/
                    onChangeText={(text) => setInputValue(text)}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Ionicons name='search' size={28} color="#F0A500" />
                </TouchableOpacity>
            </View>
           
                <VirtualizedList
                    data={produtos}
                    keyExtractor={(item) => String(item.nome)}
                    renderItem={({ item }) => <ProductsList data={item} />}
                    getItemCount={() => produtos.length}
                    getItem={(produtos, index) => produtos[index]}

                />
            
        </SafeAreaView >
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2%'
    },
    header: {
        borderRadius: 8,
        width: '100%',
        height: 80,
        paddingStart: 10,
        paddingEnd: 10,
        paddingTop: 18,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1A1C20',
        marginBottom: 2,
        zIndex: 1

    },
    textHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingEnd: '45%',
        alignSelf: 'baseline',
        color: '#fff'
    },
    input: {
        width: '100%',
        maxWidth: '90%',
        height: 45,

    },
    boxInput: {
        borderWidth: 2,
        borderColor: '#F0A500',
        backgroundColor: '#fff',
        width: '95%',
        borderRadius: 8,
        marginTop: 14,
        marginBottom: 16,
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },


})