import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CalendarMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1280 768h-128v128h128V768zm-384 768H768v128h128v-128zM512 768H384v128h128V768zm384 0H768v128h128V768zm384 256h-128v128h128v-128zm384 0h-128v128h128v-128zm-1152 0H384v128h128v-128zm384 0H768v128h128v-128zm384 256h-128v128h128v-128zm384 0h-128v128h128v-128zm-1152 0H384v128h128v-128zm384 0H768v128h128v-128zm384 256h-128v128h128v-128zm384 0h-128v128h128v-128zM0 128v1792h2048V128h-384V0h-128v128H512V0H384v128H0zm1920 128v256H128V256h256v128h128V256h1024v128h128V256h256zM128 1792V640h1792v1152H128z" />
    </svg>
  ),
  displayName: 'CalendarMirroredIcon',
});

export default CalendarMirroredIcon;
