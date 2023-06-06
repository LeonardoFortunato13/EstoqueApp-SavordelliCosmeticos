import { StyleSheet, Text, View, Image, VirtualizedList, ImageBackground } from 'react-native';
import { Card } from '../../components/CardProducts'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { CardCategory } from '../../components/CardCategory';
import api from '../../services/api';
import { MaterialIcons } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { CardMarca } from '../../components/CardMarca';


export function Home() {
    const [categoria, setCategoria] = useState([])
    const [marca, setMarca] = useState([])
    const navigation = useNavigation()


    useFocusEffect(
        React.useCallback(() => {
            //requisição http tipo get para buscar os produtos
            //função assincrona, esperando(await) a requisição para retornar algo
            async function showCategory() {
                const response = await api.get("/Categoria/mostrar")
                setCategoria(response.data)
                const responsea = await api.get("/Marca/mostrar")
                setMarca(responsea.data)
              
            }
            showCategory()
        //
        
        
        }, [])
    );


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
                            <MaterialIcons name='menu' size={30} color={'#fff'} />
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
                        <Text style={styles.numberStatus}>5</Text>
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
                        keyExtractor={(item) => String(item.categoria)}
                        renderItem={({ item }) => <CardCategory data={item} />}
                        getItemCount={() => categoria.length}
                        getItem={(categoria, index) => categoria[index]}

                    />

                </View>


                
                <View style={{ height: 2, width: '70%', backgroundColor: 'black', marginTop: 20, alignSelf: 'flex-start', marginStart: 20 }} />
            
                <View style={styles.marcaContainer}>

                    <View style={styles.headerCategoria}>
                        <Text style={styles.title}>Marcas</Text>
                    </View>

                    <VirtualizedList
                        horizontal={true}
                        style={styles.containerCard}
                        data={marca}
                        keyExtractor={(item) => String(item.marca)}
                        renderItem={({ item }) => <CardMarca data={item} />}
                        getItemCount={() => marca.length}
                        getItem={(marca, index) => marca[index]}

                    />

                </View>
                <View style={{ height: 2, width: '70%', backgroundColor: 'black', marginTop: 20, alignSelf: 'flex-start', marginStart: 20 }} />
                <Text style={styles.title}>Favoritos</Text>
                <Card
                    img={styles.ty}
                />
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
        backgroundColor: '#1A1C20',
        borderRadius: 11,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginTop: 130,
        zIndex: 1,
        elevation: 10,

    },
    column: {
        flex: 0.3,
        alignItems: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center'
    },
    numberStatus: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#FFFBFB'
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
        elevation: 10
    },
    marcaContainer: {
        height: 230,
        width: '90%',
        maxWidth: "90%",
        backgroundColor: '#b3b4b4',
        borderRadius: 8,
        marginTop: 20,
        alignItems: 'center',
        elevation: 10
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
        borderRadius: 5,
        elevation: 5
    },
    containerCard: {
        width: "100%",
        maxWidth: "90%",
        marginTop: 20,
        flexDirection: 'row',
        elevation: 5
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
    },
    value: {
        color: '#FFFBFB'
    }


})