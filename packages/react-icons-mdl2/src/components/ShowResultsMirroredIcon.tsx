import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ShowResultsMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1664 1792v-128H0v128h1664zm384-1408V256h-128v128h128zm0 1024v-128h-128v128h128zm-384 0v-128H0v128h1664zm0-1152H0v128h1664V256zm0 512V640H0v128h1664z" />
    </svg>
  ),
  displayName: 'ShowResultsMirroredIcon',
});

export default ShowResultsMirroredIcon;
