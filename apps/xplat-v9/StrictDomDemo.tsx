import * as React from 'react';

import { Label } from '@fluentui/react-label';
import { Dropdown, Option } from '@fluentui/react-combobox';
import { mergeClasses, makeStyles, shorthands } from '@fluentui/react-platform-adapter-preview';
import { FluentProvider } from '@fluentui/react-provider';
import { tokens, webLightTheme } from '@fluentui/react-theme';
import { ButtonStories } from './stories/Button/ButtonStories';

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

export const StrictDomDemo = () => {
  const classNames = useClassNames();

  return (
    <FluentProvider theme={webLightTheme} className={mergeClasses(classNames.root)}>
      <Label required>Label</Label>
      <h1>Dropdown</h1>
      <Dropdown inlinePopup>
        <Option>Option 1</Option>
        <Option>Option 2</Option>
        <Option>Option 3</Option>
      </Dropdown>
      <ButtonStories />
    </FluentProvider>
  );
};
