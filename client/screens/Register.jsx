import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import GlobalText from "../components/GlobalText";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../validateInput";
import { publicRequest } from "../requestMethodes";

const Register = ({ navigation }) => {
  const [formInput, setFormInput] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const handleCHange = (text, name) => {
    setFormInput({ ...formInput, [name]: text });
  };

  const handleSubmit = async () => {
    setErr(null);
    //  check inputs value
    if (!validateName(formInput.name)) {
      setErr({ type: "name", message: "name must be at least 4 characters" });
    } else if (!validateEmail(formInput.email)) {
      setErr({ type: "email", message: "incorrect email" });
    } else if (!validatePassword(formInput.password)) {
      setErr({
        type: "password",
        message: "password must be at least 6 characters",
      });
    } else {
      setLoading(true);
      try {
        const res = await publicRequest.post("auth/register", formInput);
        res && navigation.navigate("Login");
      } catch (err) {
        setErr(err.response.data);
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        textContentType="name"
        placeholder="Name"
        onChangeText={text => handleCHange(text, "name")}
      />
      {err?.type === "name" && (
        <GlobalText style={{ color: "orange" }}>{err.message}</GlobalText>
      )}
      <TextInput
        style={styles.input}
        autoCompleteType="email"
        keyboardType="email-address"
        textContentType="emailAddress"
        placeholder="Email"
        onChangeText={text => handleCHange(text, "email")}
      />
      {err?.type === "email" && (
        <GlobalText style={{ color: "orange" }}>{err.message}</GlobalText>
      )}
      <TextInput
        style={styles.input}
        secureTextEntry
        autoCompleteType="password"
        placeholder="Password"
        autoFocus={true}
        onChangeText={text => handleCHange(text, "password")}
      />
      {err?.type === "password" && (
        <GlobalText style={{ color: "orange" }}>{err.message}</GlobalText>
      )}
      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.button, { opacity: loading ? 0.5 : 1 }]}
      >
        <GlobalText style={styles.btnText}>Create account</GlobalText>
      </TouchableOpacity>

      {!loading && (
        <GlobalText style={styles.createText}>
          You have an account{" "}
          <GlobalText
            onPress={() => navigation.navigate("Login")}
            style={styles.link}
          >
            Login to your account
          </GlobalText>
        </GlobalText>
      )}
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#344FA1",
    padding: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    alignSelf: "stretch",
    borderColor: "#cccccc",
    borderWidth: 1,
    padding: 10,
    color: "black",
    fontSize: 18,
    backgroundColor: "white",
    marginBottom: 10,
  },

  button: {
    alignSelf: "stretch",
    backgroundColor: "#031956",
    padding: 15,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },

  createText: {
    color: "white",
    marginTop: 10,
    fontSize: 17,
    textAlign: "center",
  },

  link: {
    color: "#031956",
    textDecorationLine: "underline",
  },
});
