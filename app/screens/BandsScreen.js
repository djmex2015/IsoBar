import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, FlatList, Text } from 'react-native';
import { getData } from '../services/Service';
import Constants from '../constants/Constants';
import Config from '../constants/Configuration';
import HeaderItem from '../shared/HeaderItem';
import Band from '../shared/Band';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#F2F2F2',
    },
    text: {
        fontSize: 32,
        fontFamily: 'Lato_black',
        padding: 10
    },
});

const getBandByName = (name, bands) => {
    bands.forEach(band => {
        if (band.name.toUpperCase() == name.toUpperCase()) {
            // this.setState({ bands: [band] });
        }
    });
}

export default class BandsScreen extends React.Component {

    state = {
        bands: []
    }

    componentDidMount() {
        const promise = getData(Config.url_get_bands);
        promise.then(bands => {
            this.setState({ bands });
            // this.bandsResult = [...this.state.bands];
        })
    }

    static navigationOptions = {
        headerTitle: <HeaderItem withTextInput getBandByName={val => getBandByName(val, this.state.bands)} />,
        headerStyle: {
            backgroundColor: Constants.Colors.main_color,
        },
        headerTitleContainerStyle: {
            paddingVertical: 15
        }
    }

    render() {
        const bands = this.state.bands;

        if (bands && bands.length > 0) {
            return (
                <View style={styles.container}>
                    <View>
                        <FlatList
                            horizontal={false}
                            numColumns={1}
                            data={bands}
                            keyExtractor={(item) => item.name}
                            renderItem={({ item }) => <TouchableOpacity onPress={() => this.props.navigation.navigate('Albums', { id: item.id })}><Band name={item.name} image={item.image} numPlays={item.numPlays}></Band></TouchableOpacity>}
                        />
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'gray', fontSize: 32, paddingBottom: 20 }}>Sim resultados...</Text>
                    <Image style={{ tintColor: 'gray' }} width={100} height={100} source={Constants.Images.no_results} />
                </View>
            )
        }
    }
}