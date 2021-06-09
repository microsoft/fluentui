import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const WebPublishIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1024h-128V640H128v1024h1408v128H0V128h2048zm-128 128H128v256h1792V256zm-192 870l320 319-91 91-165-165v677h-128v-677l-165 165-91-91 320-319z" />
    </svg>
  ),
  displayName: 'WebPublishIcon',
});

export default WebPublishIcon;
