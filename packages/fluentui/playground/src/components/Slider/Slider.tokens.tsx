import { IToken } from '@fluentui/react-theming';

export interface ISliderTokens {
  railBorderRadius: IToken;
  railColor: IToken;
  railColorDisabled: IToken;
  railColorHovered: IToken;
  railColorPressed: IToken;
  railSize: IToken;
  size: IToken;
  thumbBorderColor: IToken;
  thumbBorderColorDisabled: IToken;
  thumbBorderRadius: IToken;
  thumbBorderWidth: IToken;
  thumbColor: IToken;
  thumbColorDisabled: IToken;
  thumbColorFocused: IToken;
  thumbColorHovered: IToken;
  thumbColorPressed: IToken;
  thumbSize: IToken;
  thumbSizePressed: IToken;
  trackBorderRadius: IToken;
  trackColor: IToken;
  trackColorDisabled: IToken;
  trackColorHovered: IToken;
  trackColorPressed: IToken;
  trackSize: IToken;
}

const SliderTokens = {
  size: 28,
  railBorderRadius: 4,
  railColor: 'rgb(200, 198, 196)',
  railColorDisabled: 'rgb(243, 242, 241)',
  railColorHovered: 'rgb(222, 236, 249)',
  railColorPressed: { dependsOn: 'railColorHovered' },
  railSize: 4,
  thumbBorderColor: 'rgb(96, 94, 92)',
  thumbBorderColorHovered: 'rgb(0, 90, 158)',
  thumbBorderColorDisabled: 'rgb(200, 198, 196)',
  thumbBorderRadius: 50,
  thumbBorderWidth: 2,
  thumbColor: '#FFF',
  thumbColorDisabled: '#FFF',
  thumbColorFocused: '#FFF',
  thumbColorHovered: '#FFF',
  thumbColorPressed: '#FFF',
  thumbSize: 16,
  thumbSizePressed: { dependsOn: 'thumbSize' },
  trackBorderRadius: 4,
  trackColor: 'rgb(96, 94, 92)',
  trackColorDisabled: 'rgb(161, 159, 157)',
  trackColorHovered: 'rgb(0, 120, 212)',
  trackColorPressed: { dependsOn: 'trackColorHovered' },
  trackSize: 4,
};

export default SliderTokens;
