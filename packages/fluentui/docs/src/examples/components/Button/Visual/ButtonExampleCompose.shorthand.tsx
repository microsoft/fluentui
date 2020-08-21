import {
  // compose,
  Button,
  ButtonProps,
  ButtonStylesProps,
  Flex,
  Header,
  Provider,
  ButtonContent,
  // ButtonContentProps,
  // ShorthandValue,
  // ButtonContentStylesProps,
  useButton,
  useButtonStyles,
  useTelemetry,
  Loader,
} from '@fluentui/react-northstar';
import { ComponentSlotStylesInput, ComponentVariablesInput, ThemeInput } from '@fluentui/styles';
import * as React from 'react';
import { useFluentContext } from '@fluentui/react-bindings';
import { mergeProps } from '@fluentui/react-compose/lib/next';

//
// Components
//

// Adds a custom design term
//

// type TertiaryButtonContentProps = {
//   tertiary?: boolean;
// };
//
// type TertiaryButtonContentStylesProps = TertiaryButtonContentProps;
//

type TertiaryButtonProps = ButtonProps & { tertiary?: boolean };

const useTertiaryButtonStyles = ({ props, rtl, displayName = 'TertiaryButton', overrides = {}, options = {} }) =>
  useButtonStyles({
    props,
    rtl,
    displayName,
    overrides: {
      ...overrides,
      className: (overrides as any).className || 'ui-tertiary-button',
      stylingTokens: {
        tertiary: props.tertiary,
        ...((overrides as any).stylingTokens || {}),
      },
    },
    options: {
      overrideStyles: (options as any).overrideStyles,
      displayNames: ['Button', 'TertiaryButton', ...((options as any).displayNames || [displayName])],
    },
  });

const TertiaryButton = React.forwardRef<HTMLElement, TertiaryButtonProps>((props, ref) => {
  const { state, render } = useButton(props, ref);
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Button.displayName, context.telemetry);
  setStart();

  const { size } = props;

  const { classes, styles: resolvedStyles } = useTertiaryButtonStyles({
    props,
    rtl: context.rtl,
  });

  mergeProps(state, {
    className: classes.root,
    styles: resolvedStyles.root,
    // TODO: previously icon was rendered as Box
    icon: {
      className: classes.icon,
      styles: resolvedStyles.icon,
    },
    loader: {
      as: Loader,
      className: classes.loader,
      styles: resolvedStyles.loader,
      role: undefined,
    },
    children: /* analogous to the `content` slot in v0 */ {
      as: ButtonContent,
      size,
      content: props.content,
    },
  });

  const result = render(state);
  setEnd();

  return result;
});

const useCompactTertiaryButtonStyles = ({
  props,
  rtl,
  displayName = 'CompactTertiaryButton',
  overrides = {},
  options = {},
}) =>
  useTertiaryButtonStyles({
    props,
    rtl,
    displayName,
    overrides: {
      ...overrides,
      className: (overrides as any).className || 'ui-compact-tertiary-button',
      stylingTokens: {
        tertiary: props.tertiary,
        ...((overrides as any).stylingTokens || {}),
      },
    },
    options: {
      overrideStyles: (options as any).overrideStyles,
      displayNames: [
        'Button',
        'TertiaryButton',
        'CompactTertiaryButton',
        ...((options as any).displayNames || [displayName]),
      ],
    },
  });

const CompactTertiaryButton = React.forwardRef<HTMLElement, TertiaryButtonProps>((props, ref) => {
  const { state, render } = useButton(props, ref);
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Button.displayName, context.telemetry);
  setStart();

  const { size } = props;

  const { classes, styles: resolvedStyles } = useCompactTertiaryButtonStyles({
    props,
    rtl: context.rtl,
  });

  mergeProps(state, {
    className: classes.root,
    styles: resolvedStyles.root,
    // TODO: previously icon was rendered as Box
    icon: {
      className: classes.icon,
      styles: resolvedStyles.icon,
    },
    loader: {
      as: Loader,
      className: classes.loader,
      styles: resolvedStyles.loader,
      role: undefined,
    },
    children: /* analogous to the `content` slot in v0 */ {
      as: ButtonContent,
      size,
      content: props.content,
    },
  });

  const result = render(state);
  setEnd();

  return result;
});

