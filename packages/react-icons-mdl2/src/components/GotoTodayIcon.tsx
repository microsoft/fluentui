import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GotoTodayIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 128h384v1792h-768v-128h640V640H128v1152h640v128H0V128h384V0h128v128h896V0h128v128zM128 512h1664V256h-256v128h-128V256H512v128H384V256H128v256zm1059 1149l-163-162v549H896v-549l-163 162-90-90 317-317 317 317-90 90zm-35-893v384H768V768h384zm-128 256V896H896v128h128z" />
    </svg>
  ),
  displayName: 'GotoTodayIcon',
});

export default GotoTodayIcon;
