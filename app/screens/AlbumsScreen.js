import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, FlatList, ScrollView } from 'react-native';
import HeaderItem from '../shared/HeaderItem';
import { withNavigation } from 'react-navigation';
import { Divider } from 'react-native-elements';
import Constants from '../constants/Constants';
import { getData } from '../services/Service';
import Config from '../constants/Configuration';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F2F2F2',
    },
    barLogo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    barTitle: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10

    },
});

class AlbumsScreen extends React.Component {
    static navigationOptions = {
        headerTitleStyle: { flex: 1, justifyContent: 'center' },
        headerTitle: <HeaderItem></HeaderItem>,
        headerBackImage: <MaterialIcons name='keyboard-arrow-left' color='black' size={35} />,
        headerStyle: {
            backgroundColor: Constants.Colors.main_color,
            opacity: 0.8
        },
        headerTitleContainerStyle: {
            paddingVertical: 15
        }
    }


    state = {
        band: {},
        albums: []
    }

    componentDidMount() {
        var id = this.props.navigation.getParam('id');
        var url = Config.url_get_band_by_id.replace(':id', id);
        const promise = getData(url);
        promise.then(band => this.setState({ band }));

        const promiseAlbums = getData(Config.url_get_albums);
        promiseAlbums.then(albums => this.setState({ albums }));
    }


    getAlbumsImages = (band) => {
        var albums = [];
        this.state.albums.forEach(album => {
            band.albums.forEach(alb => {
                if (alb === album.band) {
                    albums.push(album.image);
                    
                }
            })
        });
        return albums
    }

    render() {
        const { band } = this.state;

        return (
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }} ref="_scrollView">
                    {/* Foto Principal + Logo*/}
                    <View style={{ flex: 1 }}>
                        <ImageBackground style={{ flex: 1, width: null, height: Dimensions.get('screen').height * 0.30 }} source={{ uri: band.image }}>
                            <View style={styles.barLogo}>
                                <ImageBackground style={{
                                    borderRadius: Math.round(Dimensions.get('screen').width + Dimensions.get('screen').height) / 2,
                                    width: Dimensions.get('screen').width * 0.2,
                                    height: Dimensions.get('screen').width * 0.2,
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: -30
                                }}>
                                    <Image source={{ uri: band.image }} style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 80,
                                        width: 80
                                    }}></Image>
                                </ImageBackground>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{ justifyContent: 'center', paddingHorizontal: 30 }}>
                        <View style={styles.barTitle}>
                            <Text style={styles.titulo}>{band && band.name && band.name.toUpperCase()}</Text>
                            <Text style={styles.titulo}>{band && band.numPlays}</Text>
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>{band.biography}</Text>
                        </View>
                        <View style={{ paddingVertical: 10 }}>
                            <Divider style={{ backgroundColor: 'gray' }} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>ALBUNS</Text>
                        </View>

                        <FlatList
                            horizontal={false}
                            numColumns={3}
                            data={this.getAlbumsImages(band)}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => <Image source={{ uri: item }}></Image>} />
                    </View>
                </ScrollView>
            </View >
        );
    }
}


export default withNavigation(AlbumsScreen);