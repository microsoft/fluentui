import { IOverflowSetStyles, IOverflowSetStyleProps } from './OverflowSet.types';
import { IStyleFunction } from '../../Utilities';

export const getStyles: IStyleFunction<IOverflowSetStyleProps, IOverflowSetStyles> = props => {
  const { className, vertical } = props;
  return {
    root: [
      'ms-OverflowSet',
      {
        position: 'relative',
        display: 'flex',
        flexWrap: 'nowrap'
      },
      vertical && { flexDirection: 'column' },
      className
    ],
    item: {
      flexShrink: 0,
      display: 'inherit'
    }
  };
};
