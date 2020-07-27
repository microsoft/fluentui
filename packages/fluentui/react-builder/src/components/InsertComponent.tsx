import * as React from 'react';
import { Dialog, Dropdown } from '@fluentui/react-northstar';
import { componentInfoContext } from '../componentInfo/componentInfoContext';
import { resolveDraggingElement, resolveDrop, jsonTreeFindElement } from '../config';

export const InsertComponent = ({ parent, index = 0, onComponentAdded, onDismiss }) => {
  const [selectedComponent, setSelectedComponent] = React.useState('');
  const confirm = () => {
    const element = resolveDraggingElement(selectedComponent);
    resolveDrop(element, parent, index);
    const addedComponent = jsonTreeFindElement(parent, element.uuid);
    onComponentAdded && onComponentAdded(addedComponent);
  };

  const items = Object.keys(componentInfoContext.byDisplayName);

  return (
    <Dialog
      header="Insert component"
      confirmButton="Insert"
      cancelButton="Cancel"
      open={true}
      content={
        <Dropdown
          placeholder="Choose component"
          items={items}
          onChange={(e, data) => setSelectedComponent(String(data.value))}
        />
      }
      onConfirm={confirm}
      onCancel={onDismiss}
    />
  );
};
