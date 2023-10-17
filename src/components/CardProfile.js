import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function CardProfile() {
    return (
        <View style={styles.card}>
            <Image
                style={styles.avatar}
                source={{ uri: 'URL của hình ảnh' }}
            />
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.title}>Software Developer</Text>
            <Text style={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 16,
        alignItems: 'center',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    title: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    description: {
        fontSize: 14,
        color: '#777',
    },
});
