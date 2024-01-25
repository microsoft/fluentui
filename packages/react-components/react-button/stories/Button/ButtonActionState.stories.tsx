import * as React from 'react';
import { makeStyles, Button, Tooltip } from '@fluentui/react-components';
import { ButtonActionState } from '../../src/components/Button/Button.types';
import { Cloud20Regular, CloudCheckmark20Regular, CloudSync20Regular, SaveRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  wrapper: {
    alignItems: 'center',
    columnGap: '15px',
    display: 'flex',
  },
});

export const ActionState = () => {
  const styles = useStyles();

  const [buttonState, setButtonState] = React.useState<ButtonActionState>('none');
  const stateTimeout = React.useRef<NodeJS.Timeout>();

  function changeState() {
    clearTimeout(stateTimeout.current);
    setButtonState('inprogress');
    stateTimeout.current = setTimeout(() => {
      setButtonState('completed');
      stateTimeout.current = setTimeout(() => {
        setButtonState('none');
      }, 3000);
    }, 3000);
  }

  return (
    <div className={styles.wrapper}>
      <Button actionState={buttonState} onClick={changeState} appearance="primary" shape="circular">
        {buttonState === 'none' ? 'Save' : null}
      </Button>
      <Button
        actionState={buttonState}
        onClick={changeState}
        icon={
          buttonState === 'none' ? (
            <Cloud20Regular />
          ) : buttonState === 'completed' ? (
            <CloudCheckmark20Regular />
          ) : (
            <CloudSync20Regular />
          )
        }
      >
        {buttonState === 'none' ? 'Save' : buttonState === 'completed' ? 'Saved' : 'Saving'}
      </Button>
      <Tooltip content="Save icon only" relationship="label">
        <Button actionState={buttonState} onClick={changeState} icon={<SaveRegular />} />
      </Tooltip>
    </div>
  );
};

ActionState.parameters = {
  docs: {
    description: {
      story:
        '- A button supports `none`, `inprogress` and `completed` state. Default state is `none`.\n' +
        '- `icon` slot can be used to specify a custom `inprogress` and `completed` state icon, and `iconPosition` prop can be used to specify the position.\n' +
        '- Button is not interactable(`onClick`) while it is in `inprogress` and `completed` state.',
    },
  },
};
