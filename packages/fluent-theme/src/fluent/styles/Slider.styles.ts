import { ISliderStyleProps, ISliderStyles } from 'office-ui-fabric-react';

export const SliderStyles = (props: ISliderStyleProps): Partial<ISliderStyles> => {
  const { disabled, theme } = props;
  const { palette } = theme;

  return {
    activeSection: [
      disabled && {
        background: palette.neutralTertiary
      }
    ]
  };
};
