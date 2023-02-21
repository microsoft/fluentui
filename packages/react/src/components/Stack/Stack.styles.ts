import { getGlobalClassNames } from '../../Styling';
import { GlobalClassNames as StackItemGlobalClassNames } from './StackItem/StackItem.styles';
import { parseGap, parsePadding } from './StackUtils';
import type { IStackComponent, IStackStyles, IStackStylesReturnType } from './Stack.types';

const nameMap: { [key: string]: string } = {
  start: 'flex-start',
  end: 'flex-end',
};

export const GlobalClassNames = {
  root: 'ms-Stack',
  inner: 'ms-Stack-inner',
  child: 'ms-Stack-child',
};

export const styles: IStackComponent['styles'] = (props, theme, tokens): IStackStylesReturnType => {
  const {
    className,
    disableShrink,
    enableScopedSelectors,
    grow,
    horizontal,
    horizontalAlign,
    reversed,
    verticalAlign,
    verticalFill,
    wrap,
  } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  /* eslint-disable deprecation/deprecation */
  const childrenGap = tokens && tokens.childrenGap ? tokens.childrenGap : props.gap;
  const maxHeight = tokens && tokens.maxHeight ? tokens.maxHeight : props.maxHeight;
  const maxWidth = tokens && tokens.maxWidth ? tokens.maxWidth : props.maxWidth;
  const padding = tokens && tokens.padding ? tokens.padding : props.padding;
  /* eslint-enable deprecation/deprecation */

  const { rowGap, columnGap } = parseGap(childrenGap, theme);

  const horizontalMargin = `${-0.5 * columnGap.value}${columnGap.unit}`;
  const verticalMargin = `${-0.5 * rowGap.value}${rowGap.unit}`;

  // styles to be applied to all direct children regardless of wrap or direction
  const childStyles = {
    textOverflow: 'ellipsis',
  };

  const childSelector = '> ' + (enableScopedSelectors ? '.' + GlobalClassNames.child : '*');

  const disableShrinkStyles = {
    // flexShrink styles are applied by the StackItem
    [`${childSelector}:not(.${StackItemGlobalClassNames.root})`]: {
      flexShrink: 0,
    },
  };

  if (wrap) {
    return {
      root: [
        classNames.root,
        {
          flexWrap: 'wrap',
          maxWidth,
          maxHeight,
          width: 'auto',
          overflow: 'visible',
          height: '100%',
        },
        horizontalAlign && {
          [horizontal ? 'justifyContent' : 'alignItems']: nameMap[horizontalAlign] || horizontalAlign,
        },
        verticalAlign && {
          [horizontal ? 'alignItems' : 'justifyContent']: nameMap[verticalAlign] || verticalAlign,
        },
        className,
        {
          // not allowed to be overridden by className
          // since this is necessary in order to prevent collapsing margins
          display: 'flex',
        },
        horizontal && {
          height: verticalFill ? '100%' : 'auto',
        },
      ],

      inner: [
        classNames.inner,
        {
          display: 'flex',
          flexWrap: 'wrap',
          marginLeft: horizontalMargin,
          marginRight: horizontalMargin,
          marginTop: verticalMargin,
          marginBottom: verticalMargin,
          overflow: 'visible',
          boxSizing: 'border-box',
          padding: parsePadding(padding, theme),
          // avoid unnecessary calc() calls if horizontal gap is 0
          width: columnGap.value === 0 ? '100%' : `calc(100% + ${columnGap.value}${columnGap.unit})`,
          maxWidth: '100vw',

          [childSelector]: {
            margin: `${0.5 * rowGap.value}${rowGap.unit} ${0.5 * columnGap.value}${columnGap.unit}`,

            ...childStyles,
          },
        },
        disableShrink && disableShrinkStyles,
        horizontalAlign && {
          [horizontal ? 'justifyContent' : 'alignItems']: nameMap[horizontalAlign] || horizontalAlign,
        },
        verticalAlign && {
          [horizontal ? 'alignItems' : 'justifyContent']: nameMap[verticalAlign] || verticalAlign,
        },
        horizontal && {
          flexDirection: reversed ? 'row-reverse' : 'row',

          // avoid unnecessary calc() calls if vertical gap is 0
          height: rowGap.value === 0 ? '100%' : `calc(100% + ${rowGap.value}${rowGap.unit})`,

          [childSelector]: {
            maxWidth: columnGap.value === 0 ? '100%' : `calc(100% - ${columnGap.value}${columnGap.unit})`,
          },
        },
        !horizontal && {
          flexDirection: reversed ? 'column-reverse' : 'column',
          height: `calc(100% + ${rowGap.value}${rowGap.unit})`,

          [childSelector]: {
            maxHeight: rowGap.value === 0 ? '100%' : `calc(100% - ${rowGap.value}${rowGap.unit})`,
          },
        },
      ],
    } as IStackStyles;
  }

  return {
    root: [
      classNames.root,
      {
        display: 'flex',
        flexDirection: horizontal ? (reversed ? 'row-reverse' : 'row') : reversed ? 'column-reverse' : 'column',
        flexWrap: 'nowrap',
        width: 'auto',
        height: verticalFill ? '100%' : 'auto',
        maxWidth,
        maxHeight,
        padding: parsePadding(padding, theme),
        boxSizing: 'border-box',

        [childSelector]: childStyles,
      },
      disableShrink && disableShrinkStyles,
      grow && {
        flexGrow: grow === true ? 1 : grow,
      },

      horizontalAlign && {
        [horizontal ? 'justifyContent' : 'alignItems']: nameMap[horizontalAlign] || horizontalAlign,
      },
      verticalAlign && {
        [horizontal ? 'alignItems' : 'justifyContent']: nameMap[verticalAlign] || verticalAlign,
      },
      horizontal &&
        columnGap.value > 0 && {
          // apply gap margin to every direct child except the first direct child if the direction is not reversed,
          // and the last direct one if it is
          [reversed ? `${childSelector}:not(:last-child)` : `${childSelector}:not(:first-child)`]: {
            marginLeft: `${columnGap.value}${columnGap.unit}`,
          },
        },
      !horizontal &&
        rowGap.value > 0 && {
          // apply gap margin to every direct child except the first direct child if the direction is not reversed,
          // and the last direct one if it is
          [reversed ? `${childSelector}:not(:last-child)` : `${childSelector}:not(:first-child)`]: {
            marginTop: `${rowGap.value}${rowGap.unit}`,
          },
        },
      className,
    ],
    // TODO: this cast may be hiding some potential issues with styling and name
    //        lookups and should be removed
  } as IStackStyles;
};
