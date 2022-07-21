import * as React from 'react';
import {FlatList, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Order} from '../../src/slices/order';
import {RootState} from '../../src/store/reducer';
import EachOrder from '../components/EachOrder';

const Orders = () => {
  const orders = useSelector((state: RootState) => state.order.orders);

  const renderItem = React.useCallback(({item}: {item: Order}) => {
    return <EachOrder item={item} />;
  }, []);
  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={item => item.orderId}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Orders;
