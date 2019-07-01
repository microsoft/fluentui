import { ISpinnerStyles, ISpinnerProps } from 'office-ui-fabric-react/lib/Spinner';

export const SpinnerStyles = (props: ISpinnerProps): Partial<ISpinnerStyles> => {
  const { theme, labelPosition } = props;
  if (!theme) {
    throw new Error('Theme is undefined or null.');
  }
  return {
    label: [
      theme.fonts.small,
      {
        margin: '8px 0 0'
      },
      labelPosition === 'top' && {
        margin: '0 0 8px'
      },
      labelPosition === 'right' && {
        margin: '0 0 0 8px'
      },
      labelPosition === 'left' && {
        margin: '0 8px 0 0'
      }
    ]
  };
};
