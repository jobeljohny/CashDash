import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import AppBackground from '../Components/AppBackground'
import HomeOption from '../Components/HomeOption'

export default function HomeScreen() {
    return (
        <AppBackground>
            <View style={styles.logoWrapper}>
                <Image style={styles.logoImage} source={require("../Assets/home-logo.png")} />
            </View>
            <View style={styles.optionsContainer} >
                <HomeOption text="Add New Payment" logo={require("../Assets/home-options/add.png")} />
                <HomeOption text="View Payments" logo={require("../Assets/home-options/view.png")} />
                <HomeOption text="Export Data" logo={require("../Assets/home-options/export.png")} />
                <HomeOption text="Exit Applicaton" logo={require("../Assets/home-options/exit.png")} />
            </View>
        </AppBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    logoWrapper: {
        marginTop: 100,
        alignItems: 'center'
    },
    logoImage: {
        width: 260,
        height: 260
    },
    optionsContainer: {
        width: '100%',
        gap: 12,
        marginTop: 'auto',
        marginBottom: 48
    }
})