import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const InsertColumnsLeftIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 128v1664H0v-512l128 128v256h512v-512h512V768H640V256H128v256L0 640V128h2048zm-128 1152h-512v384h512v-384zm0-512h-512v384h512V768zm0-512h-512v384h512V256zM525 621L250 896h774v128H250l275 275-90 90L6 960l429-429 90 90z" />
    </svg>
  ),
  displayName: 'InsertColumnsLeftIcon',
});

export default InsertColumnsLeftIcon;
