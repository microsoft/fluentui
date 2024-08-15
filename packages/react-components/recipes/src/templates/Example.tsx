import * as React from 'react';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { mergeClasses } from '@griffel/react';
import { useExampleStyles } from './Example.styles';

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
