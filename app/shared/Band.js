import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import { Divider } from 'react-native-elements';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10
    },
});

const Band = ({ name, image, numPlays }) => {

    return (
        <View>
            <View style={styles.container}>
                <View style={{ flex: 1, paddingHorizontal: 10, justifyContent: 'flex-start', alignContent: 'center' }}>
                    <Image style={{
                        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
                        width: Dimensions.get('window').width * 0.2,
                        height: Dimensions.get('window').width * 0.2
                    }} source={{ uri: image }}></Image>
                </View>
                <View style={{ flex: 3 }}>
                    <View style={{ flexDirection: 'column', marginTop: '10%' }}>
                        <Text style={{ fontWeight: 'bold' }}>{name.toUpperCase()}</Text>
                        <Text>{numPlays} PLAYS</Text>
                    </View>
                </View>
            </View>
            <Divider style={{ backgroundColor: 'blue', paddingHorizontal: 10 }} />
        </View >
    )
}

Band.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    numPlays: PropTypes.number,

};

Band.defaultProps = {
    name: '',
    image: '',
    numPlays: 0,

};

export default Band;