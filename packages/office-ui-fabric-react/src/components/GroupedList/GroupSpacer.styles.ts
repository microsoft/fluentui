import { IGroupSpacerProps, IGroupSpacerStyleProps, IGroupSpacerStyles } from './GroupSpacer.types';
import { getGlobalClassNames } from '../../Styling';

export { IGroupSpacerProps };

const GlobalClassNames = {
  root: 'ms-GroupSpacer'
};

export const getStyles = (props: IGroupSpacerStyleProps): IGroupSpacerStyles => {
  const { theme, width } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [classNames.root, theme.fonts.medium, { display: 'inline-block', width: width }]
  };
};
