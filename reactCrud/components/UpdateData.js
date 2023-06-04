import { StyleSheet, Text, View, TextInput, ToastAndroid,Pressable , Alert} from "react-native";
import { db, doc, updateDoc } from "../firebase/index";
import { useEffect, useState } from "react";
export default function UpdateData({ route, navigation }) {
  const [title, setTitle] = useState("");

  const updateData = async (id) => {
    const updatedRef = doc(db, "shopping", id);

    await updateDoc(updatedRef, {
      title: title,
    }).then(() => {
      ToastAndroid.showWithGravity(
        "Item Updated",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      setTitle("");
      navigation.goBack();
    });
  };
  return (
    <View>
      <Text style={styles.text1}>Item Name: </Text>
      <Text style={styles.text2}>{route.params.title}</Text>
      <TextInput
        placeholder="Rename the Item"
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={() => updateData(route.params.id)}
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: 500,
    flex: 1,
  },
  noOfItems: {
    fontSize: 30,
    fontWeight: 500,
    marginRight: 20,
  },
  input: {
    backgroundColor: "#528fcc",
    padding: 10,
    fontSize: 17,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginTop: 50,
  },
  text1: {
    fontSize: 20,
    alignSelf: "center",
    marginTop: 25,
  },
  text2: {
    fontSize: 30,
    alignSelf: "center",
  },
});
