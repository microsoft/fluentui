import { getGlobalClassNames } from '../../../Styling';
import { IHorizontalStackComponent, IHorizontalStackStyles } from './HorizontalStack.types';
import { parseGap } from '../StackUtils';

const GlobalClassNames = {
  root: 'ms-HorizontalStack',
  inner: 'ms-HorizontalStack-inner'
};

export const styles: IHorizontalStackComponent['styles'] = props => {
  const { wrap, gap, verticalGap, fillHorizontal, fillVertical, maxWidth, maxHeight, className, theme } = props;

  const vertGap = verticalGap !== undefined ? verticalGap : gap;

  const hGap = parseGap(gap, theme);
  const vGap = parseGap(vertGap, theme);

  const horizontalMargin = `${-0.5 * hGap.value}${hGap.unit}`;
  const verticalMargin = `${-0.5 * vGap.value}${vGap.unit}`;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  if (wrap) {
    return {
      root: [
        classNames.root,
        theme.fonts.medium,
        {
          maxWidth,
          maxHeight,
          width: fillHorizontal ? '100%' : 'auto',
          height: fillVertical ? '100%' : 'auto',
          overflow: 'visible'
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
          flexWrap: 'wrap',
          marginLeft: horizontalMargin,
          marginRight: horizontalMargin,
          marginTop: verticalMargin,
          marginBottom: verticalMargin,
          overflow: 'visible',
          maxWidth: '100vw',

          // avoid unnecessary calc() calls if vertical gap is 0
          height: fillVertical ? (vGap.value === 0 ? '100%' : `calc(100% + ${vGap.value}${vGap.unit})`) : 'auto'
        }
      ]
    } as IHorizontalStackStyles;
  }

  return {
    root: [classNames.root, className, theme.fonts.medium]
    // TODO: this cast may be hiding some potential issues with styling and name
    //        lookups and should be removed
  } as IHorizontalStackStyles;
};
