import { getGlobalClassNames } from '../../../Styling';
import { IStackItemComponent, IStackItemStyles, IStackItemStylesReturnType } from './StackItem.types';

const GlobalClassNames = {
  root: 'ms-StackItem'
};

const alignMap: { [key: string]: string } = {
  start: 'flex-start',
  end: 'flex-end'
};

export const styles: IStackItemComponent['styles'] = (props, theme): IStackItemStylesReturnType => {
  const { grow, shrink, disableShrink, align, verticalFill, className } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      theme.fonts.medium,
      classNames.root,
      {
        width: 'auto',
        height: verticalFill ? '100%' : 'auto'
      },
      grow && { flexGrow: grow === true ? 1 : grow },
      (disableShrink || (!grow && !shrink)) && {
        flexShrink: 0
      },
      shrink &&
        !disableShrink && {
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
