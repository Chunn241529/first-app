import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function BottomBar({ navigation }) {
    return (
        <View style={styles.bottomBar}>
            <TouchableOpacity
                style={styles.bottomBarItem}
                onPress={() => navigation.navigate('Dashboard')}
            >
                <Icon name="home" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.bottomBarItem}
                onPress={() => navigation.navigate('AddScreen')}
            >
                <Icon name="plus" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.bottomBarItem}
                onPress={() => navigation.navigate('UserProfileScreen')}
            >
                <Icon name="user" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 25,
        borderWidth: 1,
        borderColor: 'lightgray',
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
    },
    bottomBarItem: {
        alignItems: 'center',
        flex: 1,
    },
});
