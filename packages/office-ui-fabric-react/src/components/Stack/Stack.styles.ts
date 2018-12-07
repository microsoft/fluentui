import { IStackComponent, IStackStyles, IStackProps } from './Stack.types';
import { getVerticalAlignment, parseGap, parsePadding } from './StackUtils';
import { getGlobalClassNames } from '../../Styling';

const nameMap: { [key: string]: string } = {
  start: 'flex-start',
  end: 'flex-end'
};

const GlobalClassNames = {
  root: 'ms-Stack',
  inner: 'ms-Stack-inner'
};

export const styles: IStackComponent['styles'] = props => {
  const {
    fillHorizontal,
    fillVertical,
    maxWidth,
    maxHeight,
    horizontal,
    gap,
    verticalGap,
    grow,
    wrap,
    padding,
    horizontalAlignment,
    verticalAlignment,
    shrinkItems,
    theme,
    className
  } = props;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  const vertAlignment = getVerticalAlignment(verticalAlignment);

  let horiGap: IStackProps['gap'];
  let vertGap: IStackProps['gap'];

  horiGap = gap;
  vertGap = verticalGap !== undefined ? verticalGap : gap;

  const hGap = parseGap(horiGap, theme);
  const vGap = parseGap(vertGap, theme);

  const horizontalMargin = `${-0.5 * hGap.value}${hGap.unit}`;
  const verticalMargin = `${-0.5 * vGap.value}${vGap.unit}`;

  // styles to be applied to all direct children regardless of wrap or direction
  const childStyles = {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  };

  // selectors to be applied regardless of wrap or direction
  const commonSelectors = {
    // flexShrink styles are applied by the StackItem
    '> *:not(.ms-StackItem)': {
      flexShrink: shrinkItems ? 1 : 0
    }
  };

  if (wrap) {
    return {
      root: [
        classNames.root,
        {
          maxWidth,
          maxHeight,
          width: fillHorizontal ? '100%' : 'auto',
          overflow: 'visible'
        },
        horizontal && {
          height: fillVertical ? '100%' : 'auto',
          width: 'auto'
        },
        !horizontal && {
          height: '100%'
        },
        className,
        {
          // not allowed to be overridden by className
          // since this is necessary in order to prevent collapsing margins
          display: 'inline-block'
        }
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

          selectors: {
            '> *': {
              margin: `${0.5 * vGap.value}${vGap.unit} ${0.5 * hGap.value}${hGap.unit}`,

              ...childStyles
            },
            ...commonSelectors
          }
        },
        horizontalAlignment && {
          [horizontal ? 'justifyContent' : 'alignItems']: nameMap[horizontalAlignment] || horizontalAlignment
        },
        vertAlignment && {
          [horizontal ? 'alignItems' : 'justifyContent']: nameMap[vertAlignment] || vertAlignment
        },
        horizontal && {
          flexDirection: 'row',
          width: fillHorizontal ? '100%' : 'auto',
          maxWidth: '100vw',

          // avoid unnecessary calc() calls if vertical gap is 0
          height: fillVertical ? (vGap.value === 0 ? '100%' : `calc(100% + ${vGap.value}${vGap.unit})`) : 'auto',

          selectors: {
            '> *': {
              maxWidth: hGap.value === 0 ? '100%' : `calc(100% - ${hGap.value}${hGap.unit})`
            }
          }
        },
        !horizontal && {
          height: `calc(100% + ${vGap.value}${vGap.unit})`,
          flexDirection: 'column',
          justifyContent: 'start',
          alignContent: 'end',
          alignItems: 'start',
          selectors: {
            '> *': {
              maxHeight: vGap.value === 0 ? '100%' : `calc(100% - ${vGap.value}${vGap.unit})`
            }
          }
        }
      ]
    } as IStackStyles;
  }

  return {
    root: [
      classNames.root,
      {
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        flexWrap: 'nowrap',
        width: fillHorizontal && !wrap ? '100%' : 'auto',
        height: fillVertical && !wrap ? '100%' : 'auto',
        maxWidth,
        maxHeight,
        padding: parsePadding(padding, theme),
        boxSizing: 'border-box'
      },
      grow && {
        flexGrow: grow === true ? 1 : grow,
        overflow: 'hidden'
      },
      horizontalAlignment && {
        [horizontal ? 'justifyContent' : 'alignItems']: nameMap[horizontalAlignment] || horizontalAlignment
      },
      vertAlignment && {
        [horizontal ? 'alignItems' : 'justifyContent']: nameMap[vertAlignment] || vertAlignment
      },
      wrap && {
        maxWidth,
        maxHeight,
        width: fillHorizontal ? '100%' : 'auto',
        height: fillVertical ? '100%' : 'auto',
        overflow: 'visible',
        selectors: {
          '> *': {
            margin: `${0.5 * vGap.value}${vGap.unit} ${0.5 * hGap.value}${hGap.unit}`,

            // avoid unnecessary calc() calls if horizontal gap is 0
            maxWidth: hGap.value === 0 ? '100%' : `calc(100% - ${hGap.value}${hGap.unit})`,

            ...childStyles
          },
          ...commonSelectors
        }
      },
      !wrap && {
        selectors: {
          '> *': childStyles,

          // apply gap margin to every direct child except the first direct child
          '> *:not(:first-child)': [
            horizontal && {
              marginLeft: `${hGap.value}${hGap.unit}`
            },
            !horizontal && {
              marginTop: `${vGap.value}${vGap.unit}`
            }
          ],
          ...commonSelectors
        }
      },
      className
    ]
    // TODO: this cast may be hiding some potential issues with styling and name
    //        lookups and should be removed
  } as IStackStyles;
};
