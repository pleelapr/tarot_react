import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import colors from "../common/constants/colors";
import TextField from "@material-ui/core/TextField";
import { useSelector, useDispatch } from "react-redux";
import tarot_link from "../common/constants/tarot_link";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../reducers/rootReducer";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ViewCarouselIcon from "@material-ui/icons/ViewCarousel";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Switch from "@material-ui/core/Switch";
import "../App.css";

var _ = require("lodash");

const FlexSpacer = styled.div`
  flex: 1 1 auto;
  height: 1.25rem;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
    marginTop: "5rem",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const col = 5;
const row = 5;
const cardWidth = 100;
const drawerWidth = 240;

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

const CardDrawer = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  let presetsList = JSON.parse(
    JSON.stringify(useSelector((state) => state.preset.presets))
  );
  console.log(presetsList);
  let presetsNameList = useSelector((state) => state.preset.presetName);
  let resultArray = JSON.parse(JSON.stringify(templateArray));
  let stateArray = JSON.parse(JSON.stringify(templateArray));
  const [stateResultArray, setStateResultArray] = useState(resultArray);
  const [presetName, setPresetName] = useState("");
  const [presetSettingStatus, setPresetSettingStatus] = useState(true);
  const [stateSettingArray, setStateSettingArray] = useState(stateArray);
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch({
      type: "INIT",
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("presetsNameList", JSON.stringify(presetsNameList));
    localStorage.setItem("presetsList", JSON.stringify(presetsList));
  }, [presetsNameList, presetsList]);

  const settingArrayChange = (indexr, indexc) => (e) => {
    let newArr = [...stateSettingArray];
    newArr[indexr][indexc] = e.target.value;
    setStateSettingArray(newArr);
  };

  function handleSave() {
    var index = presetsNameList.indexOf(presetName);
    if (index == -1) {
      var newArray = JSON.parse(JSON.stringify(stateSettingArray));
      console.log(presetsList);
      console.log([...presetsList, newArray]);
      dispatch({
        type: "SAVE_PRESET",
        presets: [...presetsList, newArray],
        presetName,
      });
    } else {
      alert("Please enter different preset name");
    }
  }

  const containsObject = (obj, list) => {
    var i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }
    return false;
  };

  const randomCard = () => {
    let redraw = true;
    while (redraw) {
      let randomNumber = Math.floor(Math.random() * tarot_link.path.length);
      if (!containsObject(randomNumber, chosenCard)) {
        selectedCard = tarot_link.path[randomNumber];
        chosenCard.push(randomNumber);
        redraw = false;
      }
    }
  };

  const selectPreset = (name, index) => {
    setStateSettingArray(presetsList[index]);
    setPresetName(name);
  };

  const togglePresetSetting = () => {
    setPresetSettingStatus(!presetSettingStatus);
  };

  const handlePickCard = () => {
    console.log("Pick card");
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
      if (!cardShift) cardIndex = cardIndex + 1;
    }
    setStateResultArray(resultArray);
  };

  const presetSettingComp = (
    <>
      <TextField
        label="Preset Name"
        variant="outlined"
        value={presetName}
        onChange={(event) => {
          setPresetName(event.target.value);
        }}
      />
      <FlexSpacer />
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
      {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignContent: "space-evenly",
          width: "25rem",
          height: "5rem",
          alignItems: "center",
        }}
      > */}
      {/* <Button
          style={{ height: "3rem", width: "10rem" }}
          variant="contained"
          onClick={handlePickCard}
        >
          Pick Card
        </Button> */}
      <Button
        style={{ height: "3rem", width: "10rem", margin: "1.25rem" }}
        variant="contained"
        onClick={handleSave}
      >
        Save
      </Button>
      {/* </div> */}
    </>
  );

  const resultTable = (
    <table width="auto">
      {stateResultArray.map((r, indexr) => (
        <tr key={indexr}>
          {Array.from(stateResultArray[0]).map((c, indexc) => (
            <td
              style={{
                padding: stateResultArray[indexr][indexc] !== "" ? "0" : "1rem",
              }}
              key={indexc}
            >
              {stateResultArray[indexr][indexc] !== "" ? (
                <img
                  width={cardWidth}
                  src={stateResultArray[indexr][indexc]}
                  alt=""
                />
              ) : (
                <></>
              )}
            </td>
          ))}
        </tr>
      ))}
    </table>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h5" component="h5">
            Tarot Flex
          </Typography>
          {/* <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="fade-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}>Preset Setting</MenuItem>
              <MenuItem onClick={handleClose}>Pick Card</MenuItem>
            </Menu> */}
        </Toolbar>
      </AppBar>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerContainer}>
            <List>
              <ListItem
                id="presetSetting"
                button
                key="Preset Setting"
                onClick={(event) => {
                  togglePresetSetting();
                }}
              >
                <Switch
                  checked={presetSettingStatus}
                  color="primary"
                  name="checkedB"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <ListItemText primary="Toggle Preset Setting" />
              </ListItem>
              <ListItem
                id="pickCard"
                button
                key="Pick Card"
                onClick={(event) => {
                  handlePickCard();
                }}
              >
                <ListItemIcon>{<ViewCarouselIcon />}</ListItemIcon>
                <ListItemText primary="Pick Card" />
              </ListItem>
            </List>
            <Divider />
            <List>
              {presetsNameList.map((text, index) => (
                <ListItem
                  id={index}
                  button
                  key={text}
                  onClick={(event) => {
                    selectPreset(text, index);
                  }}
                >
                  <ListItemText
                    primary={text}
                    style={{
                      color: presetName === text ? colors.blue : colors.black,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        {presetSettingStatus && presetSettingComp}
        {resultTable}
      </div>
    </>
  );
};

export default CardDrawer;
