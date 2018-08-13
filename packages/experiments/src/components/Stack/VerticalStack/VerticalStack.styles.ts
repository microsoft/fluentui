import { IThemedProps } from '../../../Foundation';
import { IVerticalStackProps, IVerticalStackStyles } from './VerticalStack.types';

export const styles = (props: IThemedProps<IVerticalStackProps>): IVerticalStackStyles => {
  const { className } = props;
  return {
    root: [className]
    // TODO: this cast may be hiding some potential issues with styling and name
    //        lookups and should be removed
  } as IVerticalStackStyles;
};
