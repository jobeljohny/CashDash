import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'

export default function HomeOption({ text, logo }) {

    return (
        <TouchableOpacity style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 18,
        marginHorizontal: 32,
        paddingHorizontal: 10,
        paddingVertical: 16,
        backgroundColor: 'rgba(206, 201, 255, 0.08)',
        borderRadius: 10,
        alignItems: 'center'
    },
    logo: {
        width: 25,
        height: 25
    },
    text: {
        color: 'white',
        fontSize: 16
    }

})