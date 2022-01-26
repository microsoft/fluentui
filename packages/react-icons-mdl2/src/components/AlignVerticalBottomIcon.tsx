import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AlignVerticalBottomIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1792v128H0v-128h2048zm-384-128h-512V512h512v1152zM1536 640h-256v896h256V640zM896 1664H384V0h512v1664zM768 128H512v1408h256V128z" />
    </svg>
  ),
  displayName: 'AlignVerticalBottomIcon',
});

export default AlignVerticalBottomIcon;
