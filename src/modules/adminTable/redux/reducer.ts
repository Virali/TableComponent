import { AnyAction, combineReducers } from "redux";
import { CHANGE_TABLE_ITEM, SAVE_LINK, SAVE_TABLE, SAVE_ENTITY_ID, SAVE_RESOURCE } from "../../constants";
import { LinkData, RootState, TableData } from "../../types";

const initialState: RootState = {
  linkData: {
    link: '',
    resource: '',
    entityId: '',
  },
  tableData: [],
}

export function linkReducer(state = initialState.linkData, action: AnyAction): LinkData {
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
    case SAVE_RESOURCE: 
      return {
        ...state,
        resource: action.payload
      }
    default: return state;
  }
}

export function tableReducer(state = initialState.tableData, action: AnyAction): TableData {
  switch(action.type) {
    case SAVE_TABLE: {
      return [
        ...action.payload
      ];
    }
    case CHANGE_TABLE_ITEM: {
      const { item: newItem, index: newItemIndex } = action.payload;

      return state.map((item, index) => {
        if (index !== newItemIndex) {
          return item;
        }
        return {...newItem};
      });
    }
    default: return state;
  }
}

const rootReducer = combineReducers({
  linkData: linkReducer,
  tableData: tableReducer,
});

export default rootReducer;