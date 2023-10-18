import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import Background from '../components/Background';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import * as ImagePicker from 'expo-image-picker';
import { update, getDatabase, ref } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export default function EditScreen({ navigation }) {
    const [name, setName] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [phone, setPhone] = useState('');
    const [facebook, setFacebook] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    // Lấy thông tin người dùng từ cơ sở dữ liệu Firebase và cập nhật state
    useEffect(() => {
        const user = getAuth().currentUser;
        const database = getDatabase();
        const dbRef = ref(database, `users/${user.uid}`);

        // Đọc thông tin người dùng từ cơ sở dữ liệu
        // và cập nhật state với thông tin hiện tại
        const fetchData = async () => {
            try {
                const snapshot = await get(dbRef);
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setName(data.name);
                    setCompanyName(data.companyName);
                    setPhone(data.phone);
                    setFacebook(data.facebook);
                    setLinkedin(data.linkedin);
                    setDescription(data.description);
                    setImage(data.image);
                }
            } catch (error) {
                console.error('Lỗi khi truy cập dữ liệu:', error);
            }
        };

        fetchData();
    }, []);

    const onSavePressed = async () => {
        try {
            const user = getAuth().currentUser;
            const database = getDatabase();
            const dbRef = ref(database, `users/${user.uid}`);

            // Cập nhật thông tin người dùng trong cơ sở dữ liệu
            await update(dbRef, {
                name,
                companyName,
                phone,
                facebook: `https://${facebook}`,
                linkedin: `https://${linkedin}`,
                description,
                image,
            });

            Alert.alert('Thông báo', 'Thông tin đã được cập nhật thành công.');
            navigation.goBack(); // Quay trở lại màn hình trước đó
        } catch (error) {
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại sau.');
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            Alert.alert('Cần quyền truy cập thư viện ảnh để tiếp tục');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <Background>
            <Header>Chỉnh sửa thông tin</Header>
            <TextInput
                label="Họ và tên"
                returnKeyType="next"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                label="Tên công ty"
                returnKeyType="next"
                value={companyName}
                onChangeText={(text) => setCompanyName(text)}
            />
            <TextInput
                label="Số điện thoại"
                returnKeyType="next"
                value={phone}
                onChangeText={(text) => setPhone(text)}
                autoCompleteType="tel"
                textContentType="telephoneNumber"
                keyboardType="phone-pad"
            />
            <TextInput
                label="Facebook"
                returnKeyType="next"
                value={facebook}
                onChangeText={(text) => setFacebook(text)}
            />
            <TextInput
                label="LinkedIn"
                returnKeyType="next"
                value={linkedin}
                onChangeText={(text) => setLinkedin(text)}
            />
            <Button
                mode="outlined"
                onPress={pickImage}
                style={{ marginTop: 16 }}
            >
                Chọn hình ảnh
            </Button>

            {image && (
                <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
            )}

            <TextInput
                label="Mô tả bản thân"
                returnKeyType="done"
                value={description}
                onChangeText={(text) => setDescription(text)}
                multiline
            />

            <Button mode="contained" onPress={onSavePressed} style={{ marginTop: 24 }}>
                Lưu thay đổi
            </Button>
        </Background>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});
