import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import Constants from '../constants/Constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',

    },
    textInputContainer: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    textInput: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 10,
        paddingLeft: 0
    },
    image: {
        flex: 1,
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }
});

export default class HeadertItem extends React.Component {

    state = {
        band: '',
    };

    handleClick = () => {
        this.props.getBandByName(this.state.band);
    }

    render() {
        if (this.props.withTextInput) {
            return <View style={styles.container}>
                <View style={styles.textInputContainer}>
                    <TouchableOpacity onPress={() => this.setState({ band: '' })} style={{ marginLeft: 30 }} >
                        {this.state.band !== '' && <Entypo name='cross' color='gray' size={25} />}
                    </TouchableOpacity>
                    <TextInput style={styles.textInput} value={this.state.band} onChangeText={(band) => this.setState({ band })} />
                    <TouchableOpacity onPress={() => this.handleClick()}>
                        <Image style={{ tintColor: 'black', width: 15, height: 15, marginRight: 10 }} source={Constants.Images.search} />
                    </TouchableOpacity>
                </View>
                <Image style={styles.image} source={Constants.Images.logo}></Image>
            </View>
        }
        return <View style={styles.container}>
            <Image style={styles.image} source={Constants.Images.logo}></Image>
        </View>

    };
}