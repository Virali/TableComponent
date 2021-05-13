import { CellWrapper } from 'modules/helpers/commonStyles';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTable } from 'modules/adminTable/redux/actions';
import { TableItem } from 'modules/types';
import styled from 'styled-components';
import { Cell } from './Cell';

const CellRow = styled.tr`
  display: flex;
  &:hover {
    background-color: #ebebeb;
  }
  input{
    font-size: calc(10px + 1vmin);
    width: 90%;
  }
`;

const EditButton = styled.span`
  cursor:pointer;
  color:blue;
  &:hover {
    text-decoration:underline;
  }
`;

function transformToCells(dataObj: TableItem, isEditing: boolean, setStateFunc: (propertyName: string, propertyValue: string | number) => void) {
  return Object.entries(dataObj).map(([key, value], index) => {
    return <Cell
      key={index}
      name={key}
      value={value}
      onChangeFunction={setStateFunc}
      isEditing={isEditing}
    />
  })
}

export const TableRow: FC<{ itemData: TableItem; index: number }> = ({ itemData, index }) => {
  const [isEditing, switchIsEditing] = useState<boolean>(false);
  const [content, setContent] = useState(itemData);
  const dispatch = useDispatch();

  const cells = transformToCells(content, isEditing, changePropertyValue);

  useEffect(() => {
    setContent(itemData);
  }, [itemData]);

  function onClickSave() {
    switchIsEditing(false);
    dispatch(updateTable(content, index));
  }

  function onClickEdit() {
    switchIsEditing(true);
  }

  function changePropertyValue(propertyName: string, propertyValue: string | number) {
    setContent({
      ...content,
      [propertyName]: propertyValue
    })
  }

  return (
    <CellRow>
      {cells}
      <CellWrapper>
        <EditButton 
          onClick={isEditing ? onClickSave : onClickEdit}>
            {isEditing ? 'Save' : 'Edit'}
        </EditButton>
      </CellWrapper>
    </CellRow>
  );
}