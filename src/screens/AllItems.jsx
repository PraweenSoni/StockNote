import { ScrollView, StyleSheet, Text, View } from 'react-native';

const AllItems = ({ data }) => {
  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.headingContainer}>
        <Text style={styles.headingTxt}>Items</Text>
        <Text style={styles.headingTxt}>Quantity</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {data.map((item) => (
          <View
            key={item.id}
            style={[
              styles.itemContainer,
              { backgroundColor: item.stock < 20 ? "#FFCCCC" : "#D7F68FFF" },
            ]}
          >
            <Text style={styles.itemTxt}>{item.name}</Text>
            <Text style={styles.itemTxt}>{item.stock}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AllItems;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures full height layout
    paddingVertical: 10,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc', // Separator line
    backgroundColor: '#f9f9f9', // Optional: Background for header
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
    fontSize: 14,
  },
});
