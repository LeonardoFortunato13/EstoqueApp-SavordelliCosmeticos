import { StyleSheet, Text, View, Image, VirtualizedList, ImageBackground } from 'react-native';
import { Card } from '../../components/CardProducts'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { CardCategory } from '../../components/CardCategory';
import api from '../../services/api';
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigation } from '../../routes';

export function Home() {
    const [categoria, setCategoria] = useState([])
    
    const navigation = useNavigation()

    useEffect(() => {
        //requisição http tipo get para buscar os produtos
        //função assincrona, esperando(await) a requisição para retornar algo
        async function showCategory() {
            const response = await api.get("/Categoria/mostrar")
            setCategoria(response.data)
        }
        showCategory()
    }, [])
    return (
        <ScrollView>
            <View style={styles.container}>

                <ImageBackground
                    resizeMode='cover'
                    style={styles.header}
                    source={require("../../../assets/Background.png")}
                >
                    <View style={styles.containerMenu}>
                        <TouchableOpacity>
                            <MaterialIcons name='menu' size={30} color={'#fff'}  />
                        </TouchableOpacity>
                        <Text style={styles.titleLogo}>Savordelli Cosméticos</Text>

                    </View>

                </ImageBackground>


                <View style={styles.statusStock}>


                    <View style={styles.column}>
                        <Text style={styles.numberStatus}>158</Text>
                        <Text style={styles.value}>Produtos</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.numberStatus}>6</Text>
                        <Text style={styles.value}>Marcas</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.numberStatus}>38</Text>
                        <Text style={styles.value}>A vencer</Text>
                    </View>

                </View>
                <View style={styles.categoriaContainer}>

                    <View style={styles.headerCategoria}>
                        <Text style={styles.title}>Categorias</Text>
                    </View>

                    <VirtualizedList
                        horizontal={true}
                        style={styles.containerCard}
                        data={categoria}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => <CardCategory data={item} />}
                        getItemCount={() => categoria.length}
                        getItem={(categoria, index) => categoria[index]}

                    />

                </View>

                <View style={{ height: 2, width: '70%', backgroundColor: 'black', marginTop: 20, alignSelf: 'flex-start', marginStart: 20 }} />
                <Text style={styles.title}>Favoritos</Text>
                <Card />
                <View style={{ height: 2, width: '70%', backgroundColor: 'black', marginTop: 20, alignSelf: 'flex-start', marginStart: 20 }} />
                <Text style={styles.title}>Marca</Text>
                <Card />
                <View style={{ height: 2, width: '70%', backgroundColor: 'black', marginTop: 20, alignSelf: 'flex-start', marginStart: 20 }} />
                <Text style={styles.title}>Mais vendidos</Text>
                <Card />

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        maxHeight: '70%',
        marginBottom: 20
    },
    header: {
        height: 170,
        width: '100%',
        backgroundColor: 'black',
        justifyContent: 'flex-end',
        position: 'absolute'

    },
    containerMenu: {
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: ' rgba(0,0,0,0.5)',
        justifyContent: 'flex-start',
        marginBottom: 110,
        padding: 10,
        gap: 30
    },
    statusStock: {
        width: '85%',
        height: 75,
        backgroundColor: '#d4d4d4',
        borderRadius: 11,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginTop: 130,
        zIndex: 1,

    },
    column: {
        flex: 0.3,
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center'
    },
    numberStatus: {
        fontWeight: 'bold',
        fontSize: 20
    },
    img: {
        flex: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    categoriaContainer: {
        height: 230,
        width: '90%',
        maxWidth: "90%",
        backgroundColor: '#F0A500',
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',

    },
    headerCategoria: {
        width: "100%",
        height: 70,
        justifyContent: 'flex-start',
    },
    cardCategoria: {
        width: 100,
        height: 100,
        backgroundColor: '#b3b3b3',
        borderRadius: 5

    },
    containerCard: {
        width: "100%",
        maxWidth: "90%",
        marginTop: 20,
        flexDirection: 'row',
    },
    title: {
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        fontSize: 25,
        marginTop: 20,
        marginStart: 20,
        marginBottom: 10
    },
    titleLogo: {
        fontWeight: 'bold',
        fontSize: 25,
        color: "#fff"
    }


})