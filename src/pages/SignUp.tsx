import React, {useCallback, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import DismissKeyboardView from '../components/DismissKeyboardView';
import styled from '@emotion/native';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

type SignUpProps = {
  email: string;
  name: string;
  password: string;
};

function SignUp({navigation}: SignUpScreenProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<TextInput | null>(null);
  const nameRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback((text: any) => {
    setEmail(text.trim());
  }, []);
  const onChangeName = useCallback((text: any) => {
    setName(text.trim());
  }, []);
  const onChangePassword = useCallback((text: any) => {
    setPassword(text.trim());
  }, []);
  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!name || !name.trim()) {
      return Alert.alert('알림', '이름을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(
        email,
      )
    ) {
      return Alert.alert('알림', '올바른 이메일 주소가 아닙니다.');
    }
    if (!/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[$@^!%*#?&]).{8,50}$/.test(password)) {
      return Alert.alert(
        '알림',
        '비밀번호는 영문,숫자,특수문자($@^!%*#?&)를 모두 포함하여 8자 이상 입력해야합니다.',
      );
    }
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3105/user', {
        email,
        name,
        password,
      });
      Alert.alert('알림', '회원가입 되었습니다.');
      navigation.navigate('SignIn');
    } catch (error: any) {
      if (error.response) {
        console.error((error as AxiosError).response);
        Alert.alert('알림', error.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, [loading, email, name, password]);

  const canGoNext = email && name && password;
  return (
    <DismissKeyboardView>
      <InputWrapperView>
        <LabelText>이메일</LabelText>
        <LabelTextInput
          onChangeText={onChangeEmail}
          placeholder="이메일을 입력해주세요"
          placeholderTextColor="#666"
          textContentType="emailAddress"
          value={email}
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={emailRef}
          onSubmitEditing={() => nameRef.current?.focus()}
          blurOnSubmit={false}
        />
      </InputWrapperView>
      <InputWrapperView>
        <LabelText>이름</LabelText>
        <LabelTextInput
          placeholder="이름을 입력해주세요."
          placeholderTextColor="#666"
          onChangeText={onChangeName}
          value={name}
          textContentType="name"
          returnKeyType="next"
          clearButtonMode="while-editing"
          ref={nameRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
          blurOnSubmit={false}
        />
      </InputWrapperView>
      <InputWrapperView>
        <LabelText>비밀번호</LabelText>
        <LabelTextInput
          placeholder="비밀번호를 입력해주세요(영문,숫자,특수문자)"
          placeholderTextColor="#666"
          onChangeText={onChangePassword}
          value={password}
          keyboardType={Platform.OS === 'android' ? 'default' : 'ascii-capable'}
          textContentType="password"
          secureTextEntry
          returnKeyType="send"
          clearButtonMode="while-editing"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
        />
      </InputWrapperView>
      <ButtonsView>
        <RegisterButton
          disabled={!canGoNext || loading}
          onPress={onSubmit}
          email={email}
          name={name}
          password={password}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <RegisterButtonText>회원가입</RegisterButtonText>
          )}
        </RegisterButton>
      </ButtonsView>
    </DismissKeyboardView>
  );
}

const InputWrapperView = styled.View({
  padding: 20,
});

const LabelText = styled.Text({
  fontWeight: 'bold',
  fontSize: 16,
  marginBottom: 20,
});

const LabelTextInput = styled.TextInput({
  padding: 5,
  borderBottomWidth: StyleSheet.hairlineWidth,
});

const ButtonsView = styled.View({
  alignItems: 'center',
});

const RegisterButton = styled.Pressable(
  ({email, password, name}: SignUpProps) => {
    return {
      backgroundColor: !email || !password || !name ? 'gray' : 'blue',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
      marginBottom: 10,
      fontSize: 16,
    };
  },
);

const RegisterButtonText = styled.Text({
  color: 'white',
});

export default SignUp;
