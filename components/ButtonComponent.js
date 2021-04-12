import React from 'react';
import {StyleSheet, Button, View, SafeAreaView, Text, Alert} from 'react-native';

export default function ButtonComponent({randomLocation}) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.button}>
                <Button
                    color='black'
                    title="RANDOM CITY"
                    onPress={randomLocation}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        borderRadius: 50,
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 80,
    },
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});
