import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import EditIcon from '../../assets/icons/EditIcon';

const AllItems = ({ data }) => {
  const editItem = () => {
    alert('Currently Feature not avaliable.');
  }
  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.headingContainer}>
        <Text style={styles.headingTxt}>Items</Text>
        <View style={{flexDirection:'row', gap:15}}>
          <Text style={styles.headingTxt}>AMT</Text>
          <Text style={styles.headingTxt}>QTY</Text>
          <Text style={styles.headingTxt}>EDT</Text>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data.map((item) => (
          <View
            key={item.id}
            style={[
              styles.itemContainer,
              { backgroundColor: item.stock > item.stockMin ? '#D7F68FFF' : '#FFCCCC' },
            ]}
          >
            <Text style={styles.itemTxt}>{item.name}</Text>
            <View style={{flexDirection:'row', gap:15}}>
              <Text style={styles.itemTxt}>{item.amount} Rs</Text>
              <Text style={styles.itemTxt}>{item.stock} {item.category}</Text>
              <Pressable onPress={editItem}>
                <EditIcon style={styles.icon} fill="#1167b1" />
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AllItems;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  headingTxt: {
    fontWeight: '500',
    fontSize: 16,
  },
  scrollContainer: {
    paddingVertical: 10,
    gap: 10, // Space between items
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 7,
  },
  itemTxt: {
    fontSize: 16,
  },
  icon:{
    height:20,
    width:20
  }
});
