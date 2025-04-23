import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  Pressable,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeleteIcon from '../../assets/icons/DeleteIcon';
import EditIcon from '../../assets/icons/EditIcon';

const CreateScreen = ({ route }) => {
  const [itemName, setItemName] = useState('');
  const [stockAmt, setStockAmt] = useState('');
  const [stockQty, setStockQty] = useState('');
  const [stockMinQty, setStockMinQty] = useState('');
  const [description, setDescription] = useState('');
  const [shopName, setShopName] = useState('');
  const [link, setLink] = useState('');
  const [tags, setTags] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [editItemId, setEditItemId] = useState(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Select Category');
  const categories = ['Low', 'Medium', 'High', 'CTM'];

  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const storedData = await AsyncStorage.getItem('stockData');
      if (storedData) {
        setData(JSON.parse(storedData));
      }
    };
    fetchData();
  }, []);

  const saveData = async (newData) => {
    await AsyncStorage.setItem('stockData', JSON.stringify(newData));
    setData(newData);
  };

  const resetInputs = () => {
    setItemName('');
    setStockAmt('');
    setStockQty('');
    setStockMinQty('');
    setShopName('');
    setLink('');
    setTags('');
    setDescription('');
    setSelectedCategory('Select Category');
    setIsEdit(false);
    setEditItemId(null);
  };

  const addItem = () => {
    if (!itemName) {
      alert('Item name is required!');
      return;
    }
    const isDuplicate = data.some(
      (item) => item.name.toLowerCase() === itemName.toLowerCase()
    );
    if (isDuplicate) {
      alert('Item with this name already exists.');
      return;
    }
    const newItem = {
      id: Date.now(),
      name: itemName,
      amount: stockAmt,
      stock: stockQty,
      stockMin: stockMinQty,
      category: selectedCategory,
      shopName,
      link,
      tags,
      description,
    };
    const newData = [...data, newItem];
    saveData(newData);
    resetInputs();
  };

  const editItem = (item) => {
    setIsEdit(true);
    setEditItemId(item.id);
    setItemName(item.name);
    setStockAmt(item.amount);
    setStockQty(item.stock);
    setStockMinQty(item.stockMin);
    setShopName(item.shopName || '');
    setLink(item.link || '');
    setTags(item.tags || '');
    setDescription(item.description || '');
    setSelectedCategory(item.category || 'Select Category');
  };

  const updateItem = () => {
    const updatedData = data.map((item) =>
      item.id === editItemId
        ? {
          ...item,
          name: itemName,
          amount: stockAmt,
          stock: stockQty,
          stockMin: stockMinQty,
          category: selectedCategory,
          shopName,
          link,
          tags,
          description,
        }
        : item
    );
    saveData(updatedData);
    resetInputs();
  };

  const deleteItem = () => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const filteredData = data.filter((item) => item.id !== editItemId);
            saveData(filteredData);
            resetInputs();
          },
        },
      ]
    );
  };

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.tags.toLowerCase().includes(searchText.toLowerCase());
    return matchesSearch;
  });

  const renderItem = ({ item }) => {
    const isLowStock = parseInt(item.stock) <= parseInt(item.stockMin);
    return (
      <TouchableOpacity
        style={[
          styles.listItem,
          { backgroundColor: isLowStock ? '#FFCDD2' : '#E0F7FA' },
        ]}
        onLongPress={() => editItem(item)}
      >
        <View>
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemText}>Qty: {item.stock}</Text>
        </View>
        <View style={styles.itemActions}>
          <Pressable onPress={() => editItem(item)}>
            <EditIcon style={styles.icon} fill="#1167b1" />
          </Pressable>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flexContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View style={styles.formContainer}>
            <TextInput
              placeholder="Search by name or tags"
              value={searchText}
              onChangeText={setSearchText}
              style={styles.input}
            />

            <TextInput
              placeholder="Enter item name..."
              value={itemName}
              onChangeText={setItemName}
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
                value={stockQty}
                keyboardType="numeric"
                onChangeText={setStockQty}
                style={[styles.input, styles.smallInput]}
              />
              <TextInput
                placeholder="Min Quantity"
                value={stockMinQty}
                keyboardType="numeric"
                onChangeText={setStockMinQty}
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
              placeholder="Tags"
              value={tags}
              onChangeText={setTags}
              style={styles.input}
            />

            <TextInput
              style={styles.textInput}
              placeholder="Item description"
              multiline
              value={description}
              onChangeText={setDescription}
            />

            <Pressable
              style={styles.button}
              onPress={isEdit ? updateItem : addItem}
            >
              <Text style={styles.buttonText}>
                {isEdit ? 'EDIT ITEM' : 'ADD ITEM'} IN STOCK
              </Text>
            </Pressable>

            {isEdit && (
              <Pressable style={styles.deleteButton} onPress={deleteItem}>
                <Text style={styles.deleteButtonText}>DELETE ITEM</Text>
              </Pressable>
            )}
          </View>
        </ScrollView>
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContentContainer}
          keyboardShouldPersistTaps="always"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F2F2' },
  flexContainer: { flex: 1, padding: 16 },
  formContainer: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  smallInput: {
    flex: 1,
    marginRight: 8,
  },
  dropdownContainer: { flex: 1, position: 'relative' },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    backgroundColor: '#FAFAFA',
    padding: 12,
    justifyContent: 'center',
  },
  dropdownButtonText: { fontSize: 16, color: '#333' },
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
  dropdownItemText: { fontSize: 16 },
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
  button: {
    backgroundColor: '#66FFFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: { fontSize: 16, fontWeight: '600', color: '#333' },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
  listContentContainer: { paddingBottom: 30 },
  listItem: {
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemText: { fontSize: 16, color: '#333' },
  itemActions: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 20, height: 20, marginLeft: 8 },
});
