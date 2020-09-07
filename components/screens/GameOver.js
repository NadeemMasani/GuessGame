import React from 'react';
import {View,StyleSheet,Text, Button, Image} from 'react-native';
import MainButton from '../MainButton';

const GameOver = props => {
        return (
            <View style = {styles.screen}>
                <Text>
                    The Game is Over!!!!
                </Text>
                <View style = {styles.imageContainer}>
                <Image  
                    style = {styles.image} 
                    source = { require('../../assets/success.png')}
                    resizeMode ="cover"
                />
                </View>
                <Text>
                    Number of Rounds : {props.roundsNumber}
                </Text>
                <Text>
                    Number was : {props.userNUmber}
                </Text>
                <MainButton onPress ={props.onRestart}>New Game</MainButton>
            </View>
        );
};

const styles = StyleSheet.create({
    screen : {
        flex: 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    image :{
        width : '100%',
        height : '100%'

    },
    imageContainer :{
        borderRadius : 250,
        borderWidth : 3,
        borderColor : 'black',
        width :300,
        height : 300,
        overflow : 'hidden'

    }
});

export default GameOver;