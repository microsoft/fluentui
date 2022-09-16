import * as React from 'react';
import { Dialog, Dropdown } from '@fluentui/react-northstar';
import { componentInfoContext } from '../componentInfo/componentInfoContext';

export const InsertComponent = ({ onComponentAdded, onDismiss }) => {
  const [selectedComponent, setSelectedComponent] = React.useState('');
  const confirm = React.useCallback(() => {
    const component = componentInfoContext.byDisplayName[selectedComponent];
    onComponentAdded && component && onComponentAdded(component.displayName, component.moduleName);
  }, [onComponentAdded, selectedComponent]);

  const dismiss = React.useCallback(() => {
    onDismiss && onDismiss();
  }, [onDismiss]);

  const items = Object.keys(componentInfoContext.byDisplayName);

  return (
    <Dialog
      header="Insert component"
      confirmButton="Insert"
      cancelButton="Cancel"
      open={true}
      content={
        <Dropdown
          search
          highlightFirstItemOnOpen
          placeholder="Choose component"
          items={items}
          onChange={(e, data) => setSelectedComponent(String(data.value))}
        />
      }
      onConfirm={confirm}
      onCancel={dismiss}
    />
  );
};
