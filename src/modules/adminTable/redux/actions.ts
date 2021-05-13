import axios, { AxiosResponse } from "axios";
import { getLinkString, getTableData, getEntityId, getResource } from "./selectors";
import { 
  SAVE_LINK,
  SAVE_ENTITY_ID,
  SAVE_TABLE, 
  CHANGE_TABLE_ITEM,
  SERVICE_LINK,
  STR_FOR_SEARCH,
  DEFAULT_RESOURCE,
  REQUEST_SETTINGS,
  SAVE_RESOURCE,
  DEFAULT_RESOURCE_KEY,
} from '../../constants';
import { AppThunk, RootState, TableData, TableItem } from "../../types";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

export const saveLink = (link: string): AnyAction => {
  return {
    type: SAVE_LINK,
    payload: link
  };
};

export const saveResource = (resource: string): AnyAction => {
  return {
    type: SAVE_RESOURCE,
    payload: resource
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
  }
}

export const saveTable = (table: TableData): AnyAction => {
  return {
    type: SAVE_TABLE,
    payload: table
  };
};

export const changeTableItem = (item: TableItem, index: number): AnyAction => {
  return {
    type: CHANGE_TABLE_ITEM,
    payload: {
      item,
      index
    }
  };
};

async function makePostRequest(link: string, payload: TableData, resource = DEFAULT_RESOURCE): Promise<AxiosResponse<any>> {
  const payloadJSON = JSON.stringify({[DEFAULT_RESOURCE_KEY]: payload});

  const response = await axios.post(
    link + `/${resource}`,
    payloadJSON,
    REQUEST_SETTINGS
  );

  return response;
}

async function makePutRequest(link: string, entityId: string, payload: TableData, resource = DEFAULT_RESOURCE): Promise<AxiosResponse<any>> {
  const payloadJSON = JSON.stringify({[DEFAULT_RESOURCE_KEY]: payload});

  const response = await axios.put(
    link + `/${resource}` + `/${entityId}`,
    payloadJSON,
    REQUEST_SETTINGS
  );

  return response;
}

export function postTable(tableData: TableData): AppThunk {
  return async (dispatch, getState) => {
    const state = getState();
    const resource = getResource(state) || DEFAULT_RESOURCE;

    const response = await makePostRequest(getLinkString(state), tableData, resource);

    if(response.status < 400) {
      dispatch(saveTable(tableData));
      dispatch(saveEntityId(response.data['_id']))
    }
  };
}

export function updateTable(changedItem: TableItem, index: number): AppThunk {
  return async (dispatch, getState) => {
    const itemBeforeChange = getTableData(getState()).find((item: TableItem) => item.id === changedItem.id) as TableItem;
    dispatch(changeTableItem(changedItem, index));

    const state = getState();

    const response = await makePutRequest(getLinkString(state), getEntityId(state), getTableData(state));

    if(response.status >= 400) {
      dispatch(changeTableItem(itemBeforeChange, index));
    }
  };
}

export function getTable(): AppThunk {
  return async (dispatch, getState) => {
    const state = getState();
    const link = getLinkString(state);
    const entityId = getEntityId(state);
    const resource = getResource(state) || DEFAULT_RESOURCE;
    
    const response = await axios.get(
      link + `/${resource}` + `/${entityId}`
    );
    
    if(response.data && entityId) {
      dispatch(saveTable(response.data[DEFAULT_RESOURCE_KEY]));
    }
  };
}