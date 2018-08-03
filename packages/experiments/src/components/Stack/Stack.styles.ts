import { IThemedProps } from '../../Foundation';
import { IStackProps, IStackStyles } from './Stack.types';

const nameMap: { [key: string]: string } = {
  start: 'flex-start',
  end: 'flex-end'
};

export const styles = (props: IThemedProps<IStackProps>): IStackStyles => {
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
        flexGrow: grow === true ? 1 : grow,
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
    // TODO: this cast may be hiding some potential issues with styling and name
    //        lookups and should be removed
  } as IStackStyles;
};
