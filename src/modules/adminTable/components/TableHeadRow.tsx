import { CellWrapper } from 'modules/helpers/commonStyles';
import React, { FC } from 'react';
import styled from 'styled-components';

const CellRow = styled.tr`
  display: flex;
  background-color: #f0f0f0;
`;


export const TableHeadRow: FC<{ columnNames: string[] }> = ({ columnNames }) => {
  const cells = columnNames.map((name, index) => <CellWrapper key={index}>{name}</CellWrapper>);

  return (
    <thead>
      <CellRow>
        {cells}
        <CellWrapper> </CellWrapper>
      </CellRow>
    </thead>
  );
}