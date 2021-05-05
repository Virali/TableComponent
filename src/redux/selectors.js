export const getLinkData = state => state.linkData;

export const getLinkString = state => getLinkData(state).link;

export const getEntityId = state => getLinkData(state).entityId;

export const getTableData = state => state.tableData;
