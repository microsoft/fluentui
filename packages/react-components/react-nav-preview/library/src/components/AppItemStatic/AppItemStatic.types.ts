import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type AppItemStaticSlots = {
  root: Slot<'div'>;
};

/**
 * AppItemStatic Props
 */
export type AppItemStaticProps = ComponentProps<AppItemStaticSlots> & {};

/**
 * State used in rendering AppItemStatic
 */
export type AppItemStaticState = ComponentState<AppItemStaticSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from AppItemStaticProps.
// & Required<Pick<AppItemStaticProps, 'propName'>>
