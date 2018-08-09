import { IThemedProps } from '../../../Foundation';
import { IStackItemProps, IStackItemStyles } from './StackItem.types';

const alignMap: { [key: string]: string } = {
  start: 'flex-start',
  end: 'flex-end'
};

export const styles = (props: IThemedProps<IStackItemProps>): IStackItemStyles => {
  const { grow, shrink, preventShrink, align, gap, horizontal, className } = props;

  return {
    root: [
      grow && { flexGrow: grow === true ? 1 : grow },
      (preventShrink || (!grow && !shrink)) && { flexShrink: 0 },
      align && {
        alignSelf: alignMap[align] || align
      },
      {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      },
      !!gap && {
        [horizontal ? 'marginLeft' : 'marginTop']: gap
      },
      className
    ]
    // TODO: this cast may be hiding some potential issues with styling and name
    //        lookups and should be removed
  } as IStackItemStyles;
};
