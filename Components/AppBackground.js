import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function AppBackground({ children }) {
    return (
        <LinearGradient colors={['#192438', '#1d6b47']} locations={[0.5, 1]} style={styles.container}>
            {children}
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});