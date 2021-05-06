import axios from "axios";
import { getLinkString, getTableData, getEntityId } from "./selectors";
import { 
  SAVE_LINK,
  SAVE_ENTITY_ID,
  SAVE_TABLE, 
  CHANGE_TABLE_ITEM,
  SERVICE_LINK,
  STR_FOR_SEARCH,
  DATA_ENTITY_LOCATION,
  REQUEST_SETTINGS,
} from '../constants';
import { AppThunk, RootState, TableData, TableItem } from "./types";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export const saveLink = (link: string): AnyAction => {
  return {
    type: SAVE_LINK,
    payload: link
  };
};

export const saveEntityId = (entityId: string): AnyAction => {
  return {
    type: SAVE_ENTITY_ID,
    payload: entityId
  }
}

export async function getAndSaveLink(dispatch: ThunkDispatch<RootState, unknown, AnyAction>): Promise<void> {
  const response = await axios.get(SERVICE_LINK);

  if(response.data) {
    const data = response.data;
    const startIndex = data.indexOf(STR_FOR_SEARCH);
    const endIndex = data.indexOf(' ', startIndex);
    const linkString = data.substring(startIndex, endIndex-1);
    dispatch(saveLink(linkString));
  } else console.log(response);
}

export const saveTable = (table: TableData): AnyAction => {
  return {
    type: SAVE_TABLE,
    payload: table
  };
};

export const changeTableItem = (item: TableItem): AnyAction => {
  return {
    type: CHANGE_TABLE_ITEM,
    payload: item
  };
};

export function postTable(tableData: TableData): AppThunk {
  return async (dispatch, getState) => {
    const link = getLinkString(getState());
    const tableDataJSON = JSON.stringify(tableData);

    const response = await axios.post(
      link + DATA_ENTITY_LOCATION,
      tableDataJSON,
      REQUEST_SETTINGS
    );

    if(response.status < 400) {
      dispatch(saveTable(tableData));
      dispatch(saveEntityId(response.data['_id']))
    } else console.log(response);
  };
}

export function updateTable(changedItem: TableItem): AppThunk {
  return async (dispatch, getState) => {
    const itemBeforeChange = getTableData(getState()).find((item: TableItem) => item.id === changedItem.id) as TableItem;
    dispatch(changeTableItem(changedItem));

    const state = getState();
    const link = getLinkString(state);
    const entityId = getEntityId(state);
    const updatedTable = getTableData(state);

    const response = await axios.put(
      link + DATA_ENTITY_LOCATION + `/${entityId}`,
      updatedTable,
      REQUEST_SETTINGS
    );

    if(response.status >= 400) {
      dispatch(changeTableItem(itemBeforeChange));
    }
  };
}