import * as React from 'react';
import { Dropdown } from '@fluentui/react-northstar';
import { Button, makeStyles } from '@fluentui/react-components';
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogActions,
  DialogTrigger,
  DialogBody,
} from '@fluentui/react-components/unstable';
import { componentInfoContext } from '../componentInfo/componentInfoContext';

const useStyles = makeStyles({
  surface: {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    rowGap: '2rem',
    zIndex: 10,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
        <DialogTitle>Insert component</DialogTitle>
        <DialogBody>
          <Dropdown search highlightFirstItemOnOpen placeholder="Choose component" items={items} onChange={onChange} />
        </DialogBody>
        <DialogActions className={styles.buttonContainer}>
          <DialogTrigger>
            <Button onClick={dismiss}>Cancel</Button>
          </DialogTrigger>
          <Button onClick={confirm} appearance="primary">
            Insert
          </Button>
        </DialogActions>
      </DialogSurface>
    </Dialog>
  );
};
