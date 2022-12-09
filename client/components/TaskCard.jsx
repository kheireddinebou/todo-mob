import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import EntypoIcon from "react-native-vector-icons/Entypo";
import GlobalText from "./GlobalText";
import axios from "axios";
import { BASE_URL } from "../requestMethodes";
import { CurrentUserContext } from "../contextApi/currentUserContext";

const TaskCard = ({ task, setUserTasks, userTasks }) => {
  const [checked, setChecked] = useState(task.checked || false);
  const catColor = task.category === "business" ? "#237BFF" : "#9D0CC0";
  const { currentUser } = useContext(CurrentUserContext);

  const deleteTask = async () => {
    try {
      const res = await axios
        .create({
          baseURL: BASE_URL,
          headers: {
            token: `Bearer ${currentUser.accessToken}`,
          },
        })
        .delete(`task/${currentUser._id}`, { data: { id: task._id } });
      setUserTasks(userTasks);
    } catch (err) {}
  };

  const checkTask = async newValue => {
    setChecked(newValue);
    try {
       await axios
        .create({
          baseURL: BASE_URL,
          headers: {
            token: `Bearer ${currentUser.accessToken}`,
          },
        })
        .put(`task/${currentUser._id}`, { _id: task._id, checked: newValue });
    } catch (err) {}
  };

  return (
    <View style={styles.taskCard}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TouchableHighlight
          onPress={() => checkTask(!checked)}
          style={[
            styles.circle,
            {
              borderColor: catColor,
              backgroundColor: checked ? catColor : "transparent",
            },
          ]}
        >
          {checked ? (
            <EntypoIcon color="white" name="check" size={22} />
          ) : (
            <View />
          )}
        </TouchableHighlight>
        <GlobalText
          style={[
            styles.cardTitle,
            {
              textDecorationLine: checked ? "line-through" : "none",
            },
          ]}
        >
          {task.title}
        </GlobalText>
      </View>

      {checked ? (
        <TouchableOpacity onPress={deleteTask}>
          <Icon name="md-trash-bin" color={catColor} size={30} />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: "#041955",
    marginBottom: 10,
    flexDirection: "row",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "space-between",
  },

  circle: {
    width: 40,
    height: 40,
    borderWidth: 3,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  cardTitle: {
    color: "white",
    fontSize: 16,
  },
});

export default TaskCard;
