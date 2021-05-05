import { combineReducers } from "redux";
import { CHANGE_TABLE_ITEM, SAVE_LINK, SAVE_TABLE, SAVE_ENTITY_ID } from "../constants";

const initialState = {
  linkData: {
    link: '',
    entityId: '',
  },
  tableData: [],
}

function linkReducer(state = initialState.linkData, action) {
  switch(action.type) {
    case SAVE_LINK:
      return {
        ...state,
        link: action.payload
      };
    case SAVE_ENTITY_ID: 
      return {
        ...state,
        entityId: action.payload
      }
    default: return state;
  }
}

function tableReducer(state = initialState.tableData, action) {
  switch(action.type) {
    case SAVE_TABLE: {
      return action.payload;
    }
    case CHANGE_TABLE_ITEM: {
      const newItem = action.payload;

      return state.map(item => {
        if(item.id === newItem.id) {
          return newItem;
        };
        return item;
      })
    }
    default: return state;
  }
}

const rootReducer = combineReducers({
  linkData: linkReducer,
  tableData: tableReducer,
});

export default rootReducer;