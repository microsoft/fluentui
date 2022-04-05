import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const CPlusPlusLanguageIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1408h-512v512h-128v-512H768v-128h512V768h128v512h512v128zM640 640v512H512V640H0V512h512V0h128v512h512v128H640z" />
    </svg>
  ),
  displayName: 'CPlusPlusLanguageIcon',
});

export default CPlusPlusLanguageIcon;
