import React, { useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import ThemeContext from '../context/ThemeContext';
import {NewsData} from './news'

interface Props {
    navigation: any,
    route: any
}

const Details: React.FunctionComponent<Props> = (props) => {

    const { theme, setTheme } = useContext(ThemeContext);
    console.log("news ", props.route.params.news);
    const [news, setNews] = useState<NewsData>(props.route.params.news)
        
        return (
            <View style ={styles.container}>
                    <View style={styles.imageView}>
                        <Image 
                         source={{uri: news.urlToImage != null ? news.urlToImage : undefined}}
                         style={{ height: '100%', width: '100%',resizeMode : 'contain' }}>

                        </Image>
                    </View>
                    <View style={styles.contentView}>

                        <Text style={theme === 'dark' ? styles.titleLight : styles.titleDark}>
                            {news.title}
                        </Text>
                        <Text style={theme === 'dark' ? styles.textLight : styles.textDark}>
                            {news.author}
                        </Text>
                        <Text style={theme === 'dark' ? styles.textLight : styles.textDark}>
                            {new Date(news.publishedAt).toLocaleString()}
                        </Text>

                        <Text style={theme === 'dark' ? styles.textLight : styles.textDark}>
                            {news.content}
                        </Text>
                    </View>
            </View>
        )
  
}
export default Details

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : 'grey',
    },
    header: {
        height: 50,
        backgroundColor: 'white'
    },
    imageView: {
        height: 350,
        width: '100%',
        flex : 1,
        marginBottom: '5%'
    },
    contentView: {
        paddingHorizontal: '5%'
    },
    titleLight: {
        fontWeight: 'bold',
        fontSize: 14,
        marginVertical: '2%',
        color : 'white'
    },
    textLight: {
        fontSize: 12,
        marginVertical: '2%',
        color : 'white' 
    },
    titleDark: {
        fontWeight: 'bold',
        fontSize: 14,
        marginVertical: '2%',
        color : 'black'
    },
    textDark: {
        fontSize: 12,
        marginVertical: '2%',
        color : 'black'
    }
})
