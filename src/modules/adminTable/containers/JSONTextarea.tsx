import React, { useState } from 'react';
import styled from 'styled-components';
import { postTable } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getLinkString } from '../redux/selectors';

const JSONInput = styled('textarea')`
  width: 250px;
  height: 200px;
  &:focus {
    outline: none;
  }
  margin: 1vmin;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const Button = styled.button`
  margin: 1vmin 0;
`;

const testExample = `[
  {
    "name": "Sparkle Angel",
    "age": 2,
    "colour": "blue"
  },
  {
    "name": "Sparkle Angel",
    "age": 2,
    "colour": "blue"
  },
  {
    "name": "Sparkle Angel",
    "age": 2,
    "colour": "blue"
  }
]`;  

export default function JSONTextarea(): JSX.Element {
  const [text, setText] = useState(testExample);
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
      <Button onClick={sendData}>Send</Button>
    </>
  );
}
