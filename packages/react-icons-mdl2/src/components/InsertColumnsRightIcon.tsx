import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const InsertColumnsRightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 640l-128-128V256h-512v512H896v384h512v512h512v-256l128-128v512H0V128h2048v512zM640 1280H128v384h512v-384zm0-512H128v384h512V768zm0-512H128v384h512V256zm883 1043l275-275h-774V896h774l-275-275 90-90 429 429-429 429-90-90z" />
    </svg>
  ),
  displayName: 'InsertColumnsRightIcon',
});

export default InsertColumnsRightIcon;
