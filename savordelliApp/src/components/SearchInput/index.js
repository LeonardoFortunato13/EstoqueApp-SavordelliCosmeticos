import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';

export function Inputt() {
    const [inputValue, setInputValue] = useState("");

    //metodo do botao de filtrar pesquisa
    function handleSearch() {
        console.log("Botao foi clicado fi");
        console.log(inputValue)
    }


    return (
        <SafeAreaView>
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
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({

    input: {
        width: '90%',
        maxWidth: '90%',
        height: 54,
       
    },
    boxInput: {
        backgroundColor: '#DFDFDF',
        width: '100%',
        borderRadius: 8,
        marginTop: 16,
        marginBottom: 16,
        paddingLeft: 14,
        paddingRight: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
       

    }
})
