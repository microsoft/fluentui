import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DiffInlineIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 0v2048H256V0h1536zM384 128v384h1280V128H384zm1280 1408H384v384h1280v-384zm0-256V640H384v640h1280z" />
    </svg>
  ),
  displayName: 'DiffInlineIcon',
});

export default DiffInlineIcon;
