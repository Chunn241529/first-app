import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme'; // Đây là dòng import theme từ đúng đường dẫn
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import { nameValidator } from '../helpers/nameValidator';
import * as ImagePicker from 'expo-image-picker';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { ref, set, getDatabase } from 'firebase/database';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [companyName, setCompanyName] = useState({ value: '', error: '' });
  const [phone, setPhone] = useState({ value: '', error: '' });
  const [facebook, setFacebook] = useState({ value: '', error: '' });
  const [linkedin, setLinkedin] = useState({ value: '', error: '' });
  const [image, setImage] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const onSignUpPressed = async () => {
    if (currentStep === 1) {
      const nameError = nameValidator(name.value);
      const emailError = emailValidator(email.value);
      const passwordError = passwordValidator(password.value);

      if (emailError || passwordError || nameError) {
        setName({ ...name, error: nameError });
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        return;
      }

      setCurrentStep(2);
    } else if (currentStep === 2) {
      try {
        const auth = getAuth();
        const authUser = await createUserWithEmailAndPassword(auth, email.value, password.value);

        const userUid = authUser.user.uid;
        const database = getDatabase();
        const dbRef = ref(database, `users/${userUid}`);

        set(dbRef, {
          name: name.value,
          email: email.value,
          companyName: companyName.value,
          phone: phone.value,
          facebook: "https://" + facebook.value,
          linkedin: "https://" + linkedin.value,
        });

        setCurrentStep(3);
      } catch (error) {
        Alert.alert('Lỗi đăng ký', 'Đã xảy ra lỗi khi đăng ký tài khoản. Vui lòng thử lại sau.');
      }
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
      setImage(result.uri);
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Tạo tài khoản</Header>
      {currentStep === 1 && (
        <>
          <TextInput
            label="Họ và tên"
            returnKeyType="next"
            value={name.value}
            onChangeText={(text) => setName({ value: text, error: '' })}
            error={!!name.error}
            errorText={name.error}
          />
          <TextInput
            label="Email"
            returnKeyType="next"
            value={email.value}
            onChangeText={(text) => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />
          <TextInput
            label="Mật khẩu"
            returnKeyType="done"
            value={password.value}
            onChangeText={(text) => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />
        </>
      )}
      {currentStep === 2 && (
        <>
          <TextInput
            label="Tên công ty"
            returnKeyType="next"
            value={companyName.value}
            onChangeText={(text) => setCompanyName({ value: text, error: '' })}
          />
          <TextInput
            label="Số điện thoại"
            returnKeyType="next"
            value={phone.value}
            onChangeText={(text) => setPhone({ value: text, error: '' })}
            autoCompleteType="tel"
            textContentType="telephoneNumber"
            keyboardType="phone-pad"
          />
          <TextInput
            label="Facebook"
            returnKeyType="next"
            value={facebook.value}
            onChangeText={(text) => setFacebook({ value: text, error: '' })}
          />
          <TextInput
            label="LinkedIn"
            returnKeyType="done"
            value={linkedin.value}
            onChangeText={(text) => setLinkedin({ value: text, error: '' })}
          />
        </>
      )}
      {currentStep === 3 && (
        <>
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
        </>
      )}
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        {currentStep === 1 ? 'Tiếp tục' : currentStep === 2 ? 'Tiếp tục' : 'Đăng ký'}
      </Button>
      {currentStep === 1 && (
        <View style={styles.row}>
          <Text>Bạn đã có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.link}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      )}
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