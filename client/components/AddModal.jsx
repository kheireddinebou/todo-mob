import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import GlobalText from "./GlobalText";
import Icon from "react-native-vector-icons/Entypo";
import { CurrentUserContext } from "../contextApi/currentUserContext";
import axios from "axios";
import { BASE_URL } from "../requestMethodes";

const AddModal = ({ showAddModal, setShowAddModal }) => {
  const [textInput, setTextInput] = useState("");
  const [category, setCategory] = useState("");
  const [err, setErr] = useState(null);
  const { currentUser } = useContext(CurrentUserContext);

  const isChecked = cat => {
    return cat === category;
  };

  const handleAdd = async () => {
    // check inputs
    if (textInput.trim().length < 1) {
      setErr({ type: "text", message: "task must be at least 1 character" });
    } else if (category === "") {
      setErr({ type: "category", message: "you must select a category" });
    } else {
      try {
        const res = await axios
          .create({
            baseURL: BASE_URL,
            headers: {
              token: `Bearer ${currentUser.accessToken}`,
            },
          })
          .post(`task/${currentUser._id}`, {
            userId: currentUser._id,
            title: textInput,
            category,
          });

        res && setShowAddModal(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    setCategory("");
    setTextInput("");
  }, [showAddModal]);

  return (
    <Modal transparent={true} visible={showAddModal} animationType="fade">
      <View style={styles.transparentBg} />
      <View style={styles.wrapper}>
        <GlobalText style={styles.title}>Add New Task</GlobalText>
        <TextInput
          multiline={true}
          numberOfLines={2}
          maxLength={50}
          autoFocus={true}
          style={styles.input}
          placeholder="Task"
          value={textInput}
          onChangeText={text => setTextInput(text)}
        />
        <GlobalText style={styles.counter}>{textInput.length}/50</GlobalText>

        {err?.type === "text" && (
          <GlobalText style={{ color: "orange" }}>{err.message}</GlobalText>
        )}

        <GlobalText style={styles.category}>Category</GlobalText>

        <View style={styles.checkRow}>
          <View style={styles.catType}>
            <TouchableHighlight
              onPress={() => setCategory("business")}
              style={[
                styles.blueCircle,
                {
                  backgroundColor: isChecked("business")
                    ? "#3B7FE7"
                    : "transparent",
                },
              ]}
            >
              {isChecked("business") ? (
                <Icon color="white" name="check" size={16} />
              ) : (
                <View />
              )}
            </TouchableHighlight>
            <GlobalText style={styles.cardTitle}>Business</GlobalText>
          </View>

          <View style={styles.catType}>
            <TouchableHighlight
              onPress={() => setCategory("personal")}
              style={[
                styles.purpleCircle,
                {
                  backgroundColor: isChecked("personal")
                    ? "#9D0CC0"
                    : "transparent",
                },
              ]}
            >
              {isChecked("personal") ? (
                <Icon color="white" name="check" size={16} />
              ) : (
                <View />
              )}
            </TouchableHighlight>
            <GlobalText style={styles.cardTitle}>Personal</GlobalText>
          </View>
        </View>

        {err?.type === "category" && (
          <GlobalText style={{ color: "orange" }}>{err.message}</GlobalText>
        )}

        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            onPress={() => setShowAddModal(false)}
            style={styles.button}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
              Canel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#3B7FE7" }]}
            onPress={handleAdd}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
              Add
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  transparentBg: {
    flex: 1,
    backgroundColor: "#000",
    opacity: 0.7,
  },

  catType: {
    flexDirection: "row",
    padding: 5,
    paddingBottom: 20,
    alignItems: "center",
  },

  checkRow: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  purpleCircle: {
    width: 25,
    height: 25,
    borderColor: "#9D0CC0",
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  blueCircle: {
    width: 25,
    height: 25,
    borderColor: "#237BFF",
    borderWidth: 2,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  cardTitle: {
    color: "white",
    fontSize: 16,
  },

  title: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
  },

  counter: {
    alignSelf: "flex-start",
    color: "#d1d1d1",
    padding: 7,
  },

  category: {
    alignSelf: "flex-start",
    color: "#d1d1d1",
    padding: 7,
    fontSize: 18,
  },

  input: {
    backgroundColor: "white",
    color: "black",
    fontSize: 18,
    alignSelf: "stretch",
    borderRadius: 10,
    padding: 5,
  },

  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#031956",
    position: "absolute",
    bottom: 0,
    zIndex: 2,
    width: "100%",
    padding: 30,
  },

  buttonsWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginTop: 15,
  },

  button: {
    padding: 13,
    borderRadius: 12,
    color: "white",
    width: "45%",
    backgroundColor: "#9D0CC0",
    alignItems: "center",
  },
});

export default AddModal;
