import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Header4Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M768 1024V384h128v1408H768v-640H128v640H0V384h128v640h640zm1152 256h128v128h-128v384h-128v-384h-640v-85l671-939h97v896zm-128 0V648l-452 632h452z" />
    </svg>
  ),
  displayName: 'Header4Icon',
});

export default Header4Icon;
