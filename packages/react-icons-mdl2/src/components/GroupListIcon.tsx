import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const GroupListIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M640 640h1408v128H640V640zm1408-384v128H640V256h1408zM384 128v128H256v512h128v128H128V128h256zm256 1408h1408v128H640v-128zm0-384h1408v128H640v-128zm-256-128v128H256v512h128v128H128v-768h256z" />
    </svg>
  ),
  displayName: 'GroupListIcon',
});

export default GroupListIcon;
