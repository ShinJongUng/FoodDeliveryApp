<<<<<<< Updated upstream
import * as React from 'react';
import {Text, View} from 'react-native';
=======
import React, {useCallback, useEffect} from 'react';
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
  const money = useSelector((state: RootState) => state.user.money);
  const name = useSelector((state: RootState) => state.user.name);

  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getMoney() {
      const response = await axios.get<{data: number}>(
        `${Config.API_URL}/showmethemoney`,
        {
          headers: {authorization: `Bearer ${accessToken}`},
        },
      );
      dispatch(userSlice.actions.setMoney(response.data.data));
    }
    getMoney();
  }, [accessToken, dispatch]);

  const onLogout = useCallback(async () => {
    try {
      await axios.post(
        `${Config.API_URL}/logout`,
        {},
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
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
>>>>>>> Stashed changes

const Settings = () => {
  return (
    <View>
<<<<<<< Updated upstream
      <Text>설정</Text>
    </View>
  );
};
=======
      <MoneyView>
        <MoneyText>
          {name}님의 수익금{' '}
          <Text style={{fontWeight: 'bold'}}>
            {money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
          원
        </MoneyText>
      </MoneyView>
      <ButtonZoneView>
        <LoginButton onPress={onLogout}>
          <LoginButtonText>로그아웃</LoginButtonText>
        </LoginButton>
      </ButtonZoneView>
    </View>
  );
}

const MoneyView = styled.View({
  padding: 20,
});

const MoneyText = styled.Text({
  fontSize: 16,
});

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
>>>>>>> Stashed changes

export default Settings;
