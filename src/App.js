import './App.css';
import TextField from '@material-ui/core/TextField';
import { Text, Button } from 'react-native'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const majorCard = ['The Fool', 'The Magician', 'The High Priestess', 'The Emperor', 'The Hierophant', 'The Lovers', 'The Chariot', 'Strength', 'The Hermit',
  'Wheel of Fortune', 'Justice', 'The Hanged Man', 'Death', 'Temperance', 'The Devil', 'The Tower', 'The Star', 'The Moon', 'The Sun', 'Judgement', 'The World']

let chosenCard = []
let selectedCard = '';
let resultArray = [['', '', ''],['', '', ''],['', '', '']];

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
          return true;
      }
  }
  return false;
}

function randomCard() {
  let redraw = true;
  while(redraw){
    let randomNumber = Math.floor(Math.random() * majorCard.length);
    if(!containsObject(randomNumber, chosenCard)){
      selectedCard = majorCard[randomNumber];
      chosenCard.push(randomNumber);
      redraw = false;
    }
  }
}

function App() {
  //const classes = useStyles();
  function handleClick() {
    chosenCard = []
    let iArray = [[a1, b1, c1],[a2, b2, c2],[a3, b3, c3]];
    resultArray = [['', '', ''],['', '', ''],['', '', '']];
    let totalComponent = 9;
    for (let i = 0; i < iArray.length; i++) {
      let tempArray = iArray[i];
      for (let j = 0; j < tempArray.length; j++) {
        if(tempArray[j] != ''){
          tempArray[j] = parseInt(tempArray[j]);
        }
        else{
          tempArray[j] = -1
        }
      }
    }
    
    let cardIndex = 1;
    for (let loopCount = 0; loopCount < totalComponent; loopCount++){
      for (let i = 0; i < iArray.length; i++) {
        let tempArray = iArray[i];
        for (let j = 0; j < tempArray.length; j++) {
          if(tempArray[j] == cardIndex){
            randomCard();
            resultArray[i][j] = selectedCard;
            cardIndex = cardIndex + 1;
          }
        }
      }
    }
    setStateResultArray(resultArray);
  }

  const [a1, setA1] = useState('');
  const [a2, setA2] = useState('');
  const [a3, setA3] = useState('');
  const [b1, setB1] = useState('');
  const [b2, setB2] = useState('');
  const [b3, setB3] = useState('');
  const [c1, setC1] = useState('');
  const [c2, setC2] = useState('');
  const [c3, setC3] = useState('');
  const [stateResultArray, setStateResultArray] = useState([['', '', ''],['', '', ''],['', '', '']]);

  return (
    <Container maxWidth="sm">
    <div className="App">
      <form  noValidate autoComplete="off">
        <table width="auto">
          <tr>
            <th><TextField id="a1" variant="outlined" value={a1} onChange={(event) => {setA1(event.target.value)}}/></th>
            <th><TextField id="b1" variant="outlined" value={b1} onChange={(event) => {setB1(event.target.value)}}/></th>
            <th><TextField id="c1" variant="outlined" value={c1} onChange={(event) => {setC1(event.target.value)}}/></th>
          </tr>
          <tr>
            <td><TextField id="a2" variant="outlined" value={a2} onChange={(event) => {setA2(event.target.value)}}/></td>
            <td><TextField id="b2" variant="outlined" value={b2} onChange={(event) => {setB2(event.target.value)}}/></td>
            <td><TextField id="c2" variant="outlined" value={c2} onChange={(event) => {setC2(event.target.value)}}/></td>
          </tr>
          <tr>
            <td><TextField id="a3" variant="outlined" value={a3} onChange={(event) => {setA3(event.target.value)}}/></td>
            <td><TextField id="b3" variant="outlined" value={b3} onChange={(event) => {setB3(event.target.value)}}/></td>
            <td><TextField id="c3" variant="outlined" value={c3} onChange={(event) => {setC3(event.target.value)}}/></td>
          </tr>
        </table>
      </form>
      <Button onPress={() => handleClick()} title="Random" />
      <table width="auto">
          <tr>
            <th><TextField disabled id="a1" variant="outlined" value={stateResultArray[0][0]}/></th>
            <th><TextField disabled id="b1" variant="outlined" value={stateResultArray[0][1]}/></th>
            <th><TextField disabled id="c1" variant="outlined" value={stateResultArray[0][2]}/></th>
          </tr>
          <tr>
            <td><TextField disabled id="a2" variant="outlined" value={stateResultArray[1][0]}/></td>
            <td><TextField disabled id="b2" variant="outlined" value={stateResultArray[1][1]}/></td>
            <td><TextField disabled id="c2" variant="outlined" value={stateResultArray[1][2]}/></td>
          </tr>
          <tr>
            <td><TextField disabled id="a3" variant="outlined" value={stateResultArray[2][0]}/></td>
            <td><TextField disabled id="b3" variant="outlined" value={stateResultArray[2][1]}/></td>
            <td><TextField disabled id="c3" variant="outlined" value={stateResultArray[2][2]}/></td>
          </tr>
        </table>
    </div>
    </Container>
  );
}

export default App;
