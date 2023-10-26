import React from 'react';
import { ImageBackground, View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../core/theme';
import { IconButton } from 'react-native-paper';

export default function Dashboard({ navigation }) {
    return (
        <ImageBackground
            source={require('../assets/background_dot.png')}
            resizeMode="repeat"
            style={styles.background}
        >
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Trang chủ</Text>
                    <Image
                        source={require('../assets/path_to_default_image.png')}
                        style={styles.avatar}
                    />
                </View>
                <View style={styles.searchContainer}>
                    <View style={styles.searchInputContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Tìm kiếm"
                        />
                        <Icon name="search" size={20} style={styles.searchIcon} />
                    </View>
                    <IconButton
                        icon="filter"
                        color="#000"
                        size={20}
                        onPress={() =>
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'EditScreen' }],
                            })
                        }
                        style={styles.rightIcon}
                    />

                </View>
                <View style={styles.boxBody}>
                    <Text style={styles.title_body}>Hồ sơ của bạn</Text>
                    <ScrollView>
                        <View style={styles.userProfileItem}>
                            <Image source={require('../assets/path_to_default_image.png')} style={styles.userImage} />
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>tên hồ sơ 1</Text>
                                <Text style={styles.companyName}>company nè</Text>
                            </View>
                        </View>
                        <View style={styles.userProfileItem}>
                            <Image source={require('../assets/path_to_default_image.png')} style={styles.userImage} />
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>tên hồ sơ 2</Text>
                                <Text style={styles.companyName}>company nè</Text>
                            </View>
                        </View>
                        <View style={styles.userProfileItem}>
                            <Image source={require('../assets/path_to_default_image.png')} style={styles.userImage} />
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>tên hồ sơ 1</Text>
                                <Text style={styles.companyName}>company nè</Text>
                            </View>
                        </View>
                        <View style={styles.userProfileItem}>
                            <Image source={require('../assets/path_to_default_image.png')} style={styles.userImage} />
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>tên hồ sơ 2</Text>
                                <Text style={styles.companyName}>company nè</Text>
                            </View>
                        </View>
                        <View style={styles.userProfileItem}>
                            <Image source={require('../assets/path_to_default_image.png')} style={styles.userImage} />
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>tên hồ sơ 1</Text>
                                <Text style={styles.companyName}>company nè</Text>
                            </View>
                        </View>
                        <View style={styles.userProfileItem}>
                            <Image source={require('../assets/path_to_default_image.png')} style={styles.userImage} />
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>tên hồ sơ 2</Text>
                                <Text style={styles.companyName}>company nè</Text>
                            </View>
                        </View>
                        <View style={styles.userProfileItem}>
                            <Image source={require('../assets/path_to_default_image.png')} style={styles.userImage} />
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>tên hồ sơ 1</Text>
                                <Text style={styles.companyName}>company nè</Text>
                            </View>
                        </View>
                        <View style={styles.userProfileItem}>
                            <Image source={require('../assets/path_to_default_image.png')} style={styles.userImage} />
                            <View style={styles.userInfo}>
                                <Text style={styles.userName}>tên hồ sơ 2</Text>
                                <Text style={styles.companyName}>company nè</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.surface,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 30,
        right: 5,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    title: {
        flex: 1,
        fontSize: 25,
        marginRight: 10,
        marginLeft: 20,
        textAlign: 'left',
        fontWeight: 'bold',
    },
    searchContainer: {
        flex: 1,
        padding: 20,
        flexDirection: 'row',
        left: 0,
        position: 'absolute',
        top: 70,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        width: '87%',
        backgroundColor: 'white',
        color: 'black',
    },
    searchInput: {
        textAlign: 'left',
        flex: 1,
        marginLeft: 10,
    },
    searchIcon: {
        color: 'gray',
        marginRight: 10,
    },
    boxBody: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 30,
        margin: 10,
        borderWidth: 0.5,
        marginTop: '45%',
        paddingTop: 10,  // Để tạo khoảng cách giữa title và hồ sơ đầu tiên
    },
    title_body: {
        fontSize: 20,
        marginLeft: 20,
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: 10,  // Để tạo khoảng cách giữa title và hồ sơ đầu tiên
    },
    userProfileItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        marginBottom: 10,
    },
    userImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 10,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    companyName: {
        fontSize: 14,
        color: 'gray',
    },
});
