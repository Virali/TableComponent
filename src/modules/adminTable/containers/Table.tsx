import { TableRow } from 'modules/adminTable/components/TableRow';
import { TableHeadRow } from 'modules/adminTable/components/TableHeadRow';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTableData } from 'modules/adminTable/redux/selectors';
import styled from 'styled-components';
import { getTable } from 'modules/adminTable/redux/actions';

const TableWrapper = styled.table`
  background-color: white;
  color: black;
  border-collapse: collapse;
`;

export const Table = (): JSX.Element => {
  const dispatch = useDispatch();
  const tableData = useSelector(getTableData);
  const columnNames = tableData.length ? Object.keys(tableData[0]) : [];
  const tableContent = tableData.map((item, index) => <TableRow key={index} itemData={item} index={index}></TableRow>)

  useEffect(() => {
    dispatch(getTable());
  }, [dispatch]);

  if(!tableContent.length) {
    return <></>;
  }

  return (
    <TableWrapper>
      <TableHeadRow columnNames={columnNames}/>
      <tbody>{tableContent}</tbody>
    </TableWrapper>
  );
};