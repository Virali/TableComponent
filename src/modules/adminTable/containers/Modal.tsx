import React, { FC, useState } from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width:100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
`;

const Content = styled.section`
  position:fixed;
  background: white;
  padding: 4px;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
`;

const Button = styled.button`
  margin: 1vmin 0;
`;

export const Modal: FC<{ children: JSX.Element[] }> = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);

  function onOpen() {
    setShow(true);
  }

  function onClose() {
    setShow(false);
  }

  return(
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      {show && 
        <ModalWrapper>
          <Content>
            {children}
            <button onClick={onClose}>Close</button>
          </Content>
        </ModalWrapper>
      }
    </>
  );
};
