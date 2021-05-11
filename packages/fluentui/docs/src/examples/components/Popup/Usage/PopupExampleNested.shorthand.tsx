import * as React from 'react';
import { Button, Popup } from '@fluentui/react-northstar';

const PopupExampleNested = () => (
  <Popup
    content={
      <>
        <div>Hello from first popup!</div>
        <Popup
          content={
            <>
              <div>Hello from second popup!</div>

              <Popup content="Hello from third popup!" trigger={<Button content="Open third" />} />
            </>
          }
          trigger={<Button content="Open second" />}
        />
      </>
    }
    trigger={<Button content="Open first" />}
  />
);

export default PopupExampleNested;
