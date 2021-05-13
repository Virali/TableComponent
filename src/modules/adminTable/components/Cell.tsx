import React, { FC } from 'react';
import { CellWrapper } from 'modules/helpers/commonStyles';

type CellProps = {
  value: string | number;
  name: string;
  onChangeFunction: (propertyName: string, propertyValue: string | number) => void;
  isEditing: boolean;
}

export const Cell: FC<CellProps> = ({ value, isEditing, name, onChangeFunction }) => {
  return(
    <CellWrapper>
      {isEditing ? 
        <input value={value} onChange={(e) => onChangeFunction(name, e.target.value)}/> 
        : value
      }
    </CellWrapper>
  );
};
