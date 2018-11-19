import { getGlobalClassNames } from '../../../Styling';
import { IVerticalStackComponent, IVerticalStackStyles } from './VerticalStack.types';

const GlobalClassNames = {
  root: 'ms-VerticalStack'
};

export const styles: IVerticalStackComponent['styles'] = props => {
  const { className, theme } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [classNames.root, className, theme.fonts.medium]
    // TODO: this cast may be hiding some potential issues with styling and name
    //        lookups and should be removed
  } as IVerticalStackStyles;
};
