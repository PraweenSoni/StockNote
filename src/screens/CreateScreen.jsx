import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateScreen({ setView, editItem, setEditItem, setShouldReload }) {
  const [item, setItem] = useState('');
  const [stockAmt, setStockAmt] = useState('');
  const [stockQty, setStockQty] = useState(0);
  const [stockMinQty, setStockMinQty] = useState(0);
  const [shopName, setShopName] = useState('');
  const [link, setLink] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');

  // Drop down code
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Select Category');
  const categories = ['Low', 'Medium', 'High', 'CTM'];

  useEffect(() => {
    if (editItem) {
      setItem(editItem.item);
      setTag(editItem.tag);
      setDescription(editItem.description);
      setStockAmt(editItem.stockAmt);
      setStockQty(editItem.stockQty);
      setStockMinQty(editItem.stockMinQty);
      setShopName(editItem.shopName);
      setLink(editItem.link);
      if (editItem.category) setSelectedCategory(editItem.category);
    }
  }, [editItem]);

  const saveItem = async () => {
    if (!item.trim()) {
      Alert.alert('Validation', 'Item name is required');
      return;
    }

    // Retrieve stored data first
    const existingData = await AsyncStorage.getItem('allData');
    let allData = existingData ? JSON.parse(existingData) : [];

    // Duplicate Item check update:
    // If we're in edit mode, exclude the current editItem from the duplicate check.
    const dataToCheck = editItem 
      ? allData.filter(existingItem => existingItem.id !== editItem.id)
      : allData;

    const isDuplicate = dataToCheck.some(
      (existingItem) => existingItem.item.toLowerCase() === item.toLowerCase()
    );

    if (isDuplicate) {
      Alert.alert('Validation', 'Item with this name already exists.');
      return;
    }

    const newItem = {
      id: editItem ? editItem.id : Date.now().toString(),
      item,
      stockAmt,
      stockQty,
      stockMinQty,
      shopName,
      link,
      tag,
      description,
      category: selectedCategory,
    };

    if (editItem) {
      allData = allData.map((d) => (d.id === editItem.id ? newItem : d));
    } else {
      allData.push(newItem);
    }

    await AsyncStorage.setItem('allData', JSON.stringify(allData));
    setShouldReload((prev) => !prev);
    setEditItem(null);
    setView('home');
  };

  const deleteItem = async () => {
    if (!editItem) return;

    const existingData = await AsyncStorage.getItem('allData');
    let allData = existingData ? JSON.parse(existingData) : [];

    allData = allData.filter((d) => d.id !== editItem.id);

    await AsyncStorage.setItem('allData', JSON.stringify(allData));
    setShouldReload((prev) => !prev);
    setEditItem(null);
    setView('home');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TextInput
          placeholder="Item"
          value={item}
          onChangeText={setItem}
          style={styles.input}
        />
        <View style={styles.row}>
          <TextInput
            placeholder="Item Amount"
            value={stockAmt}
            keyboardType="numeric"
            onChangeText={setStockAmt}
            style={[styles.input, { width: '48%' }]}
          />
          <View style={[styles.dropdownContainer, { width: '48%' }]}>
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text style={styles.dropdownButtonText}>
                {selectedCategory}
              </Text>
            </TouchableOpacity>
            {isDropdownOpen && (
              <View style={styles.dropdownMenu}>
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedCategory(category);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
        <View style={styles.row}>
          <TextInput
            placeholder="Item Quantity"
            value={stockQty.toString()}
            keyboardType="numeric"
            onChangeText={(val) => setStockQty(parseInt(val) || 0)}
            style={[styles.input, styles.smallInput]}
          />
          <TextInput
            placeholder="Min Quantity"
            value={stockMinQty.toString()}
            keyboardType="numeric"
            onChangeText={(val) => setStockMinQty(parseInt(val) || 0)}
            style={[styles.input, styles.smallInput]}
          />
        </View>

        <View style={styles.row}>
          <TextInput
            placeholder="Shop Name"
            value={shopName}
            onChangeText={setShopName}
            style={[styles.input, styles.smallInput]}
          />
          <TextInput
            placeholder="Link"
            value={link}
            onChangeText={setLink}
            style={[styles.input, styles.smallInput]}
          />
        </View>
        <TextInput
          placeholder="Tag"
          value={tag}
          onChangeText={setTag}
          style={styles.input}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        <Button title={editItem ? 'Update Item' : 'Add Item'} onPress={saveItem} />
        {editItem && (
          <View style={{ marginTop: 10 }}>
            <Button title="Delete Item" color="red" onPress={deleteItem} />
          </View>
        )}
        {/* Button to go back to Home Screen */}
        <View style={{ marginTop: 10 }}>
          <Button
            title="Back to Home"
            color="gray"
            onPress={() => {
              setEditItem(null);
              setView('home');
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallInput: {
    flex: 1,
    marginRight: 8,
  },
  dropdownContainer: {
    flex: 1,
    position: 'relative',
    marginStart: 8,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
    padding: 12,
    justifyContent: 'center',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    zIndex: 10,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  textInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    textAlignVertical: 'top',
    marginBottom: 12,
  },
});
