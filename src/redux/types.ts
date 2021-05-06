import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

export type RootState = {
  linkData: {
    link: string;
    entityId: string;
  };
  tableData: TableData;
}

export type TableItem = {
  id: string;
  [key: string]: unknown;
}

export type TableData = TableItem[];

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;