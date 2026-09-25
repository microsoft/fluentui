import type {
  InteractionTagSecondaryProps as InteractionTagSecondaryBaseProps,
  InteractionTagSecondaryState as InteractionTagSecondaryBaseState,
} from '@fluentui/react-headless-components-preview/interaction-tag';
export type { InteractionTagSecondarySlots } from '@fluentui/react-headless-components-preview/interaction-tag';

export type InteractionTagSecondaryProps = InteractionTagSecondaryBaseProps;

export type InteractionTagSecondaryState = InteractionTagSecondaryBaseState & {
  appearance: 'brand' | 'filled' | 'outline';
  shape: 'circular' | 'rounded';
  size: 'extra-small' | 'small' | 'medium';
  root: InteractionTagSecondaryBaseState['root'] & {
    'data-appearance': 'brand' | 'filled' | 'outline';
    'data-shape': 'circular' | 'rounded';
    'data-size': 'extra-small' | 'small' | 'medium';
  };
};
