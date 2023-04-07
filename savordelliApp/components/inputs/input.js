import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

export function Inputt() {
    
    // 1°nome do estado, 2° funcao que troca o valor do estado
    const [inputValue, setInputValue] = useState("");

    //metodo do botao de filtrar pesquisa
    function handleSearch(){
        console.log("Botao foi clicado fi");
        console.log(inputValue)
    }
    
    
    return (
        <View style={styles.boxInput}>
            <TextInput
                placeholder='digite o nome do produto'
                style={styles.input}
                value={inputValue}
                
                /*pegando o texto digitado, recebendo na variavel text e passandoo pelo inputValue que guarda la no use state*/ 
                onChangeText={ (text) => setInputValue(text) }
            />
            <TouchableOpacity onPress={handleSearch}>
                <Ionicons name='search' size={28} color="#121212" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

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
        borderColor: '#f2f2f2',
        paddingLeft: 8,
        paddingRight: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})
