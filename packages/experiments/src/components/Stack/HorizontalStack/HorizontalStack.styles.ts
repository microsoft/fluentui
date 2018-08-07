import { IThemedProps } from '../../../Foundation';
import { IHorizontalStackProps, IHorizontalStackStyles } from './HorizontalStack.types';

export const styles = (props: IThemedProps<IHorizontalStackProps>): IHorizontalStackStyles => {
  const { className } = props;
  return {
    root: [className]
    // TODO: this cast may be hiding some potential issues with styling and name
    //        lookups and should be removed
  } as IHorizontalStackStyles;
};
