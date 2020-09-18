import * as React from 'react';
import { createSvgIcon } from '../utils/createSvgIcon';

export const ShareLocationIcon = createSvgIcon({
  svg: ({ classes, props }) =>
    props.size === 'small' ? (
      <svg className={classes.svg} viewBox="8 8 16 16" role="presentation" focusable="false">
        <path d="M20,18H18a4,4,0,0,0-4-4V12a6.005,6.005,0,0,1,6,6" fillRule="evenodd" />
        <path d="M23,18H21a7.008,7.008,0,0,0-7-7V9a9.01,9.01,0,0,1,9,9" fillRule="evenodd" />
        <path
          d="M10,18.5h0A3.5,3.5,0,1,0,13.5,15,3.5,3.5,0,0,0,10,18.5Zm3.5,1.167A1.167,1.167,0,1,1,14.666,18.5,1.166,1.166,0,0,1,13.5,19.667"
          fillRule="evenodd"
        />
      </svg>
    ) : (
      <svg className={classes.svg} viewBox="8 5 16 19" role="presentation" focusable="false">
        <path d="M14.342,13.9a3.627,3.627,0,0,1,3.79,3.789,4.29,4.29,0,0,1-.764,2.415c-.552.815-1.21,1.552-1.8,2.342-.191.256-.382.526-.559.8-.132.2-.244.421-.395.612a.33.33,0,0,1-.27.151.289.289,0,0,1-.263-.151c-.151-.2-.27-.4-.4-.612-.178-.27-.369-.54-.56-.8-.592-.79-1.256-1.52-1.8-2.342a4.289,4.289,0,0,1-.763-2.415A3.626,3.626,0,0,1,14.342,13.9Zm0,2.21a1.264,1.264,0,1,0,1.263,1.263A1.264,1.264,0,0,0,14.342,16.105Z" />
        <path d="M21.105,16.783a5.937,5.937,0,0,0-5.98-5.9v1.684a4.255,4.255,0,0,1,4.3,4.211Z" />
        <path d="M24,16.421A8.421,8.421,0,0,0,15.579,8V9.684a6.737,6.737,0,0,1,6.737,6.737Z" />
      </svg>
    ),
  displayName: 'ShareLocationIcon',
});
