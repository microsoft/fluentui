import { IThemedProps } from '../../../Foundation';
import { getGlobalClassNames } from '../../../Styling';
import { IVerticalStackProps, IVerticalStackStyles } from './VerticalStack.types';

const GlobalClassNames = {
  root: 'ms-VerticalStack'
};

export const styles = (props: IThemedProps<IVerticalStackProps>): IVerticalStackStyles => {
  const { className, theme } = props;
  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [classNames.root, className]
    // TODO: this cast may be hiding some potential issues with styling and name
    //        lookups and should be removed
  } as IVerticalStackStyles;
};
