
import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    FlatList,
    RefreshControl,
    Image,
    TouchableOpacity,
} from 'react-native';
import i18n from '../config/locales';
import ThemeContext from '../context/ThemeContext';

interface Props {
    navigation: any
}

export interface NewsData {
    source: {
        id: string | null,
        name: string
    },
    author: string | null,
    title: string,
    description: string | null,
    url: string,
    urlToImage: string | null,
    publishedAt: string,
    content: string | null
}

const News: React.FunctionComponent<Props> = (props) => {

    const { theme, setTheme } = useContext(ThemeContext);
    const [newsList, setNewsList] = useState<NewsData[]>([])
    const [filteredNews, setFilteredNews] = useState<NewsData[]>([])
    const [refreshing, setRefreshing] = useState<boolean>(false)

    
    useEffect(() => {
        fetchNews()
    }, [])

    const fetchNews = () => {
        const NEWS_API = "http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=5119c147502f4bcb8565ee685a97b085"
        fetch(NEWS_API, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            response.json()
                .then((responseJson) => {
                    const articles = responseJson.articles
                    setNewsList(articles)
                    setFilteredNews(articles)
                    setRefreshing(false)
                })
        })
    }

    const filter = (searchText: string) => {
        setFilteredNews(newsList.filter((news: NewsData) => {
            return news.title.toUpperCase().includes(searchText.toUpperCase())
        })
        )
    }

    const onRefresh = async () => {
        setRefreshing(true)
        fetchNews()
    }

    return (
        <View style={styles.container}>
            <View style={theme === 'dark' ? styles.headerDark : styles.headerLight}>
                <TextInput
                    style={styles.searchBar}
                    placeholder={i18n.t('search')}
                    placeholderTextColor={theme === 'dark' ? 'white' : 'black'}
                    autoCapitalize='none'
                    onChangeText={(value: string) => {
                        filter(value)
                    }}
                />
            </View>

            <FlatList
                style={styles.list}
                keyExtractor={(item, index) => JSON.stringify(index)}
                data={filteredNews}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { onRefresh() }} />}
                renderItem={({ item, index: number }) => (
                    <TouchableOpacity
                        style={{
                            flex : 1,
                            width : '100%',
                            borderWidth : 3,
                            borderColor : theme === 'dark' ? 'black' : 'white',
                            marginBottom : 3,
                            borderRadius : 10
                        }}
                        activeOpacity={1}
                        onPress={() => {
                            props.navigation.navigate("Details", { news: item })
                        }}>
                        <View style={styles.cardNews}>
                            <View style={styles.imageRow}>
                                <Image source={{ uri: item.urlToImage != null ? item.urlToImage : undefined }} style={{ width: 100, height: 100 }}>

                                </Image>
                            </View>
                            <View style={styles.contentRow}>
                                <Text style={theme === 'light' ? styles.sourceLight : styles.sourceDark}>
                                    {item.source.name}
                                </Text>

                                <Text style={theme === 'light' ? styles.titleLight : styles.titleDark}>
                                    {item.title}
                                </Text>

                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            >
            </FlatList>
        </View>
    )
}
export default News

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : 'grey',
    },
    headerLight: {
        height: 50,
        backgroundColor: 'white',
        width : '80%',
        borderRadius : 15,
        alignContent : 'center',
        alignItems : 'center',
        justifyContent : 'center',
        alignSelf : 'center',
        textAlign : 'center',
        marginTop: '2%',
    },
    headerDark: {
        height: 50,
        backgroundColor: 'black',
        borderRadius : 15,
        width : '80%',
        alignContent : 'center',
        alignItems : 'center',
        justifyContent : 'center',
        alignSelf : 'center',
        textAlign : 'center',
        marginTop: '2%',
    },
    searchBar: {
        marginHorizontal: '5%',
        width: '90%',
        textAlign : 'center',
    },
    list: {
        paddingHorizontal: '2%',
        marginTop: '4%',
        borderColor : 'red',
        width: '100%',
    },
    cardNews: {
        flex: 1,
        height: 100,
        flexDirection: 'row',
        margin: '3%',
    },
    imageRow: {
        flex: 3
    },
    contentRow: {
        flex: 7,
        padding: '2%'
    },
    sourceLight: {
        alignSelf: 'flex-end',
        fontSize: 16,
        marginBottom: '3%',
        color: 'white'
    },
    sourceDark: {
        alignSelf: 'flex-end',
        fontSize: 16,
        marginBottom: '3%',
        color : 'black'
    },
    titleLight: {
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'justify',
        fontSize: 12,
        color: 'white'
    },
    titleDark: {
        fontWeight: 'bold',
        justifyContent: 'center',
        textAlign: 'justify',
        fontSize: 12,
        color: 'black'
    },
})