import { IStyleProps } from '../Text/createComponent';
import { IStackProps, IStackStyles } from './Stack.types';

const nameMap: { [key: string]: string } = {
  start: 'flex-start',
  end: 'flex-end'
};

export const styles = (props: IStyleProps<IStackProps, IStackStyles>): IStackStyles => {
  const { fill, align, justify, maxWidth, vertical, grow, margin, padding } = props;

  return {
    root: [
      {
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
        flexWrap: 'nowrap',
        width: fill && !vertical ? '100%' : 'auto',
        height: fill && vertical ? '100%' : 'auto',
        maxWidth,
        margin,
        padding
      },
      grow && {
        flexGrow: 1,
        overflow: 'hidden'
      },
      align && {
        alignItems: nameMap[align] || align
      },
      justify && {
        justifyContent: nameMap[justify] || justify
      },
      props.className
    ]
  } as IStackStyles;
};
