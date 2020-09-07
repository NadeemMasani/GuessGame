import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import StartGameScreen from './components/screens/StartGameScreen'
import GameScreen from './components/screens/GameScreen';
import GameOver from './components/screens/GameOver'
import * as Font from 'expo-font';
import { useFonts } from '@use-expo/font';

//import {Font} from 'expo';
import { AppLoading } from 'expo';




export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  let [fontsLoaded] = useFonts({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  const configueNewGameHandler = () =>{
    setGuessRounds(0);
    setUserNumber(null);
  }
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  const gameOverHandler = numberOfRounds =>{
    setGuessRounds(numberOfRounds);
  }  

  let content = <StartGameScreen onStartGame = {startGameHandler} />;

  if(userNumber && guessRounds <= 0){
    content = <GameScreen userChoice = {userNumber} onGameOver = {gameOverHandler}/>;
  }else if ( guessRounds > 0 ){
    content = <GameOver roundsNumber = {guessRounds} userNUmber ={userNumber} onRestart ={configueNewGameHandler} />;
  }
  return (
    <View  style={styles.screen}>
      <Header title="Guess A Number Game"/>
      {content}
    </View>
  );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex : 1
  },
});
