import { RadioState, RadioProps } from '@fluentui/react-radio';

/**
 * ToolbarRadio Props
 */
export type ToolbarRadioProps = RadioProps & {
  size?: 'small' | 'medium';
};

/**
 * State used in rendering ToolbarRadio
 */
export type ToolbarRadioState = RadioState & {
  size?: 'small' | 'medium';
};
