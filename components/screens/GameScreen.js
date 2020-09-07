import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, Text, Button, Alert,FlatList} from 'react-native';
import NumberContainer from '../NumberContainer';
import Card from '../Card'
import MainButton from '../MainButton';
import { Ionicons } from '@expo/vector-icons';
import BodyText from '../BodyText';


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max-min)+min);
    if (rndNum === exclude){
        return generateRandomBetween(min, max, exclude);
    }else{
        return rndNum;
    }
};

const renderListItems = (listLength, itemData) =>(
    <View style ={styles.listItem}>
        <BodyText>#{listLength - itemData.index }</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
 )
const GameScreen = props => {
    const initialGuess = generateRandomBetween(1,100, props.userChoice); 
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const currentLow = useRef(1);
    const currentHight = useRef(100);
    const [rounds, setRounds] = useState(0);
    const {userChoice, onGameOver} = props;
    useEffect(()=>{
        if(currentGuess === userChoice){
            onGameOver(pastGuesses.length);
        }
    },[currentGuess,userChoice,onGameOver]);
    const nextGuessHandler = direction => {
        if( (direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)){
            Alert.alert('Dont\'t lie', 'you know this is wrong', [{text : 'Sorry', style : 'cancel'}]);
            return;
        }

        if(direction === 'lower'){
            currentHight.current = currentGuess;
        }else{
            currentLow.current = currentGuess + 1;
        }

        const nextNUmber = generateRandomBetween(currentLow.current, currentHight.current, currentGuess);
        setCurrentGuess(nextNUmber);
        // setRounds(curRounds => curRounds+1);
        setPastGuesses(currPastGuesses => [nextNUmber.toString(),...currPastGuesses])
    }
    return(
        <View style = {styles.screen}>
            <Text>  Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style = {styles.buttonContainer}>
                <MainButton  onPress = {nextGuessHandler.bind(this,'lower')}>
                    <Ionicons name ="md-remove" size = {30} color = 'white'/>
                </MainButton>
                <MainButton  onPress = {nextGuessHandler.bind(this,'greater')}>
                     <Ionicons name ="md-add" size = {30} color = 'white'/>
                </MainButton>
             </Card>
             <View style = {styles.listContainer}>
                {/* <ScrollView contentContainerStyle = {styles.list}>
                    {pastGuesses.map((guess,index) => renderListItems(guess,pastGuesses.length-index))}
                </ScrollView> */}
                <FlatList 
                    keyExtractor = {(item)=> item }
                    data = {pastGuesses} 
                    renderItem ={renderListItems.bind(this,pastGuesses.length)}
                    contentContainerStyle = {styles.list}
                />
             </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen : {
        flex : 1,
        padding : 10,
        alignItems : 'center',
    },
    buttonContainer :{
        flexDirection : 'row',
        justifyContent : 'space-around',
        marginTop : 20,
        width : 400,
        maxWidth : '90%'

    },
    listItem : {
        borderColor : '#ccc',
        borderWidth : 1,
        padding : 15,
        marginVertical : 10,
        backgroundColor : 'white',
        flexDirection : 'row',
        justifyContent : 'space-between',
        width : '100%'

    },
    list : {
        // width : '80%',
        flexGrow : 1,
        // alignItems : 'center',
        justifyContent : 'flex-end',
    },
    listContainer : {
        width : '60%',
        flex : 1,
    }
});

export default GameScreen; 