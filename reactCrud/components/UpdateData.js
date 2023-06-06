import { StyleSheet, Text, View, TextInput, ToastAndroid,Pressable , Alert, ImageBackground, TouchableOpacity} from "react-native";
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
    <ImageBackground style={{flex: 1, width: '100%', alignContent: "center"}} source={require('../assets/back.png')}>
      <View style={{paddingTop: 20}}>

      <Text style={styles.text1}>Item Name: </Text>
      <Text style={styles.text2}>{route.params.title}</Text>
      </View>

      <TextInput
        placeholder="Rename the Item"
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        // onSubmitEditing={() => updateData(route.params.id)}
      />

      <TouchableOpacity style={{justifyContent: 'center'}}>

        <Text style={{backgroundColor: 'blue', width: '89%', marginTop: 10,  paddingHorizontal: 20, marginLeft: 20, paddingVertical: 15, borderRadius: 10, color: 'white'}}
        onPress={() => updateData(route.params.id)}
        >
          Update
        </Text>
      </TouchableOpacity>
      
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "",
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
    backgroundColor: "#ededed",
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
fontWeight: "bold"
  },
  text2: {
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "bold",
    color: 'violet',
  },
});
