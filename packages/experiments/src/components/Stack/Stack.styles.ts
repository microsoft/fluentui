import { IThemedProps } from '../../Foundation';
import { IStackProps, IStackStyles } from './Stack.types';
import { parseGap } from './StackUtils';

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
    wrap,
    margin,
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

  const childStyles = {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    flexShrink: shrinkItems ? 1 : 0
  };

  return {
    root: [
      {
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        flexWrap: 'nowrap',
        width: fillHorizontal && !wrap ? '100%' : 'auto',
        height: fillVertical && !wrap ? '100%' : 'auto',
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
      wrap && {
        selectors: {
          '> *': {
            margin: `${0.5 * vGap.value}${vGap.unit} ${0.5 * hGap.value}${hGap.unit}`,
            maxWidth: `calc(100% - ${hGap.value}${hGap.unit})`,
            ...childStyles
          }
        }
      },
      !wrap && [
        horizontal && {
          selectors: {
            '> *': {
              marginRight: `${hGap.value}${hGap.unit}`,
              ...childStyles
            },
            '> *:last-child': {
              marginRight: 0
            }
          }
        },
        !horizontal && {
          selectors: {
            '> *': {
              marginBottom: `${vGap.value}${vGap.unit}`,
              ...childStyles
            },
            '> *:last-child': {
              marginBottom: 0
            }
          }
        }
      ],
      className
    ]
    // TODO: this cast may be hiding some potential issues with styling and name
    //        lookups and should be removed
  } as IStackStyles;
};
