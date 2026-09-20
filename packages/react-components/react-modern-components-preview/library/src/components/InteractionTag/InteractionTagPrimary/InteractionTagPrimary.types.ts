import type {
  InteractionTagPrimaryProps as InteractionTagPrimaryBaseProps,
  InteractionTagPrimaryState as InteractionTagPrimaryBaseState,
} from '@fluentui/react-headless-components-preview/interaction-tag';
export type {
  InteractionTagPrimaryContextValues,
  InteractionTagPrimarySlots,
} from '@fluentui/react-headless-components-preview/interaction-tag';

export type InteractionTagPrimaryProps = InteractionTagPrimaryBaseProps;

export type InteractionTagPrimaryState = InteractionTagPrimaryBaseState & {
  appearance: 'brand' | 'filled' | 'outline';
  avatarShape: 'circular' | 'square';
  avatarSize: 16 | 20 | 28;
  shape: 'circular' | 'rounded';
  size: 'extra-small' | 'small' | 'medium';
  root: InteractionTagPrimaryBaseState['root'] & {
    'data-appearance': 'brand' | 'filled' | 'outline';
    'data-has-media'?: string;
    'data-shape': 'circular' | 'rounded';
    'data-size': 'extra-small' | 'small' | 'medium';
  };
};
