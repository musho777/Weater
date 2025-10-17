import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './src/modules/state/store';
import MainNavigator from './src/modules/navigation/MainNavigator';
import { Provider } from 'react-redux';

function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    </GestureHandlerRootView>
  );
}
export default App;
