import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet, TextInput, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingIcon from '../../assets/icons/SettingIcon';

export default function HomeScreen({ setView, setEditItem, shouldReload, setShouldReload }) {
  const [items, setItems] = useState([]);
  const [view, setview] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const storedData = await AsyncStorage.getItem('allData');
      const parsedData = storedData ? JSON.parse(storedData) : [];
      setItems(parsedData);
    };

    fetchData();
  }, [shouldReload]);  // Will reload items whenever `shouldReload` changes

  const handleLongPress = (item) => {
    setEditItem(item);   // Set the item to be edited
    setView('create');   // Switch to CreateScreen for editing
  };

  // const renderItem = ({ item }) => {
  //   // Ensure the item has an id and fallback to a generated one if it's missing
  //   const itemId = item.id ? item.id.toString() : `${Math.random()}`;


  const renderItem = ({ item }) => {
    const isLowStock = parseInt(item.stockQty, 10) <= parseInt(item.stockMinQty, 10);
    return (
      <TouchableOpacity
        style={[
          styles.itemCard,
          { backgroundColor: isLowStock ? '#FFCDD2' : '#E0F7FA' },
        ]}
        onLongPress={() => handleLongPress(item)} // Long press to edit
      >
        <Text style={styles.itemName}>{item.item}</Text>
        <Text style={styles.itemDetails}>{item.link}</Text>
        <Text style={styles.itemDetails}>
          Qty: {item.stockQty}/{item.stockMinQty} | ₹{item.stockAmt}
        </Text>
        {item.tag ? <Text style={styles.tags}>Tags: {item.tag}</Text> : null}
        {item.shopName ? (
          <Text style={styles.shopText}>Shop: {item.shopName}</Text>
        ) : null}
        {item.description ? (
          <Text style={styles.descText}>Description: {item.description}</Text>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: '#fff', paddingHorizontal: '2%' }}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.title}>
          <Pressable onPress={() => {
          setView('create');
          setEditItem(null); // Make sure there is no item to edit when creating new
        }}>
            <SettingIcon style={styles.Sicon} />
          </Pressable>
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          style={[
            styles.btn,
            view === 0 ? { backgroundColor: '#72C37AFF' } : null,
          ]}
          onPress={() => setview(0)}>
          <Text style={[styles.btnTxt, view === 0 ? { color: '#fff' } : null]}>
            All Items
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.btn,
            view === 1 ? { backgroundColor: '#FFCDD2' } : null,
          ]}
          onPress={() => setview(1)}>
          <Text style={[styles.btnTxt, view === 1 ? { color: 'red' } : null]}>
            Low Stock
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.btn,
            view === 2 ? { backgroundColor: '#72C37AFF' } : null,
          ]}
          onPress={() => setview(2)}>
          <Text style={[styles.btnTxt, view === 2 ? { color: '#fff' } : null]}>
            High
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.btn,
            view === 3 ? { backgroundColor: '#72C37AFF' } : null,
          ]}
          onPress={() => setview(3)}>
          <Text style={[styles.btnTxt, view === 3 ? { color: '#f8fc03' } : null]}>
            Medium
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.btn,
            view === 4 ? { backgroundColor: '#FFCDD2' } : null,
          ]}
          onPress={() => setview(4)}>
          <Text style={[styles.btnTxt, view === 4 ? { color: 'red' } : null]}>
            low
          </Text>
        </Pressable>
      </View>
      <TextInput
        style={styles.searchBox}
        placeholder="Search by name or tags..."
        // value={searchText}
        // onChangeText={setSearchText}
        placeholderTextColor="#777"
      />
      {/* <Button
        title="Create New Item"
        onPress={() => {
          setView('create');
          setEditItem(null); // Make sure there is no item to edit when creating new
        }}
      /> */}
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id ? item.id.toString() : `${Math.random()}`} // Ensuring valid key
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  Sicon: {
    height: 25,
    width: 25
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
    paddingHorizontal: '4%',
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#72C37AFF',
  },
  btnTxt: {
    color: 'green',
    fontSize: 12,
  },
  //new code
  searchBox: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#FFF',
    fontSize: 16,
  },
  itemCard: {
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    elevation: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDetails: {
    fontSize: 14,
    color: '#555',
  },
  tags: {
    fontSize: 14,
    marginTop: 4,
    color: '#444',
  },
  shopText: {
    fontSize: 13,
    marginTop: 4,
    color: '#666',
  },
  descText: {
    fontSize: 13,
    marginTop: 4,
    color: '#888',
  },
});
