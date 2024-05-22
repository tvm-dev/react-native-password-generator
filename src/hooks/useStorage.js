import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
    //Buscar item salvos:
    const getItem = async (key) => {

        try {
            const passwords = await AsyncStorage.getItem(key)
            return JSON.parse(passwords) || []

        } catch (error) {
            console.log("Erro ao buscar", error)
            return []
        }
    }

//Salvar item no storage:
    const saveItem = async (key, value) => {

        try {
            //Buscando itens salvos:
            let passwords = await getItem(key)
            //Adicionando na lista
            passwords.push(value)
            //Salvando no async Storage:
            await AsyncStorage.setItem(key, JSON.stringify(passwords))
            
        } catch (error) {
            console.log('Erro ao Salvar', error)
        }
    }
    //Buscar item salvos:
    const removeItem = async (key, item) => {

        try {
             //Buscando itens salvos:
            let passwords = await getItem(key, item);
            //filtrando senha para excluí-la:
            let myPasswords = passwords.filter((password) =>  {
    return (password !== item)
    
})
//Atualizando a lista de senhas:
await AsyncStorage.setItem(key, JSON.stringify(myPasswords))
            return myPasswords

            
        } catch (error) {
            console.log('Erro ao deletar', error)
        }
    }

    return {
        getItem,
        saveItem,
        removeItem
    }
    


}

export default useStorage;