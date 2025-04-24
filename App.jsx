import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import CreateScreen from './src/screens/CreateScreen';

export default function App() {
  const [view, setView] = useState('home');
  const [editItem, setEditItem] = useState(null);
  const [shouldReload, setShouldReload] = useState(false);

  return (
    <View style={styles.container}>
      {view === 'home' ? (
        <HomeScreen
          setView={setView}
          setEditItem={setEditItem}
          shouldReload={shouldReload}
          setShouldReload={setShouldReload}
        />
      ) : (
        <CreateScreen
          setView={setView}
          editItem={editItem}
          setEditItem={setEditItem}
          setShouldReload={setShouldReload}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});
