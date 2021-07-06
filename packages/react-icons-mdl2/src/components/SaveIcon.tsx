import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SaveIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 128q27 0 50 10t40 27 28 41 10 50v1664H357l-229-230V256q0-27 10-50t27-40 41-28 50-10h1536zM512 896h1024V256H512v640zm768 512H640v384h128v-256h128v256h384v-384zm512-1152h-128v768H384V256H256v1381l154 155h102v-512h896v512h384V256z" />
    </svg>
  ),
  displayName: 'SaveIcon',
});

export default SaveIcon;
