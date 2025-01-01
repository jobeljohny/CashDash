import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function PageHeader({ text, image }) {
    return (
        <View style={styles.container}>
            <Image style={styles.icon} source={image} />
            <Text style={styles.title}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    icon: {
        width:20,
        height:20
    },
    title: {

    }

})