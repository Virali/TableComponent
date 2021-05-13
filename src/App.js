import React from 'react';
import styled from 'styled-components';

import LinkInput from './modules/adminTable/containers/LinkInput';
import JSONTextarea from './modules/adminTable/containers/JSONTextarea';
import { Table } from 'modules/adminTable/containers/Table';
import { Modal } from './modules/adminTable/containers/Modal';

const MainWrapper = styled.div`
  text-align: center;
  background-color: #bcc2cf;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 1vmin);
`;

function App() {
  return (
    <MainWrapper>
      <LinkInput/>
      <JSONTextarea/>
      <Modal>
        <Table/>
      </Modal>
      <Table/>
    </MainWrapper>
  );
}

export default App;
