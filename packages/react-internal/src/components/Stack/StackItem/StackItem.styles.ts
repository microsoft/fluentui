import { getGlobalClassNames } from '../../../Styling';
import { IStackItemComponent, IStackItemStyles, IStackItemStylesReturnType } from './StackItem.types';

const GlobalClassNames = {
  root: 'ms-StackItem',
};

const alignMap: { [key: string]: string } = {
  start: 'flex-start',
  end: 'flex-end',
};

export const StackItemStyles: IStackItemComponent['styles'] = (props, theme, tokens): IStackItemStylesReturnType => {
  const { grow, shrink, disableShrink, align, verticalFill, order, className } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  return {
    root: [
      theme.fonts.medium,
      classNames.root,
      {
        margin: tokens.margin,
        padding: tokens.padding,
        height: verticalFill ? '100%' : 'auto',
        width: 'auto',
      },
      grow && { flexGrow: grow === true ? 1 : grow },
      (disableShrink || (!grow && !shrink)) && {
        flexShrink: 0,
      },
      shrink &&
        !disableShrink && {
          flexShrink: 1,
        },
      align && {
        alignSelf: alignMap[align] || align,
      },
      order && {
        order: order,
      },
      className,
    ],
    // TODO: this cast may be hiding some potential issues with styling and name
    //        lookups and should be removed
  } as IStackItemStyles;
};
