import { StyleSheet, Text, View, Pressable, ScrollView, Image, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'
import { useLayoutEffect } from 'react'
import { Entypo, AntDesign } from '@expo/vector-icons'
import { AtributeArea } from '../../components/AtributesArea/index';

export function Detail() {
   
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
                </Pressable>
            )
        })
    }, [navigation, route.params?.data])

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Pressable>

                <Image
                    source={{ uri: route.params?.data.imagem }}
                    style={styles.image}
                />
            </Pressable>
            <View style={styles.headerDetails}>
                <View>
                    <Text style={styles.title}>{route.params?.data.nome}</Text>

                </View>
            </View>
            <TextInput style={styles.textArea}>

            </TextInput>

            <View>
                <Text style={styles.title2}>Detalhes</Text>

                <View style={{ flex: 1, height: 2, width: '50%', backgroundColor: 'black', marginBottom: 14 }} />
            </View>

          {/* {route.params?.data.produto.map(() => (
                <AtributeArea />
            ))} */}






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

        alignSelf: 'center',
        height: 180,
        width: '50%',

    },
    textArea: {
        width: '100%',
        height: 180,
        backgroundColor: '#D9D9D9'
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
        marginTop: 16,
        paddingBottom: 4
    }



})