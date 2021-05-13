import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getAndSaveLink, saveEntityId, saveLink, saveResource } from '../redux/actions';
import { getLinkData } from '../redux/selectors';

const Input = styled.input`
  width: 200px;
`;

export default function LinkInput(): JSX.Element {
  const linkData = useSelector(getLinkData);
  const linkString = Object.values(linkData).filter(Boolean).join('/');
  const dispatch = useDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const addressParts = value.split('/');
    console.log(addressParts);

    dispatch(saveLink(addressParts.slice(0,5).join('/')));
    if(addressParts[5]) {
      dispatch(saveResource(addressParts[5]));
    }
    if(addressParts[6]) {
      dispatch(saveEntityId(addressParts[6]));
    }
  };

  useEffect(() => {
    dispatch(getAndSaveLink);
  },[dispatch]);

  return(
    <>
      <p>CRUD Link</p>
      <Input placeholder={'Your Backend Link'} value={linkString} onChange={onChange} />
    </>
  );
}