//
//
// const TertiaryButtonContent = compose<
//   'span',
//   TertiaryButtonContentProps,
//   TertiaryButtonContentStylesProps,
//   ButtonContentProps,
//   {}
// >(ButtonContent, {
//   displayName: 'TertiaryButtonContent',
//   mapPropsToStylesProps: props => ({ tertiary: props.tertiary }),
//   handledProps: ['tertiary'],
// });

const useOverriddenButtonStyles = ({ props, rtl, displayName = 'OverriddenButton', overrides = {}, options = {} }) =>
  useButtonStyles({
    props,
    rtl,
    displayName,
    overrides: {
      ...overrides,
      className: (overrides as any).className || 'ui-overridden-button',
      stylingTokens: {
        tertiary: props.tertiary,
        ...((overrides as any).stylingTokens || {}),
      },
    },
    options: {
      overrideStyles: (options as any).overrideStyles,
      displayNames: ['OverriddenButton', ...((options as any).displayNames || [displayName])],
    },
  });

type OverriddenButtonProps = ButtonProps & { fitted?: boolean };

const OverriddenButton = React.forwardRef<HTMLElement, OverriddenButtonProps>((props, ref) => {
  const { state, render } = useButton(props, ref);
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Button.displayName, context.telemetry);
  setStart();

  const { size } = props;

  const { classes, styles: resolvedStyles } = useOverriddenButtonStyles({
    props,
    rtl: context.rtl,
  });

  mergeProps(state, {
    className: classes.root,
    styles: resolvedStyles.root,
    // TODO: previously icon was rendered as Box
    icon: {
      className: classes.icon,
      styles: resolvedStyles.icon,
    },
    loader: {
      as: Loader,
      className: classes.loader,
      styles: resolvedStyles.loader,
      role: undefined,
    },
    children: /* analogous to the `content` slot in v0 */ {
      as: ButtonContent,
      size,
      content: props.content,
    },
  });

  const result = render(state);
  setEnd();

  return result;
});

//
// Theme
//

type ComponentStylesProps = {
  CompactTertiaryButton: ButtonStylesProps & TertiaryButtonProps;
  // CompactTertiaryButtonContent: ButtonContentProps;
  TertiaryButton: ButtonStylesProps & TertiaryButtonProps;
  // TertiaryButtonContent: ButtonContentStylesProps & TertiaryButtonContentProps;
  OverriddenButton: ButtonStylesProps & OverriddenButtonProps;
};

type ComponentVariables = {
  TertiaryButton: {
    tertiaryBackground: string;
    tertiaryBorderColor: string;
    tertiaryColor: string;
  };
  TertiaryButtonContent: {
    tertiaryFontWeight: string;
  };
  CompactTertiaryButton: {
    tertiaryPadding: string;
  };
  CompactTertiaryButtonContent: {
    fontSize: string;
  };
  OverriddenButton: {};
};

const componentStyles: {
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
  // TertiaryButtonContent: {
  //   root: ({ props: p, variables: v }) => ({
  //     ...(p.tertiary && {
  //       fontWeight: v.tertiaryFontWeight,
  //     }),
  //   }),
  // },
  CompactTertiaryButton: {
    root: ({ props: p, variables: v }) => ({
      ...(p.tertiary && {
        padding: v.tertiaryPadding,
      }),
    }),
  },
  // CompactTertiaryButtonContent: {
  //   root: ({ variables: v }) => ({
  //     fontSize: v.fontSize,
  //   }),
  // },

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
  TertiaryButtonContent: (siteVariables): ComponentVariables['TertiaryButtonContent'] => ({
    tertiaryFontWeight: siteVariables.fontWeightLight,
  }),
  CompactTertiaryButton: (): ComponentVariables['CompactTertiaryButton'] => ({
    tertiaryPadding: '0 .5rem',
  }),
  CompactTertiaryButtonContent: (siteVariables): ComponentVariables['CompactTertiaryButtonContent'] => ({
    fontSize: siteVariables.fontSizes.smaller,
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
      <TertiaryButton content="Click me" />
      <TertiaryButton content="Click here" tertiary />
      &nbsp;
      <TertiaryButton content="Click here" size="small" />
      <TertiaryButton content="Click here" tertiary size="small" />
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
