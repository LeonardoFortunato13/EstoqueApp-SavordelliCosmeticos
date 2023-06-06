import { StyleSheet, Text, View, Pressable, ScrollView, Image, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'
import { useLayoutEffect, useState } from 'react'
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons'
import { AtributeView } from '../../components/AtributeView/index';

//Tela de detalhes do produto
//é exibida após apertar o card do produto desejado na tela de estoque
export function Detail() {
    const [description, setDescription] = useState("")
    const route = useRoute();
    const navigation = useNavigation();



    //usando o useLayoutEffect para alterar o nome do header conforme o produto clicado
    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params?.data ? route.params?.data.nome : "Detalhes do produto",
            headerRight: () => (
                <Pressable onPress={() => console.log(route.params?.data)}>
                    <Entypo
                        name='heart'
                        size={28}
                        color={"#FF4141"}
                    />
                </Pressable>,
                <Pressable onPress={handleNavigate}>
                    <Ionicons
                        name="create"
                        color={"black"}
                        size={32}
                        style={{ alignSelf: 'flex-end' }}
                    />
                </Pressable>

            )
        })
    }, [navigation, route.params?.data])

    function handleNavigate({ }) {
        return (
            navigation.navigate("b", { data: route.params?.data })

        )
    }
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Pressable>

                <Image
                    source={{ uri: route.params?.data.imagem_link }}
                    style={styles.image}
                />
            </Pressable>
            <View style={styles.headerDetails}>
                <View>
                    <Text style={styles.title}>{route.params?.data.nome}</Text>

                </View>
            </View>
            <View style={styles.textArea}>
            <Text style={styles.descriptionTitle}>Descrição</Text>
                <Text style={styles.description}>{route.params?.data.descricao}</Text>
            </View>

            <View>
                <Text style={styles.title2}>Detalhes</Text>

                <View style={{ flex: 1, height: 2, width: '50%', backgroundColor: 'black', marginBottom: 14 }} />
            </View>


            <AtributeView data={route.params?.data} />



        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',

        paddingTop: 14,
        paddingEnd: 14,
        paddingStart: 14

    },
    image: {
        marginTop: 10,
        alignSelf: 'center',
        height: 180,
        width: '50%',
        backgroundColor: '#D9D9D9',
    },
    textArea: {
        width: '95%',
        height: 180,
        backgroundColor: '#1A1C20',
        margin: 10,
        paddingTop: 20,
        paddingBottom: 100,
        paddingStart: 10,
        borderRadius: 10
    },
    title: {
        fontSize: 16,
        marginTop: 16,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 14,
        alignSelf: 'center'
    },
    title2: {
        fontSize: 16,
        fontWeight: 'bold',
        width: 100,
        textAlign: 'center',
        marginTop: 5,
        paddingBottom: 4
    },
    description:{
        padding: 10,
        fontWeight: '400',
        color: 'white'
    },
    descriptionTitle:{
        fontSize: 16,
        fontWeight: 'bold',
        width: 100,
        textAlign: 'center',
        marginTop: 5,
        paddingBottom: 4,
        color: 'white'
   
    }



})