import { FontSizes, FontWeights } from '../../Styling';
import { IChoiceGroupStyleProps, IChoiceGroupStyles } from './ChoiceGroup.types';

export const getStyles = (props: IChoiceGroupStyleProps): IChoiceGroupStyles => {
  const { theme, className, optionsContainIconOrImage } = props;
  const { palette, semanticColors } = theme;

  return {
    applicationRole: className,
    root: [
      'ms-ChoiceFieldGroup',
      {
        display: 'block'
      }
    ],
    label: className,
    flexContainer: [
      'ms-ChoiceFieldGroup-flexContainer',
      optionsContainIconOrImage && {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
      }
    ]
  };
};