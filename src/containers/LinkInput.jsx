import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAndSaveLink, saveLink } from '../redux/actions';
import { getLinkString } from '../redux/selectors';


export default function LinkInput() {
  const link = useSelector(getLinkString);
  const dispatch = useDispatch();

  const onChange = (e) => {
    dispatch(saveLink(e.target.value));
  };

  useEffect(() => {
    dispatch(getAndSaveLink);
  },[dispatch]);

  return(
    <>
      <p>CRUD Link</p>
      <input placeholder={'Your Backend Link'} value={link} onChange={onChange} />
    </>
  );
}