import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TextParagraphOptionIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M308 640l-48 128H157l240-640h102l240 640H636l-48-128H308zm140-375l-92 247h184l-92-247zm64 1405l163-163 90 90-317 317-317-317 90-90 163 163V896h128v774zm512-1542h896v128h-896V128zm0 640V640h896v128h-896zm0 512v-128h896v128h-896zm0 512v-128h896v128h-896z" />
    </svg>
  ),
  displayName: 'TextParagraphOptionIcon',
});

export default TextParagraphOptionIcon;
