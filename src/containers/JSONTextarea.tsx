import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { postTable } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getLinkString } from '../redux/selectors';

const JSONInput = styled('textarea')`
  width: 200px;
  height: 120px;
  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: red;
`;

export default function JSONTextarea(): ReactElement {
  const [text, setText] = useState('');
  const [isError, setIsError] = useState(false);
  const link = useSelector(getLinkString);
  const dispatch = useDispatch();

  function changeText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    setText(e.target.value);
  }

  function sendData() {
    setIsError(false);
    try {
      JSON.parse(text);
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
    if(!isError) {
      console.log("link: ", link + '/table', "String: ", text);
      dispatch(postTable(JSON.parse(text)));
    }
  }

  return (
    <>
      <JSONInput onChange={changeText} value={text}/>
      {isError && <ErrorMessage>Not A Valid JSON</ErrorMessage>}
      <button onClick={sendData}>Send</button>
    </>
  );
}
