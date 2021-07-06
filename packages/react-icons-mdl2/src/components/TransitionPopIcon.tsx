import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TransitionPopIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 384h2048v1152H0V384zm128 1024h1792V512H128v896zm1389-765l318 317-318 317-90-90 162-163H475l162 163-90 90-317-317 317-317 90 90-162 163h1114l-162-163 90-90zm531-515v128H0V128h2048zM0 1664h2048v128H0v-128z" />
    </svg>
  ),
  displayName: 'TransitionPopIcon',
});

export default TransitionPopIcon;
