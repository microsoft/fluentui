import { IThemedProps } from '../../../Foundation';
import { IHorizontalStackProps, IHorizontalStackStyles } from './HorizontalStack.types';
import { parseGap } from '../StackUtils';

export const styles = (props: IThemedProps<IHorizontalStackProps>): IHorizontalStackStyles => {
  const { wrap, gap, verticalGap, className } = props;

  const hGap = parseGap(gap);
  const vGap = parseGap(verticalGap);

  const horizontalMargin = -0.5 * hGap.value;
  const verticalMargin = -0.5 * vGap.value;

  if (wrap) {
    return {
      root: [
        'ms-HorizontalStack',
        className,
        {
          display: 'block',
          overflow: 'visible'
        }
      ],

      inner: [
        'ms-HorizontalStack-inner',
        {
          flexWrap: 'wrap',
          margin: `${verticalMargin}${vGap.unit} ${horizontalMargin}${hGap.unit}`,
          overflow: 'visible'
        }
      ]
    } as IHorizontalStackStyles;
  }

  return {
    root: ['ms-HorizontalStack', className]
    // TODO: this cast may be hiding some potential issues with styling and name
    //        lookups and should be removed
  } as IHorizontalStackStyles;
};
