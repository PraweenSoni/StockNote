import {FlatList, StyleSheet, Text, View} from 'react-native';

const AllItems = ({data}) => {
  return (
    <View>
      <View style={styles.headingContainer}>
        <Text style={styles.headingTxt}>Items</Text>
        <Text style={styles.headingTxt}>Quantit</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={[styles.itemContainer, {backgroundColor: item.stock < 20 ? "#FFCCCC" : "#D7F68FFF"}]}>
            <Text style={styles.itemTxt}>{item.name}</Text>
            <Text style={styles.itemTxt}>{item.stock}</Text>
          </View>
        )}
        contentContainerStyle={{gap:10}}
      />
    </View>
  );
};

export default AllItems;

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical:10
},
headingTxt: {
    fontWeight: '500',
    fontSize: 16,
},
itemContainer:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius:7,
  },
  itemTxt:{

  }
});
