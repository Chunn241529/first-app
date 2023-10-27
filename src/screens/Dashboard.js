import React, { useState, useEffect } from 'react';
import { ImageBackground, View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { theme } from '../core/theme';
import { IconButton } from 'react-native-paper';
import { ref, get } from 'firebase/database';
import { auth, database } from '../../firebase';
import BottomBar from '../components/BottomBar';

export default function Dashboard({ navigation }) {
    const [userProfiles, setUserProfiles] = useState([]);
    const [userData, setUserData] = useState({
        image: null,
        name: '',
        phone: '',
        companyName: '',
        description: '',
        facebook: '',
        linkedin: '',
    });

    const [profileURL, setProfileURL] = useState('');

    useEffect(() => {
        const userId = auth.currentUser.uid;
        const dbRef = ref(database, `users/${userId}`);

        // Lấy dữ liệu người dùng hiện tại
        get(dbRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setUserData({
                        image: data.image,
                        name: data.name,
                        phone: data.phone,
                        companyName: data.companyName,
                        description: data.description,
                        facebook: data.facebook,
                        linkedin: data.linkedin,
                    });

                    // Tạo URL cho trang profile
                    const profileURL = `http://192.168.1.42:5500/CardLink/detail.html?id=${userId}`;
                    setProfileURL(profileURL);

                    // Lấy dữ liệu từ bảng "profiles"
                    const profilesRef = ref(database, `users/${userId}/profiles`);
                    get(profilesRef)
                        .then((profilesSnapshot) => {
                            if (profilesSnapshot.exists()) {
                                // Chuyển dữ liệu từ snapshot thành một mảng các profiles
                                const profilesData = Object.values(profilesSnapshot.val());
                                setUserProfiles(profilesData);
                            }
                        })
                        .catch((error) => {
                            console.error('Lỗi khi truy cập dữ liệu profiles:', error);
                        });
                } else {
                    console.log('Không tìm thấy dữ liệu người dùng.');
                    Alert.alert('Lỗi dữ liệu!', 'Không tìm thấy dữ liệu người dùng..', [
                        {
                            text: 'Quay lại',
                            onPress: () => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'LoginScreen' }],
                                });
                            },
                        },
                    ]);
                }
            })
            .catch((error) => {
                console.error('Lỗi khi truy cập dữ liệu:', error);
            });
    }, []);

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
                        source={{ uri: userData.image }}
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
                        {userProfiles.map((profile, index) => (
                            <TouchableOpacity
                                style={styles.userProfileItem}
                                onPress={() => {
                                    navigation.navigate('ProfileScreen', { profileData: profile });
                                }}
                                key={index}
                            >
                                <Image source={{ uri: profile.image }} style={styles.userImage} />
                                <View style={styles.userInfo}>
                                    <Text style={styles.userName}>{profile.name}</Text>
                                    <Text style={styles.companyName}>{profile.companyName}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
            <BottomBar navigation={navigation} />
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
        width: 50,
        height: 50,
        borderRadius: 50,
        top: 10,
    },
    title: {
        flex: 1,
        fontSize: 25,
        marginRight: 10,
        marginLeft: 20,
        textAlign: 'left',
        top: 10,
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
        borderRadius: 20,
        margin: 10,
        borderWidth: 0.5,
        marginTop: '45%',
        paddingTop: 10,
    },
    title_body: {
        fontSize: 20,
        marginLeft: 20,
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: 10,
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