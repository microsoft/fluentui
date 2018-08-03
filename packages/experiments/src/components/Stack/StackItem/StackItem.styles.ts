import { IThemedProps } from '../../../Foundation';
import { IStackItemProps, IStackItemStyles } from './StackItem.types';

const alignMap: { [key: string]: string } = {
  start: 'flex-start',
  end: 'flex-end'
};
const justifyMap: { [key: string]: string } = {};

export const styles = (props: IThemedProps<IStackItemProps>): IStackItemStyles => {
  const { grow, collapse, align, justify, gap, vertical } = props;

  return {
    root: [
      grow && { flexGrow: grow === true ? 1 : grow },
      !grow && !collapse && { flexShrink: 0 },
      align && {
        alignSelf: alignMap[align] || align
      },
      justify && {
        justifyContent: justifyMap[justify] || justify
      },
      {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      },
      !!gap && {
        [vertical ? 'marginTop' : 'marginLeft']: gap
      }
    ]
    // TODO: this cast may be hiding some potential issues with styling and name
    //        lookups and should be removed
  } as IStackItemStyles;
};
