import { Pressable, StyleSheet, Text, View } from 'react-native'
import AllItems from './AllItems';
import CreateScreen from './CreateScreen';
import { useState } from 'react';

const HomeScreen = () => {
  const [view, setview] = useState(0);
  const [data, setdata] = useState([
    {id:1, name: "orange", stock: 5, unit : "kg"},
    {id:2, name: "orange", stock: 15, unit : "kg"},
    {id:3, name: "orange", stock: 25, unit : "kg"},
    {id:4, name: "orange", stock: 5, unit : "kg"},
    {id:5, name: "orange", stock: 35, unit : "kg"},
    {id:6, name: "orange", stock: 25, unit : "kg"},
    {id:7, name: "cd", stock: 5, unit : "kg"},
    {id:8, name: "DSc", stock: 15, unit : "kg"},
    {id:9, name: "Dj", stock: 25, unit : "kg"},
    {id:10, name: "nan", stock: 5, unit : "kg"},
    {id:11, name: "magi", stock: 35, unit : "kg"},
    {id:12, name: "Manh", stock: 25, unit : "kg"},
    {id:13, name: "Pks", stock: 15, unit : "kg"},
    {id:14, name: "Dj", stock: 25, unit : "kg"},
    {id:15, name: "Raj", stock: 5, unit : "kg"},
    {id:16, name: "magi", stock: 35, unit : "kg"},
    {id:17, name: "Manh", stock: 25, unit : "kg"},
])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.btnContainer}>
        <Pressable style={[styles.btn, view === 0 ? {backgroundColor:"#72C37AFF"}:null]} onPress={()=>setview(0)}>
            <Text style={[styles.btnTxt, view === 0 ? {color:"#fff"}:null]}>All Items</Text>
        </Pressable>
        <Pressable style={[styles.btn, view === 1 ? {backgroundColor:"#72C37AFF"}:null]} onPress={()=>setview(1)}>
            <Text style={[styles.btnTxt, view === 1 ? {color:"#fff"}:null]}>Low Stock</Text>
        </Pressable>
        <Pressable style={[styles.btn, view === 2 ? {backgroundColor:"#72C37AFF"}:null]} onPress={()=>setview(2)}>
            <Text style={[styles.btnTxt, view === 2 ? {color:"#fff"}:null]}>Create Item</Text>
        </Pressable>
      </View>

      {view === 0 && <AllItems data={data}/>}
      {view === 1 && <AllItems data={data.filter((item)=> item.stock<20)}/>}
      {view === 2 && <CreateScreen data={data} setdata={setdata}/>}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        padding:"4%",
        backgroundColor:"#ffffff"
    },

    title:{
        fontSize:24,
        fontWeight:"bold",
        color:"#333"
    },
    btnContainer:{
        flexDirection:"row",
        gap:10,
        marginVertical:10
    },
    btn:{
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:50,
        borderWidth:1,
        borderColor:"#72C37AFF"
    },
    btnTxt:{
        color:"green",
        fontSize:12
    }
})