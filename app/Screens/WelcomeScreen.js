import { StyleSheet, Text, View,TouchableOpacity, SafeAreaView, ImageBackground, Image, Button, Touchable } from 'react-native'
import React, {useEffect} from 'react'
import { useNavigation } from 'expo-router';


const WelcomeScreen = ({navigation}) => {

    // const navigate = useNavigation()
    useEffect(() => {
      setTimeout(() => {
        navigation.navigate('signup');
      }, 4000); 
    }, []);

  return (
    <View style={{backgroundColor: '#df8610', width: '100%', height: '100%'}}>
     <Image source={require('../assets/logo-bigbite.png')} style={{width: '70%', height: '60%', display: 'flex', justifyContent: 'center', alignSelf: 'center', marginTop: '35%'}}></Image>
    </View>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    loginBtn:{
        color:'#f2d15e',
        fontSize: 22,
        borderColor: 'black',
        borderWidth: 2 ,
        borderRadius : 10,
        padding: '4%',
        justifyContent: 'center',
        alignSelf: 'center'
    },
})
