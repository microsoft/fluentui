import type {
  CompoundButtonBaseProps,
  CompoundButtonBaseState,
  CompoundButtonSlots as CompoundButtonBaseSlots,
} from '@fluentui/react-button';

/**
 * CompoundButton component slots.
 */
export type CompoundButtonSlots = CompoundButtonBaseSlots;

/**
 * CompoundButton component props.
 */
export type CompoundButtonProps = CompoundButtonBaseProps;

/**
 * CompoundButton component state.
 */
export type CompoundButtonState = CompoundButtonBaseState & {
  root: {
    /**
     * Data attribute set when the button is disabled.
     */
    'data-disabled'?: string;

    /**
     * Data attribute set when the button is disabled but still focusable.
     */
    'data-disabled-focusable'?: string;

    /**
     * Data attribute set when the button renders only an icon.
     */
    'data-icon-only'?: string;

    /**
     * Data attribute set when secondary content is rendered.
     */
    'data-has-secondary-content'?: string;
  };
};
