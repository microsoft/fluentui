import { ICheckStyleProps } from 'office-ui-fabric-react/lib/Check';

export const CheckStyles = (props: ICheckStyleProps) => {
  const { theme, checked } = props;
  const { palette } = theme;

  return {
    circle: [!checked && { color: palette.neutralSecondary }],
    check: [!checked && { color: palette.neutralSecondary }]
  };
};
