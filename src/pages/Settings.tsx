import React, {useCallback} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import EncryptedStorage from 'react-native-encrypted-storage';
import styled from '@emotion/native';

function Settings() {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useAppDispatch();
  const onLogout = useCallback(async () => {
    try {
      await axios.post(
        `${Config.API_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      Alert.alert('알림', '로그아웃 되었습니다.');
      dispatch(
        userSlice.actions.setUser({
          name: '',
          email: '',
          accessToken: '',
        }),
      );
      await EncryptedStorage.removeItem('refreshToken');
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      console.error(errorResponse);
    }
  }, [accessToken, dispatch]);

  return (
    <View>
      <ButtonZoneView>
        <LoginButton onPress={onLogout}>
          <LoginButtonText>로그아웃</LoginButtonText>
        </LoginButton>
      </ButtonZoneView>
    </View>
  );
}

const ButtonZoneView = styled.View({
  alignItems: 'center',
  paddingTop: 20,
});

const LoginButton = styled.Pressable({
  backgroundColor: 'blue',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 5,
  marginBottom: 10,
});

const LoginButtonText = styled.Text({
  color: 'white',
  fontSize: 16,
});

export default Settings;
