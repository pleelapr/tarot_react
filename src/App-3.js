import "./App.css";
import TextField from "@material-ui/core/TextField";
import { Button } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import React, { useState } from "react";
import tarot_link from "./common/constants/tarot_link";

var _ = require("lodash");

const col = 5;
const row = 5;
const cardWidth = 100;

let chosenCard = [];
let selectedCard = "";

var templateArray = new Array(row);

for (var i = 0; i < templateArray.length; i++) {
  templateArray[i] = new Array(col);
}

for (var i = 0; i < templateArray.length; i++) {
  for (var j = 0; j < templateArray[i].length; j++) {
    templateArray[i][j] = "";
  }
}

let resultArray = templateArray;

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
  while (redraw) {
    let randomNumber = Math.floor(Math.random() * tarot_link.path.length);
    if (!containsObject(randomNumber, chosenCard)) {
      selectedCard = tarot_link.path[randomNumber];
      chosenCard.push(randomNumber);
      redraw = false;
    }
  }
}

function App() {
  function handlePickCard() {
    chosenCard = [];
    let iArray = stateSettingArray;
    resultArray = _.cloneDeep(templateArray);
    let totalComponent = 9;
    for (let i = 0; i < iArray.length; i++) {
      let tempArray = iArray[i];
      for (let j = 0; j < tempArray.length; j++) {
        if (tempArray[j] !== "") {
          tempArray[j] = parseInt(tempArray[j]);
        }
      }
    }

    let cardIndex = 1;
    let cardShift = false;
    for (let loopCount = 0; loopCount < totalComponent; loopCount++) {
      cardShift = false;
      for (let i = 0; i < iArray.length; i++) {
        let tempArray = iArray[i];
        for (let j = 0; j < tempArray.length; j++) {
          if (tempArray[j] === cardIndex) {
            randomCard();
            resultArray[i][j] = selectedCard;
            cardIndex = cardIndex + 1;
            cardShift = true;
          }
        }
      }
      if(!cardShift) cardIndex = cardIndex + 1;
    }
    setStateResultArray(resultArray);
  }

  function handleSave() {
    // dispatch({
    //   type: 'SAVE_PRESET',
    //   preset: stateSettingArray,
    // });
  }

  let stateArray = _.cloneDeep(templateArray);
  const [stateSettingArray, setStateSettingArray] = useState(
    _.cloneDeep(templateArray)
  );
  console.log(stateSettingArray);
  const [stateResultArray, setStateResultArray] = useState(stateArray);

  const settingArrayChange = (indexr, indexc) => (e) => {
    let newArr = [...stateSettingArray]; // copying the old datas array
    newArr[indexr][indexc] = e.target.value; // replace e.target.value with whatever you want to change it to
    setStateSettingArray(newArr);
  };

  return (
    <Container maxWidth="lg">
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form noValidate autoComplete="off">
          <table width="auto">
            {stateSettingArray.map((r, indexr) => (
              <tr key={indexr}>
                {Array.from(stateSettingArray[0]).map((c, indexc) => (
                  <td key={indexc}>
                    <TextField
                      style={{ width: cardWidth }}
                      id={indexr + "" + indexc}
                      variant="outlined"
                      value={stateSettingArray[indexr][indexc]}
                      onChange={settingArrayChange(indexr, indexc)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </table>
        </form>
        <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "space-evenly",
          width: '25rem'
        }}
        ><Button onPress={() => handlePickCard()} title="Pick Card" /><Button onPress={() => handleSave()} title="Save" /></div>
        <table width="auto">
          {stateResultArray.map((r, indexr) => (
            <tr key={indexr}>
              {Array.from(stateResultArray[0]).map((c, indexc) => (
                <td style={{padding: (stateResultArray[indexr][indexc] !== "") ? '0' : '1rem'}} key={indexc}>
                  {stateResultArray[indexr][indexc] !== "" ? (
                    <img
                      width={cardWidth}
                      src={stateResultArray[indexr][indexc]}
                      alt=''
                    />
                  ) : (
                    <></>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    </Container>
  );
}

export default App;
