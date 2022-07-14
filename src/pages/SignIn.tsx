import * as React from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useState, useCallback, useRef, Ref} from 'react';
import styled, {css} from '@emotion/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'App';

type SignInProps = {
  email: string;
  password: string;
};

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({navigation}: SignInScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();

  const onSubmit = useCallback(() => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    } else {
      Alert.alert('알림', '로그인되었습니다.');
    }
  }, []);

  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);
  const onChangeEmail = useCallback((text: string) => {
    setEmail(text);
  }, []);
  const onChangePassword = useCallback((text: string) => {
    setPassword(text);
  }, []);

  const canGoNext = email && password;
  return (
    <View>
      <InputWrapperView>
        <LabelText>이메일</LabelText>
        <LabelTextInput
          placeholder="이메일을 입력하세요"
          onChangeText={onChangeEmail}
          value={email}
          importantForAutofill="yes"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          returnKeyType="next"
          onSubmitEditing={() => {
            passwordRef.current?.focus();
          }}
          blurOnSubmit={false}
          ref={emailRef}
          clearButtonMode="while-editing"
        />
      </InputWrapperView>
      <InputWrapperView>
        <LabelText>비밀번호</LabelText>
        <LabelTextInput
          placeholder="비밀번호를 입력하세요."
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry={true}
          autoComplete="password"
          textContentType="password"
          ref={passwordRef}
          onSubmitEditing={onSubmit}
        />
      </InputWrapperView>
      <ButtonsView>
        <LoginButton
          onPress={onSubmit}
          disabled={!canGoNext}
          email={email}
          password={password}>
          <LoginButtonText>로그인</LoginButtonText>
        </LoginButton>
        <Pressable onPress={toSignUp}>
          <Text>회원가입</Text>
        </Pressable>
      </ButtonsView>
    </View>
  );
};

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

const LoginButton = styled.Pressable(({email, password}: SignInProps) => {
  return {
    backgroundColor: !email || !password ? 'gray' : 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  };
});

const LoginButtonText = styled.Text({
  color: 'white',
});

export default SignIn;
