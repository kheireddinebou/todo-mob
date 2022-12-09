import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import GlobalText from "../components/GlobalText";
import Icon from "react-native-vector-icons/Entypo";
import IconMaterial from "react-native-vector-icons/MaterialIcons";
import CatCards from "../components/CatCards";
import LogoutModal from "../components/LogoutModal";
import AddModal from "../components/AddModal";
import { BASE_URL, publicRequest, userRequest } from "../requestMethodes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CurrentUserContext } from "../contextApi/currentUserContext";
import axios from "axios";

const Home = ({ navigation }) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [userTasks, setUserTasks] = useState(null);
  const [businessTasks, setBusinessTasks] = useState({
    perc: 0,
    num: 0,
  });
  const [personalTasks, setPersonalTasks] = useState({
    perc: 0,
    num: 0,
  });
  const { currentUser } = useContext(CurrentUserContext);

  const getTasks = async () => {
    try {
      const res = await axios
        .create({
          baseURL: BASE_URL,
          headers: {
            token: `Bearer ${currentUser.accessToken}`,
          },
        })
        .get(`task/${currentUser._id}`);
      setUserTasks(res.data);

      res.data && filterTasks(res.data);
    } catch (err) {}
  };

  const filterTasks = tasks => {
    const persTasksLength = tasks.filter(t => t.category === "personal").length;
    const busiTasksLength = tasks.filter(t => t.category === "business").length;

    setPersonalTasks({
      perc: (persTasksLength / tasks.length) * 100,
      num: persTasksLength,
    });
    setBusinessTasks({
      perc: (busiTasksLength / tasks.length) * 100,
      num: busiTasksLength,
    });
  };

  useEffect(() => {
    getTasks();
  }, [showAddModal, currentUser, userTasks]);

  return (
    <>
      <LogoutModal
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
        navigation={navigation}
      />
      <AddModal showAddModal={showAddModal} setShowAddModal={setShowAddModal} />
      <StatusBar />
      <View style={styles.container}>
        <View style={styles.topRow}>
          <GlobalText style={styles.title}>
            What's up,{" "}
            <GlobalText style={{ textTransform: "capitalize" }}>
              {currentUser.name} !
            </GlobalText>
          </GlobalText>

          <TouchableOpacity
            onPress={() => setShowLogoutModal(true)}
            style={styles.logoutBtn}
          >
            <IconMaterial name="logout" color="white" size={35} />
          </TouchableOpacity>
        </View>

        <CatCards businessTasks={businessTasks} personalTasks={personalTasks} />

        <View style={styles.tasksWrapper}>
          <GlobalText style={styles.textMuted}>Tasks</GlobalText>
          <View style={styles.listWrapper}>
            <FlatList
              data={userTasks}
              renderItem={itemData => (
                <TaskCard
                  setUserTasks={setUserTasks}
                  userTasks={userTasks}
                  task={itemData.item}
                />
              )}
              keyExtractor={item => item._id}
            />
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => setShowAddModal(true)}
        style={styles.addBtn}
      >
        <Icon name="plus" color="white" size={30} />
      </TouchableOpacity>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#344FA1",
    padding: 16,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 28,
    color: "white",
    fontWeight: "600",
    marginBottom: 25,
    marginTop: 20,
  },

  textMuted: {
    fontSize: 18,
    color: "#d1d1d1",
    marginBottom: 20,
    textTransform: "uppercase",
  },

  tasksWrapper: {
    marginBottom: 40,
    flex: 1,
  },

  addBtn: {
    backgroundColor: "#9D0CC0",
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 2,
  },
});
