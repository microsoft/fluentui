import { IThemedProps } from '../../../Foundation';
import { IStackItemProps, IStackItemStyles } from './StackItem.types';

const alignMap: { [key: string]: string } = {
  start: 'flex-start',
  end: 'flex-end'
};

export const styles = (props: IThemedProps<IStackItemProps>): IStackItemStyles => {
  const { grow, shrink, preventShrink, align, className } = props;

  return {
    root: [
      'ms-StackItem',
      grow && { flexGrow: grow === true ? 1 : grow },
      (preventShrink || (!grow && !shrink)) && {
        flexShrink: 0
      },
      shrink &&
        !preventShrink && {
          flexShrink: 1
        },
      align && {
        alignSelf: alignMap[align] || align
      },
      className
    ]
    // TODO: this cast may be hiding some potential issues with styling and name
    //        lookups and should be removed
  } as IStackItemStyles;
};
