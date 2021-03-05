import * as React from 'react';
import { Button, Dropdown, Popup, dropdownSlotClassNames, popupContentClassName } from '@fluentui/react-northstar';

const inputItems = ['Bruce Wayne', 'Natasha Romanoff', 'Steven Strange'];

export const selectors = {
  popupTriggerId: 'trigger',
  popupContentClass: popupContentClassName,
  dropdownTriggerClass: dropdownSlotClassNames.triggerButton,
  dropdownListClass: dropdownSlotClassNames.itemsList,
};

const PopupEscHandlingExample = () => (
  <Popup
    trigger={<Button id={selectors.popupTriggerId} content="Open popup" style={{ margin: 50 }} />}
    content={
      <>
        <div>Hello from inner popup!</div>

        <Dropdown
          items={inputItems}
          placeholder="Select your hero"
          getA11ySelectionMessage={{
            onAdd: item => `${item} has been selected.`,
          }}
        />
      </>
    }
  />
);

export default PopupEscHandlingExample;
