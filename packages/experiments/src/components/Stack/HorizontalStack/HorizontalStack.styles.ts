import { IThemedProps } from '../../../Foundation';
import { getGlobalClassNames } from '../../../Styling';
import { IHorizontalStackProps, IHorizontalStackStyles } from './HorizontalStack.types';
import { parseGap } from '../StackUtils';

const GlobalClassNames = {
  root: 'ms-HorizontalStack',
  inner: 'ms-HorizontalStack-inner'
};

export const styles = (props: IThemedProps<IHorizontalStackProps>): IHorizontalStackStyles => {
  const { wrap, gap, verticalGap, fillHorizontal, fillVertical, maxWidth, maxHeight, className, theme } = props;

  const vertGap = verticalGap !== undefined ? verticalGap : gap;

  const hGap = parseGap(gap, theme);
  const vGap = parseGap(vertGap, theme);

  const horizontalMargin = -0.5 * hGap.value;
  const verticalMargin = -0.5 * vGap.value;

  const classNames = getGlobalClassNames(GlobalClassNames, theme);

  if (wrap) {
    return {
      root: [
        classNames.root,
        {
          maxWidth,
          maxHeight,
          width: fillHorizontal ? '100%' : 'auto',
          height: fillVertical ? '100%' : 'auto',
          overflow: 'visible',
          display: 'block',

          // necessary in order to prevent collapsing margins
          paddingTop: 1
        },
        className
      ],

      inner: [
        classNames.inner,
        {
          flexWrap: 'wrap',
          margin: `${verticalMargin}${vGap.unit} ${horizontalMargin}${hGap.unit}`,

          // account for the extra 1px padding at the top of the root
          marginTop: `calc(${verticalMargin}${vGap.unit} - 1px)`,

          overflow: 'visible',
          width: fillHorizontal ? `calc(100% + ${hGap.value}${hGap.unit})` : 'auto',
          height: fillVertical ? `calc(100% + ${hGap.value}${hGap.unit})` : 'auto'
        }
      ]
    } as IHorizontalStackStyles;
  }

  return {
    root: [classNames.root, className]
    // TODO: this cast may be hiding some potential issues with styling and name
    //        lookups and should be removed
  } as IHorizontalStackStyles;
};
