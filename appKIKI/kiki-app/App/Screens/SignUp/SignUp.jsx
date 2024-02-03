import { View, Text, StyleSheet, Image,SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
        <Image 
            source={require('../../../assets/background-login.png')}
            style={styles.backgroundImage}
        />
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.formContainer}>
            <Text style={styles.textInput}>Full Name</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Name"
                    
            />
            <Text style={styles.textInput}>Email Address</Text>
            <TextInput 
                style={styles.input}
                placeholder="Email"
                
            />
            <Text style={styles.textInput}>Password</Text>
            <TextInput 
                style={styles.input}
                secureTextEntry
                placeholder="Password" 
            />
            <Text style={styles.textInput}>Repeat Password</Text>
            <TextInput 
                style={styles.input}
                secureTextEntry
                placeholder="Password" 
            />
            <TouchableOpacity style={styles.loginButton}>
                <Text 
                    style={styles.loginButtonText}
                    onPress={()=> navigation.navigate('Profile')}
                >
                    Sign Up
                </Text>

            </TouchableOpacity>
            <Text style={styles.welcomeText}>Or</Text>
              <View>
                <TouchableOpacity style={styles.iconContainer}>
                  <Image  source={require('../../../assets/google.png')}/>
                </TouchableOpacity>
              </View>
              <View >
                <Text style={styles.textoAccount}>
                    Already have an account?
                </Text>
                
              </View>
              <View >
                <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                  <Text style={styles.signUp}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
        </View>

        </SafeAreaView>
          
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center',     // Centra horizontalmente
        },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
  
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        marginLeft: 4,
        marginBottom: 30,
    },
    textInput: {
        color: 'white',
        marginLeft: 4,
        alignSelf: 'flex-start',
        fontWeight: 'bold', 
        marginBottom: 10,
    },
    textoAccount:{
        marginTop: 20,
    },
    input: {
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 20,
        marginBottom: 10,
        width: 300,
    },
    forgotPassword: {
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    signUp:{
        color: '#61BD91',
        fontWeight: 'bold',
    },
    forgotPasswordText: {
        color: 'white',
        fontWeight: 'bold',
    },
    loginButton: {
        padding: 15,
        backgroundColor: '#61BD91',
        borderRadius: 20,
        width: 300,
        alignItems: 'center',
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    welcomeText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
    },
    iconContainer: {
        padding: 4,
        backgroundColor: 'white', // Color de fondo gris claro
        borderRadius: 16, // Bordes redondeados
    },
});