export interface PrivateButtonProps {
  emphasis?: 'quiet' | 'strong';
}

export interface PrivateButtonState {
  root: {
    'data-emphasis'?: PrivateButtonProps['emphasis'];
  };
}

export declare const PrivateButton: (props: PrivateButtonProps) => PrivateButtonState;
