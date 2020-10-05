import { ISliderStyleProps, ISliderStyles } from '@fluentui/react/lib/Slider';

export const SliderStyles = (props: ISliderStyleProps): Partial<ISliderStyles> => {
  const { disabled, theme } = props;
  const { palette } = theme;

  return {
    activeSection: [
      disabled && {
        background: palette.neutralTertiaryAlt,
      },
    ],
  };
};
