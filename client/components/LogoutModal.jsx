import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Modal,
  TouchableOpacity,
} from "react-native";
import { CurrentUserContext } from "../contextApi/currentUserContext";
import GlobalText from "./GlobalText";

const LogoutModal = ({ showLogoutModal, setShowLogoutModal, navigation }) => {
  const { setCurrentUser, currentUser } = useContext(CurrentUserContext);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("currentUser");
      setCurrentUser(null);
      setShowLogoutModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal transparent={true} visible={showLogoutModal} animationType="fade">
      <View style={styles.transparentBg} />
      <View style={styles.wrapper}>
        <GlobalText style={styles.title}>
          Are you sure you want to log out?
        </GlobalText>
        <View style={styles.buttonsWrapper}>
          <TouchableOpacity
            onPress={() => setShowLogoutModal(false)}
            style={styles.button}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "500" }}>
              Canel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#9D0CC0" }]}
          >
            <Text
              onPress={handleLogout}
              style={{ color: "white", fontSize: 18, fontWeight: "500" }}
            >
              Logout
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

  title: {
    fontSize: 20,
    color: "white",
  },

  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    height: 200,
    backgroundColor: "#031956",
    position: "absolute",
    bottom: 0,
    zIndex: 2,
    width: "100%",
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
    backgroundColor: "#3B7FE7",
    alignItems: "center",
  },
});

export default LogoutModal;
