import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';

const CreateScreen = ({data, setdata}) => {
  const [itemName, setitemName] = useState('');
  const [stockAmt, setstockAmt] = useState('');
  const [stockMinAmt, setstockMinAmt] = useState('');
  const [isEdit, setisEdit] = useState(false);
  const [editItemId, seteditItemId] = useState(null);

  // Dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Select Category');
  const categories = ['Gram', 'KG', 'ML', 'Litre', 'Pieces', 'Custom'];

  const addItem = () => {
    if (selectedCategory === 'Select Category') {
      alert('select category!');
      return;
    }
    const newItem = {
      id: Date.now(),
      name: itemName,
      stock: stockAmt,
      stockMin : stockMinAmt,
      category: selectedCategory,
    };
    setdata([...data, newItem]);
    setitemName('');
    setstockAmt('');
    setstockMinAmt('');
    setSelectedCategory('Select Category');
    setisEdit(false);
  };

  const editItem = item => {
    setisEdit(true);
    setitemName(item.name);
    seteditItemId(item.id);
    setstockAmt(item.stock);
    setstockMinAmt(item.stockMin);
    setSelectedCategory(item.category);
  };

  const updateItem = () => {
    setdata(
      data.map(item =>
        item.id === editItemId
          ? {
              ...item,
              name: itemName,
              stock: stockAmt,
              stockMin: stockMinAmt,
              category: selectedCategory,
            }
          : item,
      ),
    );
    setitemName('');
    setstockAmt('');
    setstockMinAmt('');
    setSelectedCategory('Select Category');
    setisEdit(false);
  };

  const deleteItem = id => {
    setdata(data.filter(item => item.id !== id));
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <TextInput
          placeholder="Enter an item name..."
          placeholderTextColor="#999"
          style={styles.input}
          value={itemName}
          onChangeText={item => setitemName(item)}
        />
        <View style={{flexDirection: 'row'}}>
          <TextInput
            placeholder="Item Qty"
            placeholderTextColor="#999"
            style={[styles.input, styles.inputAmt]}
            keyboardType="numeric"
            value={stockAmt}
            onChangeText={item => setstockAmt(item)}
          />
          <TextInput
            placeholder="Min Qty"
            placeholderTextColor="#999"
            style={[styles.input, styles.inputAmt]}
            keyboardType="numeric"
            value={stockMinAmt}
            onChangeText={item => setstockMinAmt(item)}
          />
          <View>
            {/* Dropdown Implementation */}
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Text style={styles.dropdownButtonText}>{selectedCategory}</Text>
            </TouchableOpacity>
            {isDropdownOpen && (
              <View style={styles.dropdown}>
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownItem}
                    onPress={() => {
                      setSelectedCategory(category);
                      setIsDropdownOpen(false);
                    }}>
                    <Text style={styles.dropdownItemText}>{category}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
        
        </View>
        <Pressable
          style={styles.stockBtn}
          onPress={() => (isEdit ? updateItem() : addItem())}>
          <Text style={styles.btnTxt}>
            {isEdit ? 'EDIT' : 'ADD'} ITEM IN STOCK
          </Text>
        </Pressable>

        <View style={{flex: 1}}>
          <View style={{marginBottom:5}}>
            <Text style={{fontSize:16, marginBottom:10}}>All items in the stocks</Text>
            <View style={styles.headingTxtDiv}>
              <Text style={styles.headingTxt}>Items Name</Text>
              <View style={{flexDirection:'row'}}>
                <Text style={{paddingEnd:'8%'}}>Min QTY</Text>
                <Text>QTY</Text>
              </View>
            </View>
          </View>

          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View
                style={[
                  styles.itemContainer,
                  {backgroundColor: item.stock > item.stockMin ? '#D7F68FFF' : '#FFCCCC'}
                ]}>
                <Text style={styles.itemTxt}>{item.name}</Text>
                <View style={{flexDirection: 'row', gap: 15}}>
                  <Text style={styles.itemTxt}>
                    {item.stockMin} {item.category}
                  </Text>
                  <Text style={styles.itemTxt}>
                    {item.stock} {item.category}
                  </Text>
                  <Pressable onPress={() => editItem(item)}>
                    <Text style={styles.itemTxt}>Edit</Text>
                  </Pressable>
                  <Pressable onPress={() => deleteItem(item.id)}>
                    <Text style={styles.itemTxt}>Delete</Text>
                  </Pressable>
                </View>
              </View>
            )}
            contentContainerStyle={{gap: 10, paddingBottom: 10}}
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
    fontSize:16,
    borderRadius: 7,
  },
  inputAmt: {
    width: '28%',
    maxHeight: 45,
    marginEnd: '3%',
  },
  dropdownButton: {
    borderWidth: 1.5,
    borderColor: '#999',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
    backgroundColor: '#f9f9f9',
    width: '120',
  },
  dropdownButtonText: {
    fontSize: 14,
    color: '#333',
  },
  dropdown: {
    borderWidth: 1.5,
    borderColor: '#999',
    borderRadius: 7,
    marginTop: 5,
    backgroundColor: '#fff',
  },
  dropdownItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownItemText: {
    fontSize: 14,
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
  headingTxtDiv:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'68%',
    paddingStart:'3%'
  },
  headingTxt: {
    fontWeight: '500',
    fontSize: 14,
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
