import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import GlobalText from "./GlobalText";

const CatCards = ({ businessTasks, personalTasks }) => {
  const blueLineWidth = (businessTasks.perc * 250) / 100 || 0;
  const purpleLineWidth = (personalTasks.perc * 250) / 100 || 0;

  return (
    <View style={styles.catWrapper}>
      <Text style={styles.textMuted}>Categories</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.slider}
      >
        <View style={styles.catCard}>
          <GlobalText style={styles.cardSubTitle}>
            {businessTasks?.num === 1
              ? businessTasks?.num + " task"
              : businessTasks?.num + " tasks "}
          </GlobalText>
          <GlobalText style={styles.cardTitle}>Business</GlobalText>
          <View style={styles.line}>
            <View style={styles.colorLine}></View>
            <View style={[styles.blueLine, { width: blueLineWidth }]}></View>
          </View>
        </View>
        <View style={styles.catCard}>
          <GlobalText style={styles.cardSubTitle}>
            {personalTasks?.num === 1
              ? personalTasks?.num + " task"
              : personalTasks?.num + " tasks "}
          </GlobalText>
          <GlobalText style={styles.cardTitle}>Personal</GlobalText>
          <View style={styles.line}>
            <View style={styles.colorLine}></View>
            <View
              style={[styles.purpleLine, { width: purpleLineWidth }]}
            ></View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CatCards;

const styles = StyleSheet.create({
  textMuted: {
    fontSize: 18,
    color: "#d1d1d1",
    marginBottom: 20,
    textTransform: "uppercase",
  },
  catWrapper: {
    marginBottom: 30,
  },

  catCard: {
    width: 280,
    paddingHorizontal: 15,
    paddingVertical: 25,
    borderRadius: 20,
    backgroundColor: "#041955",
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  cardSubTitle: {
    fontSize: 18,
    color: "#d1d1d1",
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 27,
    color: "#fff",
    marginBottom: 15,
  },

  line: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#d1d1d1",
    height: 3,
  },

  blueLine: {
    height: 5,
    backgroundColor: "#237BFF",
    borderRadius: 2,
  },
  purpleLine: {
    height: 5,
    backgroundColor: "#9D0CC0",
    borderRadius: 2,
  },
});
