import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const AllItems = ({ data, lowStockOnly, navigation }) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // If lowStockOnly is true, filter the data to show only low-stock items
    const filtered = data.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        (item.tags && item.tags.toLowerCase().includes(searchText.toLowerCase()));

      if (lowStockOnly) {
        return (
          matchesSearch && parseInt(item.stock, 10) <= parseInt(item.stockMin, 10)
        );
      } else {
        return matchesSearch;
      }
    });

    setFilteredItems(filtered);
  }, [searchText, data, lowStockOnly]);

  const handleLongPress = (item) => {
    // Navigate to CreateScreen with the selected item data
    navigation.navigate('CreateScreen', { itemData: item });
  };

  const renderItem = ({ item }) => {
    const isLowStock = parseInt(item.stock, 10) <= parseInt(item.stockMin, 10);
    return (
      <TouchableOpacity
        style={[
          styles.itemCard,
          { backgroundColor: isLowStock ? '#FFCDD2' : '#E0F7FA' },
        ]}
        onLongPress={() => handleLongPress(item)} // Long press to edit
      >
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDetails}>
          Qty: {item.stock}/{item.stockMin} | ₹{item.amount}
        </Text>
        {item.tags ? <Text style={styles.tags}>Tags: {item.tags}</Text> : null}
        {item.shopName ? (
          <Text style={styles.shopText}>Shop: {item.shopName}</Text>
        ) : null}
        {item.description ? (
          <Text style={styles.descText}>Note: {item.description}</Text>
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search by name or tags..."
        value={searchText}
        onChangeText={setSearchText}
        placeholderTextColor="#777"
      />
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </SafeAreaView>
  );
};

export default AllItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
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
