import xtend from "xtend";
import ApiManager from "../api/ApiManager";
import utils from "../utils";
import { SIZE_CHANGED } from "./types";

const initialState = {
  ApiManager: new ApiManager(),
  isMobile: utils.isMobile(),
};

function reducer(state = initialState, action: any) {
  switch (action.type) {
    case SIZE_CHANGED:
      return xtend(state, { isMobile: utils.isMobile() });

    default:
      return state;
  }
}

export default reducer;
