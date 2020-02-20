import React from 'react';
import { createTheme, ITheme, ThemeProvider } from '@fluentui/react-theming';
import { Link } from './Link';
import { LinkBase } from './Link.base';

export default {
  component: 'Link',
  title: 'Link',
};

const defaultColorRamp = {
  values: [],
  index: -1,
};

const fluentLight: ITheme = createTheme({
  direction: 'ltr',
  colors: {
    background: 'white',
    bodyText: 'black',
    subText: '#333',
    disabledText: '#ccc',
    brand: defaultColorRamp,
    accent: defaultColorRamp,
    neutral: defaultColorRamp,
    success: defaultColorRamp,
    warning: defaultColorRamp,
    danger: defaultColorRamp,
    text: defaultColorRamp,
  },
  components: {},
  icons: {},
  radius: {
    base: 0,
    scale: 0,
    unit: 'px',
  },
  fonts: {
    default: '',
    userContent: '',
    mono: '',
  },
  fontSizes: {
    base: 0,
    scale: 0,
    unit: 'px',
  },
  animations: {
    fadeIn: {},
    fadeOut: {},
  },
  spacing: {
    base: 0,
    scale: 0,
    unit: 'px',
  },

  schemes: {
    header: {
      colors: {
        background: 'black',
        bodyText: 'white',
      },
    },
  },
});

const Wrapper = (p: React.HTMLAttributes<any>) => <ThemeProvider theme={fluentLight} {...p} />;

export const baseLink = () => <LinkBase href="https://www.bing.com">Link with href</LinkBase>;

export const baseLinkWithoutHref = () => <LinkBase>Link without href</LinkBase>;

export const fluentLink = () => (
  <Wrapper>
    A link can be <Link href="https://www.bing.com">part of a text like this</Link>, whether it has an href or{' '}
    <Link>whether it does not</Link>. It can{' '}
    <Link disabled href="https://www.bing.com">
      even be disabled
    </Link>
    .
  </Wrapper>
);
