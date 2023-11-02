import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import Background from '../components/Background';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Linking, Share } from 'react-native';
import { ref, get } from 'firebase/database';
import { auth, database } from '../../firebase';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import { initNfc, readNdef, writeNdef, stopNfc } from '../components/NFCManager';

export default function NFCDetailScreen({ route, navigation }) {
    const { profileData } = route.params; // Lấy dữ liệu hồ sơ từ route.params
    const userId = auth.currentUser.uid;
    // Sử dụng profileData để hiển thị thông tin hồ sơ
    const [userData, setUserData] = useState({
        id: profileData.id,
        image: profileData.image,
        name: profileData.name,
        phone: profileData.phone,
        companyName: profileData.companyName,
        description: profileData.description,
        facebook: profileData.facebook,
        linkedin: profileData.linkedin,
    });

    // const [profileURL, setProfileURL] = useState('');
    // const [showWebView, setShowWebView] = useState(false);
    // const [webViewUrl, setWebViewUrl] = useState('');
    useEffect(() => {
        // Khởi tạo NFC khi màn hình được tải
        initNfc();

        return () => {
            // Dừng NFC khi màn hình bị unmount
            stopNfc();
        };
    }, []);

    // const handleShare = () => {
    // const profileURL = `https://chunn241529.github.io/first-app/NFC.html?userId=${userId}&profileId=${profileData.id}`;
    //     Linking.openURL(profileURL); // Mở trang web trực tiếp trong trình duyệt
    // };
    const handleWriteNfc = async () => {
        const profileURL = `https://chunn241529.github.io/first-app/NFC.html?userId=${userId}&profileId=${profileData.id}`;
        const dataToWrite = profileURL;
        try {
            const result = await writeNdef(dataToWrite);
            Alert.alert('Ghi dữ liệu thành công', '');
        } catch (error) {
            Alert.alert('Ghi dữ liệu thất bại', 'Không tìm thấy thẻ để ghi dữ liệu.');
        }
    };


    return (
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Button mode="contained"
                onPress={handleWriteNfc}
            >Ghi dữ liệu</Button>
        </Background >
    );

}

