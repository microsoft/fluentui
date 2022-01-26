import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BorderDotIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 0h128v128H0V0zm384 0h128v128H384V0zm384 0h128v128H768V0zm384 0h128v128h-128V0zm384 0h128v128h-128V0zm512 0v128h-128V0h128zM0 1920h128v128H0v-128zm384 0h128v128H384v-128zm384 0h128v128H768v-128zm384 0h128v128h-128v-128zm384 0h128v128h-128v-128zM0 1536h128v128H0v-128zm0-384h128v128H0v-128zm0-384h128v128H0V768zm0-384h128v128H0V384zm1920 1152h128v128h-128v-128zm0-384h128v128h-128v-128zm0-384h128v128h-128V768zm0-384h128v128h-128V384zm0 1536h128v128h-128v-128z" />
    </svg>
  ),
  displayName: 'BorderDotIcon',
});

export default BorderDotIcon;
