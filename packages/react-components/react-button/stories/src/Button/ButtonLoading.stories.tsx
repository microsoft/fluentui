import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, Button, Spinner } from '@fluentui/react-components';
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
  },
  // There is no public class-name handle on a component's internals — the `icon` slot's
  // own `className` prop is the supported way to style it. This used to be a
  // `& .${buttonClassNames.icon}` descendant rule; the icon is only ever rendered in the
  // same two states that applied `buttonNonInteractive`, so passing the class straight to
  // the slot selects exactly the same elements.
  icon: {
    color: tokens.colorStatusSuccessForeground1,
  },
});

type LoadingState = 'initial' | 'loading' | 'loaded';

export const Loading = (): JSXElement => {
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
        icon={buttonIcon && { children: buttonIcon, className: styles.icon }}
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
