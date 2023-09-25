import { getGlobalClassNames } from '../../Styling';
import type { IChoiceGroupStyleProps, IChoiceGroupStyles } from './ChoiceGroup.types';

const GlobalClassNames = {
  root: 'ms-ChoiceFieldGroup',
  flexContainer: 'ms-ChoiceFieldGroup-flexContainer',
};

export const getStyles = (props: IChoiceGroupStyleProps): IChoiceGroupStyles => {
  const { className, optionsContainIconOrImage, theme } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      className,
      classNames.root,
      theme.fonts.medium,
      {
        display: 'block',
      },
    ],
    flexContainer: [
      classNames.flexContainer,
      optionsContainIconOrImage && {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
    ],
  };
};
