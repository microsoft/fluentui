import * as React from 'react';
import { buttonClassNames, makeStyles, tokens, Button, Spinner } from '@fluentui/react-components';
import { CheckmarkFilled } from '@fluentui/react-icons';
// eslint-disable-next-line @fluentui/no-restricted-imports
import { useTimeout } from '@fluentui/react-utilities';

const useStyles = makeStyles({
  wrapper: {
    columnGap: '15px',
    display: 'flex',
  },
  buttonNonInteractive: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    color: tokens.colorNeutralForeground1,
    cursor: 'default',
    pointerEvents: 'none',

    [`& .${buttonClassNames.icon}`]: {
      color: tokens.colorStatusSuccessForeground1,
    },
  },
});

type LoadingState = 'initial' | 'loading' | 'loaded';

export const Loading = () => {
  const styles = useStyles();

  const [loadingState, setLoadingState] = React.useState<LoadingState>('initial');

  const [setTimeout, cancelTimeout] = useTimeout();

  const onButtonClick = () => {
    setLoadingState('loading');
    setTimeout(() => setLoadingState('loaded'), 5000);
  };

  const buttonContent = loadingState === 'loading' ? 'Loading' : loadingState === 'loaded' ? 'Loaded' : 'Start loading';

  const buttonIcon =
    loadingState === 'loading' ? <Spinner size="tiny" /> : loadingState === 'loaded' ? <CheckmarkFilled /> : null;

  const buttonClassName = loadingState === 'initial' ? undefined : styles.buttonNonInteractive;

  const onResetButtonClick = () => {
    cancelTimeout();
    setLoadingState('initial');
  };

  return (
    <div className={styles.wrapper}>
      <Button
        className={buttonClassName}
        disabledFocusable={loadingState !== 'initial'}
        icon={buttonIcon}
        onClick={onButtonClick}
      >
        {buttonContent}
      </Button>
      <Button onClick={onResetButtonClick}>Reset loading state</Button>
    </div>
  );
};

Loading.parameters = {
  docs: {
    description: {
      story: "You can customize a Button's contents and styles to simulate a convincing loading state.",
    },
  },
};
