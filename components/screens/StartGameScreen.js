import React, {useState} from 'react';
import {View,Text,StyleSheet, TouchableWithoutFeedback, Button, Keyboard, Alert} from 'react-native';
import Card from '../Card'
import colors from '../../constants/colors';
import Input from '../Input';
import NumberContainer from '../NumberContainer';
import BodyText from '../BodyText';
import MainButton from '../MainButton'

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed ] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState('')

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);

    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber > 99 ){
            Alert.alert('Invalid Number', 'Number Has to be between 1 and 99.',[{text:'okay', style : 'destructive', onPress : resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(parseInt(chosenNumber));
        setEnteredValue('');
        Keyboard.dismiss();

    };
    let confirmedOutput;
    if(confirmed){
        confirmedOutput = (
            <Card style = { styles.summaryContainer} >
                <BodyText>You Selected </BodyText>
                <NumberContainer>
                    {selectedNumber}
                </NumberContainer>
                <MainButton  onPress = {()=>props.onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>

        )
    }
    return(
        <TouchableWithoutFeedback onPress = {() => {
            Keyboard.dismiss();
        }}>
        <View style = {styles.screen}>
            <Text style = {styles.title} >Start a New Game!</Text>
            <Card style = {styles.inputContainer}>
                <BodyText> Select a Number</BodyText>
                <Input 
                    style = {styles.input}
                    blurOnSubmit
                    autoCapitalize = "none"
                    autoCorrect = {false}
                    keyboardType = "numeric"
                    maxLength = {2}
                    onChangeText = {numberInputHandler}
                    value = {enteredValue}
                />
                <View style = {styles.buttonContainer}>
                    <View style = {styles.button}>
                        <Button title = 'Reset' onPress = {resetInputHandler} color = {colors.accent} />
                    </View>
                    <View style = {styles.button}>
                        <Button title = 'Start'onPress = {confirmInputHandler} color = {colors.primary}/>
                    </View>       
                </View>
            </Card>
            {confirmedOutput}
        </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex : 1,
        padding : 10,
        alignItems : 'center',
    },
    inputContainer :{
        width : 300,
        maxWidth : '80%',
        alignItems : 'center',
    },
    title :{
        fontSize : 20,
        marginVertical : 10,
        alignItems : 'center',
        fontFamily : 'open-sans-bold'
        
    },
    buttonContainer : {
        flexDirection : 'row',
        width : '100%',
        justifyContent : 'space-between',
        paddingHorizontal : 15,
    },
    button :{
        width: 90,
    },
    input :{
        width : 50,
        textAlign : 'center'
    },
    summaryContainer : {
        marginTop : 20,
        width : 300,
        maxWidth : '80%',
        alignItems : 'center',

    }
});

export default StartGameScreen;