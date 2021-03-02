import * as React from 'react';
import { IStyleSet } from '@fluentui/react/lib/Styling';
import { IComponentPageStyles } from '@fluentui/react-docsite-components/lib/index';
import { fullWidth, fullHeight, contentPadding } from '../../styles/mixins';
import { ThemeProvider, PartialTheme } from '@fluentui/react/lib/Theme';

export interface IComponentPageProps {}

const componentPageStyles: IStyleSet<Partial<IComponentPageStyles>> = {
  root: [
    fullWidth(), // Component page has its own padding
    fullHeight(), // Remove padding at bottom of App-content
    { paddingBottom: 100 }, // Pad the content instead
  ],
  body: [
    // Override padding to match this website
    contentPadding('50px', '50px'),
    {
      selectors: {
        // Specific selectors to override excessive heading padding
        '.ms-Stack.ComponentPage-subHeading h2': { margin: 0 },
        '.ms-Stack.ComponentPage-doSectionHeader h3': { margin: 0 },
      },
    },
  ],
  overviewSection: {
    paddingTop: 0,
  },
};

const theme: PartialTheme = {
  components: {
    ComponentPage: { styles: componentPageStyles },
  },
};

export const ComponentPage: React.FunctionComponent = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};
