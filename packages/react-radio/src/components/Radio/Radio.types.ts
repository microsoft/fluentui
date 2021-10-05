import { ComponentProps, ComponentState, IntrinsicShorthandProps } from '@fluentui/react-utilities';

export type RadioSlots = {
  root: IntrinsicShorthandProps<'span'>;
};

export type RadioCommons = {};
/**
 * Radio Props
 */
export type RadioProps = ComponentProps<RadioSlots> &
  Partial<RadioCommons> & {
    /*
     * TODO Add props and slots here
     * Any slot property should be listed in the radioShorthandProps array below
     * Any property that has a default value should be listed in RadioDefaultedProps as e.g. 'size' | 'icon'
     */
  };

/**
 * Names of the shorthand properties in RadioProps
 */
export type RadioShorthandProps = never; // TODO add shorthand property names

/**
 * Names of RadioProps that have a default value in useRadio
 */
export type RadioDefaultedProps = never; // TODO add names of properties with default values

/**
 * State used in rendering Radio
 */
export type RadioState = ComponentState<RadioSlots> & RadioCommons;
