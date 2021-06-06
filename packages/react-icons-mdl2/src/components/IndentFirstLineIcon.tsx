import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const IndentFirstLineIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 128h768v128h-768V128zM768 1792v-128h1152v128H768zm0-1024V640h1152v128H768zm0 512v-128h1152v128H768zM573 3l317 317-317 317-90-90 163-163H0V256h646L483 93l90-90z" />
    </svg>
  ),
  displayName: 'IndentFirstLineIcon',
});

export default IndentFirstLineIcon;
