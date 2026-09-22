import type {
  InfoButtonProps as InfoButtonBaseProps,
  InfoButtonState as InfoButtonBaseState,
} from '@fluentui/react-headless-components-preview/info-label';
export type { InfoButtonSlots } from '@fluentui/react-headless-components-preview/info-label';

export type InfoButtonProps = InfoButtonBaseProps & {
  /** @default 'medium' */
  size?: 'small' | 'medium' | 'large';
};

export type InfoButtonState = InfoButtonBaseState & {
  size: NonNullable<InfoButtonProps['size']>;
  info: InfoButtonBaseState['info'] & {
    'data-size': NonNullable<InfoButtonProps['size']>;
  };
  root: InfoButtonBaseState['root'] & {
    'data-size': NonNullable<InfoButtonProps['size']>;
  };
};
