import { View, Text, Pressable, StyleSheet, ImageBackground } from "react-native";
import welcomebg from '../../../assets/welcomebg.png';


const WelcomeScreen = ({ navigation }) => {

  return (
    <ImageBackground source={welcomebg} style={styles.background} resizeMode="cover">
    <View style={styles.container}>
          
      <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.buttonText}>Signup</Text>
      </Pressable>
      </View>
      
    </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 80,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#A55591",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    width: '40%',
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    textAlign:'center',
  },
});


