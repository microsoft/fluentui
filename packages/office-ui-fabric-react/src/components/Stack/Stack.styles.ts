import { IStackComponent, IStackStyles } from './Stack.types';
import { parseGap, parsePadding } from './StackUtils';

const nameMap: { [key: string]: string } = {
  start: 'flex-start',
  end: 'flex-end'
};

export const styles: IStackComponent['styles'] = props => {
  const {
    fillHorizontal,
    fillVertical,
    maxWidth,
    maxHeight,
    horizontal,
    grow,
    wrap,
    padding,
    horizontalAlignment,
    verticalAlignment,
    horizontalGap,
    verticalGap,
    shrinkItems,
    theme,
    className
  } = props;

  const hGap = parseGap(horizontalGap, theme);
  const vGap = parseGap(verticalGap, theme);

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

  return {
    root: [
      theme.fonts.medium,
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
      verticalAlignment && {
        [horizontal ? 'alignItems' : 'justifyContent']: nameMap[verticalAlignment] || verticalAlignment
      },
      wrap && {
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
