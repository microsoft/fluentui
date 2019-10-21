import { IChoiceGroupStyleProps, IChoiceGroupStyles } from './ChoiceGroup.types';
import { getGlobalClassNames } from '../../Styling';

const GlobalClassNames = {
  root: 'ms-ChoiceFieldGroup',
  flexContainer: 'ms-ChoiceFieldGroup-flexContainer'
};

export const getStyles = (props: IChoiceGroupStyleProps): IChoiceGroupStyles => {
  const { className, optionsContainIconOrImage, theme } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    // TODO (Fabric 8?) - merge className back into `root` and apply root style to
    // the actual root role=application element
    applicationRole: className,
    root: [
      classNames.root,
      theme.fonts.medium,
      {
        display: 'block'
      }
    ],
    flexContainer: [
      classNames.flexContainer,
      optionsContainIconOrImage && {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap'
      }
    ]
  };
};
