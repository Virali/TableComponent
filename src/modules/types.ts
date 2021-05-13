import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

export type LinkData = {
  link: string;
  entityId: string;
  resource: string;
}

export type RootState = {
  linkData: LinkData;
  tableData: TableData;
}

export type TableItem = {
  [key: string]: string | number;
}

export type DataInstance = {
  _id: string;
  [key: string]: unknown;
}

export type TableData = TableItem[];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;