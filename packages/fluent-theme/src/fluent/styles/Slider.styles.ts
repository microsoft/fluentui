import { ISliderStyleProps } from 'office-ui-fabric-react/lib/Slider';

export const SliderStyles = (props: ISliderStyleProps) => {
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
