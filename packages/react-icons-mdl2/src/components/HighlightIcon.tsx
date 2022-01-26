import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HighlightIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 0v512q-87 0-149 19t-105 55-70 82-41 105-19 120-5 129q0 66 2 131t3 127h-256v384l-768 384v-768H384q0-62 2-127t3-131q0-66-5-129t-19-120-40-104-70-83-106-54T0 512V0h128v384h1792V0h128zm-768 1280H768v561l512-256v-305zm256-128q0-45-1-88t-1-86q0-64 5-126t20-120 46-114 82-106H361q51 51 81 106t46 114 21 120 5 126q0 43-1 86t-1 88h1024z" />
    </svg>
  ),
  displayName: 'HighlightIcon',
});

export default HighlightIcon;
