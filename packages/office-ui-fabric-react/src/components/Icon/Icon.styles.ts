import {
  IStyle
} from '../../Styling';
import {
  IIconStyleProps, IIconStyles
} from './Icon.types';

export const getStyles = (props: IIconStyleProps): IIconStyles => ({
  root: [
    'ms-Icon',
    {
      display: 'inline-block'
    },
    props.isImage && {
      overflow: 'hidden'
    },
    props.hasCode && !props.isImage && {
      width: '1em'
    },
    props.subsetClassName,
    props.className
  ]
});
