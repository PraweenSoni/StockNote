import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useState } from 'react';

const CreateScreen = ({ data, setdata }) => {
  const [itemName, setitemName] = useState('');
  const [stockAmt, setstockAmt] = useState('');
  const [isEdit, setisEdit] = useState(false);
  const [editItemId, seteditItemId] = useState(null);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: itemName,
      stock: stockAmt,
    };
    setdata([...data, newItem]);
    setitemName('');
    setstockAmt('');
    setisEdit(false);
  };

  const editItem = (item) => {
    setisEdit(true);
    setitemName(item.name);
    seteditItemId(item.id);
    setstockAmt(item.stock);
  };

  const updateItem = () => {
    setdata(
      data.map((item) =>
        item.id === editItemId ? { ...item, name: itemName, stock: stockAmt } : item
      )
    );
    setitemName('');
    setstockAmt('');
    setisEdit(false);
  };

  const deleteItem = (id) => {
    setdata(data.filter((item) => item.id !== id));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <TextInput
          placeholder="Enter an item name..."
          placeholderTextColor="#999"
          style={styles.input}
          value={itemName}
          onChangeText={(item) => setitemName(item)}
        />
        <TextInput
          placeholder="Enter an item amount..."
          placeholderTextColor="#999"
          style={styles.input}
          value={stockAmt}
          onChangeText={(item) => setstockAmt(item)}
        />
        <Pressable
          style={styles.stockBtn}
          onPress={() => (isEdit ? updateItem() : addItem())}
        >
          <Text style={styles.btnTxt}>{isEdit ? 'EDIT' : 'ADD'} ITEM IN STOCK</Text>
        </Pressable>

        <View style={{ marginTop: 10, flex: 1 }}>
          <View style={styles.headingContainer}>
            <Text style={styles.headingTxt}>All items in the stocks</Text>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.itemContainer,
                  { backgroundColor: item.stock < 20 ? '#FFCCCC' : '#D7F68FFF' },
                ]}
              >
                <Text style={styles.itemTxt}>{item.name}</Text>
                <View style={{ flexDirection: 'row', gap: 15 }}>
                  <Text style={styles.itemTxt}>{item.stock}</Text>
                  <Pressable onPress={() => editItem(item)}>
                    <Text style={styles.itemTxt}>Edit</Text>
                  </Pressable>
                  <Pressable onPress={() => deleteItem(item.id)}>
                    <Text style={styles.itemTxt}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            )}
            contentContainerStyle={{ gap:10, paddingBottom: 10 }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '4%',
    paddingHorizontal: 10,
    gap: 10,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#999',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
  },
  stockBtn: {
    backgroundColor: '#66FFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontWeight: '500',
    fontSize: 14,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headingTxt: {
    fontWeight: '500',
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
  },
  itemTxt: {
    fontSize: 14,
  },
});
