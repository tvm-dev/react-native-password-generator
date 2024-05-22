import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
  } from "react-native";
  import Slider from "@react-native-community/slider";
import { useState } from "react";
  import { ModalPassword } from '../../components/modal'
  
  let charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  
  export function Home() {
    const [size, setSize] = useState(10);
    const [passwordValue, setpasswordValue] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
  
    //gerando a funcao da para gerar a senha:
    function generatePassword() {
      //console.log('Clicouuuu')
      let password = "";
      for (let i = 0, n = charset.length; i < size; i++) {
        password += charset.charAt(Math.floor(Math.random() * n));
      }
      //console.log(password)
      setpasswordValue(password);
      setModalVisible(true);
    }
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={ require('../../assets/images/logo.png') }
        />
  
        <Text style={styles.title}>{size} Caracteres</Text>
  
        <View style={styles.area}>
          <Slider
            style={{ height: 50 }}
            minimumValue={6}
            maximumValue={20}
            maximumTrackTintColor="#FF0000"
            minimumTrackTintColor="#000"
            thumbTintColor="#392ed9"
            value={size}
            onValueChange={(value) => setSize(value.toFixed(0))}
          />
        </View>
  
        <TouchableOpacity style={styles.button} onPress={generatePassword}>
          <Text style={styles.buttonText}>Gerar Senha</Text>
        </TouchableOpacity>
  
        <Modal visible={modalVisible} animationType="fade" transparent={true}>
          <ModalPassword
            password={passwordValue}
            handleClose={ () => setModalVisible(false)}
          />
        </Modal>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F3F3F3",
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      marginBottom: 60,
    },
    area: {
      marginTop: 14,
      marginBottom: 14,
      width: "80%",
      backgroundColor: "#fff",
      padding: 8,
      borderRadius: 40,
    },
    button: {
      backgroundColor: "#392de9",
      width: "80%",
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      marginBottom: 30,
    },
    buttonText: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "bold",
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
    },
  });
  