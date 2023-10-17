import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import { ref, get } from 'firebase/database'; // Import thêm phần này
import { auth, database } from '../../firebase'; // Import auth từ tệp firebase.js
import Icon from 'react-native-vector-icons/FontAwesome';
import { Linking } from 'react-native';


export default function Dashboard({ navigation }) {
  const [userData, setUserData] = useState({
    image: null,
    name: '',
    phone: '',
    roleUser: '',
    template: '',
    description: '',
    facebook: '',
    linkedin: '',
  });

  useEffect(() => {
    // Lấy thông tin người dùng từ Firebase Realtime Database
    const userId = auth.currentUser.uid; // Lấy ID của người dùng đã đăng nhập

    const dbRef = ref(database, `users/${userId}`);

    get(dbRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setUserData({
            image: data.image,
            name: data.name,
            phone: data.phone,
            roleUser: data.roleUser,
            template: data.template,
            description: data.description,
            facebook: data.facebook,
            linkedin: data.linkedin,
          });
        } else {
          console.log('Không tìm thấy dữ liệu người dùng.');
        }
      })
      .catch((error) => {
        console.error('Lỗi khi truy cập dữ liệu:', error);
      });
  }, []);

  return (
    <Background>
      {/* ... */}
      <View style={styles.card}>
        <IconButton
          icon="arrow-left"
          color="#000"
          size={30}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'StartScreen' }],
            })
          }
          style={styles.leftIcon}
        />
        <Image
          style={styles.avatar}
          source={{ uri: userData.image }}
        />
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.title}>{userData.roleUser}</Text>
        <Text style={styles.description}>{userData.description}</Text>
        {/* <Text style={styles.phone}>{userData.phone}</Text> */}
        {/* <Text style={styles.template}>{userData.template}</Text> */}

        <View style={styles.iconRow}>
          <Icon
            name="phone"
            size={30}
            style={styles.icon}
            onPress={() => {
              if (userData.phone) {
                const phoneNumber = `tel:${userData.phone}`;
                Linking.openURL(phoneNumber);
              }
            }}
          />
          <Icon
            name="facebook"
            size={30}
            style={styles.icon}
            onPress={() => {
              if (userData.facebook) {
                Linking.openURL(userData.facebook);
              }
            }}
          />
          <Icon
            name="linkedin"
            size={30}
            style={styles.icon}
            onPress={() => {
              if (userData.linkedin) {
                Linking.openURL(userData.linkedin);
              }
            }}
          />
        </View>

      </View>
      {/* <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          })
        }
      >
        Đăng xuất
      </Button> */}


    </Background>
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
    width: 'auto',
    height: 'auto',
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
    paddingTop: 16,
    fontSize: 14,
    color: '#777',
  },
  phone: {
    fontSize: 16,
    color: '#555',
    paddingTop: 10,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
  },
  icon: {
    padding: 20,
    marginRight: 5,
    color: '#3B5998', // Màu của biểu tượng Facebook (màu xanh Facebook)
  },
  facebook: {
    fontSize: 16,
    color: '#555',
  },
  linkedin: {
    fontSize: 16,
    color: '#555',
  },
  leftIcon: {
    position: 'absolute',
    left: 1,
  },

});
