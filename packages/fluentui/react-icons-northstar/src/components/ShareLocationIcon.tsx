import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const ShareLocationIcon = createSvgIcon({
  svg: ({ classes, props }) =>
    props.size === 'small' ? (
      <svg className={classes.svg} viewBox="8 8 16 16" role="presentation" focusable="false">
        <path d="M20,18H18a4,4,0,0,0-4-4V12a6,6,0,0,1,6,6" fillRule="evenodd" />
        <path d="M23,18H21a7,7,0,0,0-7-7V9a9,9,0,0,1,9,9" fillRule="evenodd" />
        <path
          d="M10,18.5h0A3.5,3.5,0,1,0,13.5,15,3.5,3.5,0,0,0,10,18.5Zm3.5,1.17a1.17,1.17,0,1,1,1.17-1.17,1.17,1.17,0,0,1-1.17,1.17"
          fillRule="evenodd"
        />
      </svg>
    ) : (
      <svg className={classes.svg} viewBox="8 5 16 19" role="presentation" focusable="false">
        <path d="M12.5,12A4.3,4.3,0,0,1,17,16.5a5.09,5.09,0,0,1-.91,2.87c-.65,1-1.43,1.84-2.14,2.78-.22.3-.45.62-.66.94s-.29.5-.47.73a.4.4,0,0,1-.32.18.32.32,0,0,1-.31-.18c-.18-.23-.32-.48-.48-.73s-.44-.64-.66-.94c-.71-.94-1.5-1.81-2.14-2.78A5.09,5.09,0,0,1,8,16.5,4.3,4.3,0,0,1,12.5,12Zm0,2.62a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,12.5,14.62Z" />
        <path d="M20.53,15.43a7,7,0,0,0-7.1-7v2a5,5,0,0,1,5.1,5Z" />
        <path d="M24,15A10,10,0,0,0,14,5V7a8,8,0,0,1,8,8Z" />
      </svg>
    ),
  displayName: 'ShareLocationIcon',
});
