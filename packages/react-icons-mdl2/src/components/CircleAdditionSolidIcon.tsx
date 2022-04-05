import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CircleAdditionSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 0q132 0 255 34t229 97 194 150 150 194 97 230 35 255q0 132-34 255t-97 229-150 194-194 150-230 97-255 35q-132 0-255-34t-229-97-194-150-150-194-97-229T0 960q0-132 34-255t97-229 150-194 194-150 229-97T960 0zm576 896h-512V384H896v512H384v128h512v512h128v-512h512V896z" />
    </svg>
  ),
  displayName: 'CircleAdditionSolidIcon',
});

export default CircleAdditionSolidIcon;
