import { compose, Button, ButtonProps, ButtonStylesProps, Flex, Header, Provider } from '@fluentui/react-northstar';
import { ComponentSlotStylesInput, ComponentVariablesInput, ThemeInput } from '@fluentui/styles';
import * as React from 'react';

//
// Components
//

// Adds a custom design term
//

type TertiaryButtonProps = {
  tertiary?: boolean;
};

type TertiaryButtonStylesProps = TertiaryButtonProps;

const TertiaryButton = compose<'button', TertiaryButtonProps, TertiaryButtonStylesProps, ButtonProps, {}>(Button, {
  className: 'ui-tertiary-button',
  displayName: 'TertiaryButton',
  mapPropsToStylesProps: props => ({ tertiary: props.tertiary }),
  handledProps: ['tertiary'],
});

// Adds overrides for a design term
//

const CompactTertiaryButton = compose(TertiaryButton, {
  displayName: 'CompactTertiaryButton',
});

// Composes custom button
//

type OverriddenButtonProps = {
  fitted?: boolean;
};

type OverriddenButtonStylesProps = Required<OverriddenButtonProps>;

const OverriddenButton = compose<'button', OverriddenButtonProps, OverriddenButtonStylesProps, ButtonProps, {}>(
  Button,
  {
    className: 'ui-overridden-button',
    displayName: 'OverriddenButton',
    mapPropsToStylesProps: props => ({
      fitted: props.fitted,
    }),
    handledProps: ['fitted'],
    overrideStyles: true,
  },
);

//
// Theme
//

type ComponentStylesProps = {
  CompactTertiaryButton: ButtonStylesProps & TertiaryButtonProps;
  TertiaryButton: ButtonStylesProps & TertiaryButtonProps;
  OverriddenButton: ButtonStylesProps & OverriddenButtonProps;
};

type ComponentVariables = {
  TertiaryButton: {
    tertiaryBackground: string;
    tertiaryBorderColor: string;
    tertiaryColor: string;
  };
  CompactTertiaryButton: {
    tertiaryPadding: string;
  };
};

const componentStyles: {
  // @ts-ignore TODO fix type there
  [C in keyof ComponentStylesProps]: ComponentSlotStylesInput<ComponentStylesProps[C], ComponentVariables[C]>;
} = {
  TertiaryButton: {
    root: ({ props: p, variables: v }) => ({
      ...(p.tertiary && {
        background: v.tertiaryBackground,
        borderColor: v.tertiaryBorderColor,
        color: v.tertiaryColor,
      }),
    }),
  },
  CompactTertiaryButton: {
    root: ({ props: p, variables: v }) => ({
      ...(p.tertiary && {
        padding: v.tertiaryPadding,
      }),
    }),
  },

  OverriddenButton: {
    root: ({ props: p }) => ({
      backgroundColor: '#c0c1c2',
      borderRadius: '.28571429rem',
      border: 'none',

      margin: '0 .25em 0 0',
      padding: '.78571429em 1.5em .78571429em',
      minHeight: '1em',
      outline: 0,

      fontSize: '1rem',
      fontWeight: 700,
      fontStyle: 'normal',
      lineHeight: '1em',
      textAlign: 'center',

      textDecoration: 'none',

      cursor: 'pointer',
      display: 'inline-block',
      verticalAlign: 'baseline',

      ...(p.fitted && { padding: '.78571429em' }),
      ...(p.primary && {
        backgroundColor: '#2185d0',
        color: '#fff',
      }),
    }),
  },
};

const componentVariables: ComponentVariablesInput = {
  TertiaryButton: (siteVariables): ComponentVariables['TertiaryButton'] => ({
    tertiaryBackground: siteVariables.colorScheme.default.background3,
    tertiaryBorderColor: siteVariables.colorScheme.default.border2,
    tertiaryColor: siteVariables.colorScheme.default.foreground3,
  }),
  CompactTertiaryButton: (): ComponentVariables['CompactTertiaryButton'] => ({
    tertiaryPadding: '0 .5rem',
  }),
};

const customTheme: ThemeInput<ComponentStylesProps> = {
  componentStyles,
  componentVariables,
};

//
// Example
//

const ButtonExample = () => (
  <Provider theme={customTheme}>
    <Header as="h3" content="A tertiary button" description="Adds a custom design term" />
    <Flex>
      <TertiaryButton content="Click here" />
      <TertiaryButton content="Click here" tertiary />
    </Flex>

    <Header as="h3" content="A tertiary button" description="Provides overrides for a design term" />
    <Flex>
      <CompactTertiaryButton content="Click here" />
      <CompactTertiaryButton content="Click here" tertiary />
    </Flex>

    <Header as="h3" content="An overridden button" description="All styles will be empty" />
    <Flex>
      <OverriddenButton content="Overridden" />
      <OverriddenButton content="With `fitted`" fitted />
      <OverriddenButton content="With `primary`" primary />
      <OverriddenButton content="With `fitted` & `primary`" fitted primary />
    </Flex>
  </Provider>
);

export default ButtonExample;
