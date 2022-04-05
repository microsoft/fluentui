import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BoxAdditionSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 0v1920H0V0h1920zm-384 896h-512V384H896v512H384v128h512v512h128v-512h512V896z" />
    </svg>
  ),
  displayName: 'BoxAdditionSolidIcon',
});

export default BoxAdditionSolidIcon;
