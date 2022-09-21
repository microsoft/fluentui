import * as React from 'react';
import { Dropdown } from '@fluentui/react-northstar';
import { Button, makeStyles, shorthands } from '@fluentui/react-components';
import { Dialog, DialogSurface } from '@fluentui/react-components/unstable';
import { componentInfoContext } from '../componentInfo/componentInfoContext';

const useStyles = makeStyles({
  surface: {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    rowGap: '2rem',
    zIndex: 10,
  },
  header: {
    ...shorthands.margin(0),
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export const InsertComponent = ({ onComponentAdded, onDismiss }) => {
  const styles = useStyles();
  const [selectedComponent, setSelectedComponent] = React.useState('');
  const confirm = React.useCallback(() => {
    const component = componentInfoContext.byDisplayName[selectedComponent];
    onComponentAdded && component && onComponentAdded(component.displayName, component.moduleName);
  }, [onComponentAdded, selectedComponent]);

  const dismiss = React.useCallback(() => {
    onDismiss && onDismiss();
  }, [onDismiss]);

  const onChange = React.useCallback((e, data) => setSelectedComponent(String(data.value)), [setSelectedComponent]);

  const items = Object.keys(componentInfoContext.byDisplayName);

  return (
    <Dialog open={true}>
      <DialogSurface className={styles.surface}>
        <h2 className={styles.header}>Insert component</h2>
        <Dropdown search highlightFirstItemOnOpen placeholder="Choose component" items={items} onChange={onChange} />
        <div className={styles.buttonContainer}>
          <Button onClick={dismiss}>Cancel</Button>
          <Button onClick={confirm} appearance="primary">
            Insert
          </Button>
        </div>
      </DialogSurface>
    </Dialog>
  );
};
