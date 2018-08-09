import { IThemedProps } from '../../Foundation';
import { IStackProps, IStackStyles } from './Stack.types';

const nameMap: { [key: string]: string } = {
  start: 'flex-start',
  end: 'flex-end'
};

export const styles = (props: IThemedProps<IStackProps>): IStackStyles => {
  const {
    fillHorizontal,
    fillVertical,
    maxWidth,
    maxHeight,
    horizontal,
    grow,
    margin,
    padding,
    horizontalAlignment,
    verticalAlignment
  } = props;

  return {
    root: [
      {
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        flexWrap: 'nowrap',
        width: fillHorizontal ? '100%' : 'auto',
        height: fillVertical ? '100%' : 'auto',
        maxWidth,
        maxHeight,
        margin,
        padding,
        boxSizing: 'border-box'
      },
      grow && {
        flexGrow: grow === true ? 1 : grow,
        overflow: 'hidden'
      },
      horizontalAlignment && {
        [horizontal ? 'justifyContent' : 'alignItems']: nameMap[horizontalAlignment] || horizontalAlignment
      },
      verticalAlignment && {
        [horizontal ? 'alignItems' : 'justifyContent']: nameMap[verticalAlignment] || verticalAlignment
      },
      props.className
    ]
    // TODO: this cast may be hiding some potential issues with styling and name
    //        lookups and should be removed
  } as IStackStyles;
};
