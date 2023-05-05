import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList , Text} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import {ProductsList} from '../../components/ProductsList/index'

import api from '../../services/api'
import { Card } from "../../components/CardProducts";
export function Estoque() {

    // 1°nome do estado, 2° funcao que troca o valor do estado
    const [inputValue, setInputValue] = useState("");
    const [produtos, setProdutos] = useState ([]);

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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.boxInput}>
                <TextInput
                    placeholder='digite o nome do produto'
                    style={styles.input}
                    value={inputValue}

                    /*pegando o texto digitado, recebendo na variavel text e passandoo pelo inputValue que guarda la no use state*/
                    onChangeText={(text) => setInputValue(text)}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <Ionicons name='search' size={28} color="#121212" />
                </TouchableOpacity>
            </View>
            
            
            <FlatList
            data={produtos}
            keyExtractor={ (item)=> String(item.id) }
            renderItem={ ({item})=> <ProductsList data={item}/>}
            />

            

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '4%'
    },
    input: {
        width: '90%',
        maxWidth: '90%',
        height: 54,
    },
    boxInput: {
        backgroundColor: '#D9D9D9',
        width: '100%',
        borderRadius: 8,
        marginTop: 16,
        marginBottom: 16,
        borderWidth: 1,
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,

    }

})