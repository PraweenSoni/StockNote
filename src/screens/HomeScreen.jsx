import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllItems from './AllItems';
import CreateScreen from './CreateScreen';
import SettingIcon from '../../assets/icons/SettingIcon';

const HomeScreen = () => {
  const [view, setview] = useState(0);
  const [data, setdata] = useState([]);
    // Load data from AsyncStorage on mount
    const fetchData = async () => {
      const storedData = await AsyncStorage.getItem('stockData');
      setdata(storedData ? JSON.parse(storedData) : []);
    };
    useEffect(() => {
      fetchData();
    }, []);
  
    // Update AsyncStorage whenever data changes
    useEffect(() => {
      fetchData();
    }, [view]);

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between', borderWidth:1, borderColor:'#fff'}}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.title}>
          <SettingIcon style={styles.Sicon}/>
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          style={[
            styles.btn,
            view === 0 ? {backgroundColor: '#72C37AFF'} : null,
          ]}
          onPress={() => setview(0)}>
          <Text style={[styles.btnTxt, view === 0 ? {color: '#fff'} : null]}>
            All Items
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.btn,
            view === 1 ? {backgroundColor: '#72C37AFF'} : null,
          ]}
          onPress={() => setview(1)}>
          <Text style={[styles.btnTxt, view === 1 ? {color: '#fff'} : null]}>
            Low Stock
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.btn,
            view === 2 ? {backgroundColor: '#72C37AFF'} : null,
          ]}
          onPress={() => setview(2)}>
          <Text style={[styles.btnTxt, view === 2 ? {color: '#fff'} : null]}>
            Create Item
          </Text>
        </Pressable>
      </View>

      {view === 0 && <AllItems data={data} />}
      {view === 1 && <AllItems data={data} lowStockOnly/>}
      {view === 2 && <CreateScreen data={data} setdata={setdata} />}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: '4%',
    backgroundColor: '#ffffff',
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  Sicon:{
    height:25,
    width:25
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
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
});