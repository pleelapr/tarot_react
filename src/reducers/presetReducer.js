var _ = require("lodash");

const col = 5;
const row = 5;

var templateArray = new Array(row);

for (var i = 0; i < templateArray.length; i++) {
  templateArray[i] = new Array(col);
}

for (var i = 0; i < templateArray.length; i++) {
  for (var j = 0; j < templateArray[i].length; j++) {
    templateArray[i][j] = "";
  }
}

let threeCard = _.cloneDeep(templateArray)
threeCard[2][1] = "1";
threeCard[2][2] = "2";
threeCard[2][3] = "3";

const initialState = {
  presets: [threeCard],
  presetName: ["3-Card"],
};

const presetReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_PRESET":
      return {
        ...state,
        //presets: _.cloneDeep(state.presets).concat([_.cloneDeep(action.preset)]),
        presets: action.presets,
        presetName: [...state.presetName, action.presetName],
      };

    default:
      return state;
  }
};

export default presetReducer;
