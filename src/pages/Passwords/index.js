import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useStorage from "../../hooks/useStorage";
import {PasswordItem} from "./component/passwordItem";


export function Passwords() {

    const [listPasswords, setListPasswords] = useState([])
    const focused = useIsFocused()
    const { getItem, removeItem } = useStorage()



    useEffect(() => {
        async function loadPasswords() {
            
            const passwords = await getItem('@pass')
            //console.log(passwords)
            setListPasswords(passwords)

        }
        loadPasswords()

    }, [focused])
    
    //Remover senha da lista;
    async function handleDeletePassword(item) {
        const passwords = await removeItem('@pass', item)
        setListPasswords(passwords)

    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}> 
                <Text style={styles.title}>
                    😎 Minhas Senhas ❤️
            </Text>    
            </View>





          
            <View style={styles.content}>
                <FlatList
                    style={{ flex: 1, paddingTop: 14 }}
                    data={listPasswords}
                    keyExtractor={ ( item ) => String(item)}
                    renderItem={({ item }) =>
                        <PasswordItem
                            data={item}
                            removePassword={ () => 
                                handleDeletePassword(item)
                            } /> } 
                            />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#392de9',
        paddingTop: 60,
        paddingBottom: 14,
        paddingLeft: 14,
        paddingRight: 14
    },
    title: {
        fontSize: 20,
        color: '#FFF',
        //fontWeight: 'bold',
        textAlign: 'center'
    },
    content: {
        flex: 1,
        paddingLeft: 14,
        paddingRight: 14,

    }
}) 