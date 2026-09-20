import type {
  InteractionTagProps as InteractionTagBaseProps,
  InteractionTagState as InteractionTagBaseState,
} from '@fluentui/react-headless-components-preview/interaction-tag';
export type { InteractionTagSlots } from '@fluentui/react-headless-components-preview/interaction-tag';

export type InteractionTagProps = InteractionTagBaseProps & {
  appearance?: 'brand' | 'filled' | 'outline';
  shape?: 'circular' | 'rounded';
  size?: 'extra-small' | 'small' | 'medium';
};

export type InteractionTagState = InteractionTagBaseState & {
  appearance: NonNullable<InteractionTagProps['appearance']>;
  shape: NonNullable<InteractionTagProps['shape']>;
  size: NonNullable<InteractionTagProps['size']>;
  root: InteractionTagBaseState['root'] & {
    'data-appearance': NonNullable<InteractionTagProps['appearance']>;
    'data-shape': NonNullable<InteractionTagProps['shape']>;
    'data-size': NonNullable<InteractionTagProps['size']>;
  };
};
