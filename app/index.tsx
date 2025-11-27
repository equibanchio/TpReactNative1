import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';
import HomeScreen from '../src/screens/HomeScreen';

export default function Page() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}
