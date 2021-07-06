import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CalendarReplyIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 896H768V768h128v128zm384 0h-128V768h128v128zm-384 256H768v-128h128v128zm-384 0H384v-128h128v128zm640-128h128v128h-128v-128zm512-128h-128V768h128v128zm-128 128h128v128h-128v-128zm-384 256h128v128h-128v-128zm-256 128H768v-128h128v128zm-384 0H384v-128h128v128zm256 128h128v128H768v-128zm-384 0h128v128H384v-128zM2048 128v1380q-28-26-60-44t-68-32V640H128v1152h1120l128 128H0V128h384V0h128v128h1024V0h128v128h384zm-128 384V256h-256v128h-128V256H512v128H384V256H128v256h1792zm-421 1024q50 0 110-2t122 0 118 14 101 40 71 78 27 126q0 53-20 99t-55 81-82 55-99 21v-128q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10h-293l162 163-90 90-317-317 317-317 90 90-162 163z" />
    </svg>
  ),
  displayName: 'CalendarReplyIcon',
});

export default CalendarReplyIcon;
