import { IStyleProps } from '../../Text/createComponent';
import { IStackItemProps, IStackItemStyles } from './StackItem.types';

const alignMap: { [key: string]: string } = {
  start: 'flex-start',
  end: 'flex-end'
};
const justifyMap: { [key: string]: string } = {};

export const styles = (props: IStyleProps<IStackItemProps, IStackItemStyles>): IStackItemStyles => {
  const { grow, collapse, align, justify, gap, vertical } = props;

  return {
    root: [
      grow && { flexGrow: 1 },
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
  } as IStackItemStyles;
};
