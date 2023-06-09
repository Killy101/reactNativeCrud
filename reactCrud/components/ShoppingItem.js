import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Pressable,
  TextInput,
  FlatList,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  ToastAndroid,
  ImageBackground
} from "react-native";

import { MaterialIcons, AntDesign, FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { db, collection, addDoc, deleteDoc, doc } from "../firebase/index";
import { getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
export default function List({ navigation }) {
  const [title, setTitle] = useState("");
  const [shopList, setShopList] = useState([]);
  const [search, setSearch] = useState("");
  const [searchItemData, setSearchItemData] = useState([]);
  useEffect(() => {
    const queryCollect = query(collection(db, "shopping"));

    if (search.length > 0) {
    } else {
      setSearchItemData("");
      const unsub = onSnapshot(queryCollect, (snap) => {
        snap.forEach((doc) => {
          setShopList(
            snap.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
      });
      return unsub;
    }
  }, [search]);

  //Add data
  const Item = async () => {
    if (title == "") {
      alert("Item is empty");
    } else {
      const q = query(collection(db, "shopping"), where("title", "==", title));

      const querySnap = await getDocs(q);

      if (querySnap.empty) {
        try {
          const docRef = await addDoc(collection(db, "shopping"), {
            title: title,
            isChecked: false,
          });
          alert("Item is added");
          setTitle("");
        } catch (e) {
          console.error("Error adding document: ", e);
        }

      } else {
        alert("Item is already in the list");
      }


    }
  };

  ///Delete the selected data
  const deletData = async (id) => {
    console.log(id);
    await deleteDoc(doc(db, "shopping", id)).then(() => {
      ToastAndroid.showWithGravity(
        "Item Deleted",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    });
  };

  //List use to search the data
  const searchItem = async () => {
    setSearchItemData("");

    const q = query(collection(db, "shopping"), where("title", "==", search));

    const querySnap = await getDocs(q);

    if (querySnap.empty) {
      alert("List is not found");
    } else {
      querySnap.forEach((doc) => {
        setSearchItemData(
          querySnap.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    }
  };

  return (
    <ImageBackground source={require('../assets/back.png')} style={styles.container}>
      <View style={styles.header}>
        {/*heading */}
        <Text style={styles.heading}>E-SHABU</Text>
        {/*no of shopping items */}
        <Text style={styles.noOfItems}>{shopList.length}</Text>
      </View>

      {/* Textbox to input the search item*/}
      <View
        style={{  
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#f0f2f5",
          borderRadius: 10,
          paddingLeft: 20,
        }}
      >
        <TextInput
          placeholder="Search item..."
          style={styles.search}
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        {/* When click will search the Item*/}
        <TouchableOpacity onPress={() => searchItem()}>
          <FontAwesome name="search"  size={25} color="pink" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={searchItemData.length ? searchItemData : shopList}
        renderItem={({ item }) => (
          <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#9c15c1", "#52dffb"]}
          style={{
            width: "100%",
            flexDirection: "row",
            marginTop: 20,
            padding: 20,
            borderRadius: 15,
          }}
        >
            {/* <View
              style={{
                backgroundColor: "#44d198",
                width: "100%",
                flexDirection: "row",
                marginTop: 20,
                padding: 20,
                borderRadius: 15,
              }}
            > */}
              <Text
                style={{
                  color: "black",
                  fontSize: 20,
                  flex: 1,
                }}
              >
                {item.data.title}
              </Text>
              <View style={{ flexDirection: "row-reverse", gap: 20 }}>
                <TouchableOpacity onPress={() => deletData(item.id)}>
                  <MaterialIcons name="delete" size={30} color="black" />
                </TouchableOpacity>

                {/* Use to update data*/}
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("UpdateData", {
                      id: item.id,
                      title: item.data.title,
                    })
                  }
                >
                  <AntDesign name="edit" size={24} color="black" />
                </TouchableOpacity>
              </View>
            {/* </View> */}
          </LinearGradient>
        )}
      />

  

      <View style={{flexDirection: "row", justifyContent: 'space-between'}}>

      <TextInput
        placeholder="Input an item"
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        onSubmitEditing={() => Item()}
      />
      <Pressable style={styles.button} onPress={Item}>
      <Text style={styles.buttonText}>Add</Text>
      </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",

    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  heading: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 500,
    flex: 1,
    color: 'violet',
  },
  marginTop: 20,
  noOfItems: {
    fontSize: 30,
    fontWeight: 500,
    color: 'pink',
  },
  input: {
    backgroundColor: "#f0f2f5",
    padding: 10,
    fontSize: 17,
    width: "75%",
    alignSelf: "center",
    borderRadius: 10,       
  },
  search: {
    backgroundColor: "#f0f2f5",
     padding: 10,

    fontSize: 17,
    width: "80%",
    alignSelf: "center",
  },
  button:{
    backgroundColor: "#0f7fb8",
    padding: 15,
    marginTop: 20,
    width: "20%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 15,
   
  },
  buttonText:{
    fontSize: 17,
    color: 'white',
    
  }
});