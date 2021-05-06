import { RootState } from './types';
import { createSelector } from 'reselect';

const getState = (state: RootState) => state;

export const getLinkData = createSelector(getState, ({ linkData }) => linkData);

export const getLinkString = createSelector(getLinkData, ({ link }) => link);

export const getEntityId = createSelector(getLinkData, ({ entityId }) => entityId);

export const getTableData = createSelector(getState, ({ tableData }) => tableData);
