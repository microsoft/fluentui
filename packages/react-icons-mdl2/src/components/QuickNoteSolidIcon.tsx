import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const QuickNoteSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 128v1792H768v-640H128V128h1792zM128 1408h512v512l-512-512z" />
    </svg>
  ),
  displayName: 'QuickNoteSolidIcon',
});

export default QuickNoteSolidIcon;
