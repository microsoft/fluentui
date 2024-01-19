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
  const [count, setCount] = React.useState<number>(0);

  function changeState() {
    setButtonState('inprogress');
    setCount(count + 1);
    setTimeout(() => {
      setButtonState('complete');
      setTimeout(() => {
        setButtonState('none');
      }, 3000);
    }, 3000);
  }

  return (
    <>
      <div className={styles.wrapper}>
        <Button actionState={buttonState} onClick={changeState} appearance="primary">
          {buttonState === 'none' ? 'Save' : null}
        </Button>
        <Button actionState={buttonState} onClick={changeState} shape="circular">
          {buttonState === 'none' ? 'Save' : null}
        </Button>
        <Button
          actionState={buttonState}
          onClick={changeState}
          // icon={}
          icon={
            buttonState === 'none' ? (
              <Cloud20Regular />
            ) : buttonState === 'complete' ? (
              <CloudCheckmark20Regular />
            ) : (
              <CloudSync20Regular />
            )
          }
        >
          {buttonState === 'none' ? 'Save' : buttonState === 'complete' ? 'Saved' : 'Saving'}
        </Button>
        <Tooltip content="Save icon only" relationship="label">
          <Button actionState={buttonState} onClick={changeState} icon={<SaveRegular />} />
        </Tooltip>
        <Button actionState={buttonState} onClick={changeState} size="small">
          Save
        </Button>
        <Button actionState={buttonState} onClick={changeState} size="large">
          Save
        </Button>
      </div>
      <p> Button Clicked: {count}</p>
    </>
  );
};

ActionState.parameters = {
  docs: {
    description: {
      story: 'A button supports `none`, `inprogress` and `complete` state. Default state is `none`.',
    },
  },
};
