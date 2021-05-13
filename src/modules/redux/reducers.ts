import { combineReducers } from "redux";
import { linkReducer, tableReducer } from "modules/adminTable/redux/reducer";

export const rootReducer = combineReducers({
  linkData: linkReducer,
  tableData: tableReducer,
});