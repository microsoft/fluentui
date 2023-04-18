import * as React from 'react';
import {
  FluentProvider,
  makeStyles,
  mergeClasses,
  shorthands,
  tokens,
  webLightTheme,
} from '@fluentui/react-components';

const useExampleStyles = makeStyles({
  root: {
    ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    ...shorthands.borderRadius('16px'),
    ...shorthands.padding('30px'),
    ...shorthands.margin('6px'),
  },
  innerContainer: {
    display: 'flex',
    backgroundColor: 'rgb(250, 250, 250)',
    ...shorthands.padding('48px', '24px', '48px', '24px'),
  },
  centered: {
    justifyContent: 'center',
  },
});

export const TemplateExample: React.FC<{ centered?: boolean }> = ({ children, centered }) => {
  const exampleStyles = useExampleStyles();

  const innerContainerClassName = mergeClasses(exampleStyles.innerContainer, centered && exampleStyles.centered);

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={exampleStyles.root}>
        <div className={innerContainerClassName}>{children}</div>
      </div>
    </FluentProvider>
  );
};
