import * as React from 'react';

import { Button } from '@fluentui/react-button';
import { Label } from '@fluentui/react-label';
import { getStylesFromClassName, makeStyles, shorthands } from '@fluentui/react-platform-adapter-preview';
import { FluentProvider } from '@fluentui/react-provider';
import { tokens, webLightTheme } from '@fluentui/react-theme';
import { ButtonStories } from './stories/Button/ButtonStories.stories';

const useClassNames = makeStyles({
  root: {
    ...shorthands.border('2px', 'solid', 'red'),
    backgroundColor: tokens.colorNeutralBackground2,
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const StrictDomDemo = (props: { cond?: boolean }) => {
  const { cond } = props;

  const classNames = useClassNames();

  return (
    <FluentProvider theme={webLightTheme} className={classNames.root}>
      <Label required>Required label</Label>
      <Button appearance="primary">Primary button</Button>
      <ButtonStories />
    </FluentProvider>
  );
};
