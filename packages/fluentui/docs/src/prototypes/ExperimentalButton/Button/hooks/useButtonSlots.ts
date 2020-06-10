import {
  ButtonContent,
  Box,
  Loader,
  createShorthand,
  ButtonProps,
  BoxProps,
  CreateShorthandOptions,
  ButtonContentProps,
  LoaderProps,
  callable,
} from '@fluentui/react-northstar';
import * as React from 'react';
import { UseAccessibilityResult, UseStylesResult } from '@fluentui/react-bindings';
import { Extendable } from '@fluentui/styles';

const ButtonIcon = Box;
const ButtonLoader = Loader;

export type ButtonSlotsOptional = {
  icon?: React.ElementType;
  content?: React.ElementType;
  loader?: React.ElementType;
};
export type ButtonSlots = Required<ButtonSlotsOptional>;

export type ButtonSlotProps = {
  icon?: CreateShorthandOptions<Extendable<BoxProps>>;
  loader?: CreateShorthandOptions<Extendable<LoaderProps>>;
  content?: CreateShorthandOptions<Extendable<ButtonContentProps>>;
};

type UseButtonSlotsInput<P extends ButtonProps> = {
  props: P;
  slots?: ButtonSlots;
  slotProps?: ButtonSlotProps;
  getA11yProps: UseAccessibilityResult;
  classes: UseStylesResult['classes'];
  overrides: {
    slots?: ButtonSlotsOptional;
    slotProps?: ButtonSlotProps;
  };
};

const useButtonSlots = <P extends ButtonProps = ButtonProps>({
  slots = { icon: ButtonIcon, content: ButtonContent, loader: ButtonLoader },
  props,
  slotProps,
  getA11yProps,
  classes,
  overrides,
}: UseButtonSlotsInput<P>) => {
  const { icon: iconSlotProps = {}, content: contentSlotProps = {}, loader: loaderSlotProps = {} } = slotProps || {
    content: {
      defaultProps: () => ({ size: props.size }),
    },
  };

  const {
    slots: overridesSlots,
    slotProps: overrideSlotProps = {
      icon: {},
      content: {},
      loader: {},
    },
  } = overrides || {};

  return {
    icon: createShorthand(overridesSlots?.icon || slots.icon, props.icon, {
      defaultProps: () =>
        getA11yProps('icon', {
          className: classes.icon,
          ...(iconSlotProps.defaultProps && iconSlotProps.defaultProps()),
          ...(overrideSlotProps.icon.defaultProps && overrideSlotProps.icon.defaultProps()),
        }),
      ...(overrideSlotProps.icon.overrideProps && {
        overrideProps: callable(overrideSlotProps.icon.overrideProps)(props),
      }),
    }),
    content: createShorthand(overridesSlots?.content || slots.content, props.content, {
      defaultProps: () =>
        getA11yProps('content', {
          ...(contentSlotProps.defaultProps && contentSlotProps.defaultProps()),
          ...(overrideSlotProps.content.defaultProps && overrideSlotProps.content.defaultProps()),
        }),
      ...(overrideSlotProps.content.overrideProps && {
        overrideProps: callable(overrideSlotProps.content.overrideProps)(props),
      }),
    }),
    loader: createShorthand(overridesSlots?.loader || slots.loader, props.loader || {}, {
      defaultProps: () =>
        getA11yProps('loader', {
          className: classes.loader,
          ...(loaderSlotProps.defaultProps && loaderSlotProps.defaultProps()),
          ...(overrideSlotProps.loader.defaultProps && overrideSlotProps.loader.defaultProps()),
        }),
      ...(overrideSlotProps.loader.overrideProps && {
        overrideProps: callable(overrideSlotProps.loader.overrideProps)(props),
      }),
    }),
  };
};

export default useButtonSlots;
