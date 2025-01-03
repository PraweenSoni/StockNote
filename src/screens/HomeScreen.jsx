import {Pressable, StyleSheet, Text, View} from 'react-native';
import AllItems from './AllItems';
import CreateScreen from './CreateScreen';
import {useState} from 'react';

const HomeScreen = () => {
  const [view, setview] = useState(0);
  const [data, setdata] = useState([]);

  return (
    <View style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between', borderWidth:1, borderColor:'#fff'}}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.title}>setting</Text>
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
      {view === 1 && <AllItems data={data.filter(item => item.stock < item.stockMin)} />}
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
