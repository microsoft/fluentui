import * as React from 'react';
import { makeStyles, Button, tokens, FluentProvider, mergeClasses } from '@fluentui/react-components';
import { ArrowReply16Regular, MoreHorizontal20Regular, Share16Regular } from '@fluentui/react-icons';
import { CardFooter } from '@fluentui/react-components';
import type { CardState, FluentProviderCustomStyleHooks } from '@fluentui/react-components';

const useCardFooterStyle = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground3,
    width: '300px',
    margin: 'auto',
  },
});

const useCardFooterStyles = (state: unknown) => {
  const cardStyles = useCardFooterStyle();
  const componentState = state as CardState;
  componentState.root.className = mergeClasses(componentState.root.className, cardStyles.root);
};

const CUSTOM_STYLE_HOOKS: FluentProviderCustomStyleHooks = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useCardFooterStyles_unstable: useCardFooterStyles,
};

const useStyles = makeStyles({
  footer: {
    width: '300px',
  },
});

export const Default = () => {
  const styles = useStyles();

  return (
    <FluentProvider customStyleHooks_unstable={CUSTOM_STYLE_HOOKS}>
      <CardFooter
        className={styles.footer}
        action={<Button appearance="transparent" icon={<MoreHorizontal20Regular />} aria-label="More options" />}
      >
        <Button icon={<ArrowReply16Regular />}>Reply</Button>
        <Button icon={<Share16Regular />}>Share</Button>
      </CardFooter>
    </FluentProvider>
  );
};
