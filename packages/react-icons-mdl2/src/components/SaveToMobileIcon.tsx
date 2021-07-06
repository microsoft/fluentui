import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SaveToMobileIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 1664v128h-256v-128h256zM384 128v640h768v128H256V128H128v1381l154 155h102v-512h768v128H512v384h128v-256h128v256h384v128H229L0 1562V128q0-27 10-50t27-40 41-28 50-10h1536q27 0 50 10t40 27 28 41 10 50v512h-128V128h-128v512h-128V128H384zm1664 768v1024q0 27-10 50t-27 40-41 28-50 10h-512q-27 0-50-10t-40-27-28-41-10-50V896q0-27 10-50t27-40 41-28 50-10h512q27 0 50 10t40 27 28 41 10 50zm-128 1024V896h-512v1024h512z" />
    </svg>
  ),
  displayName: 'SaveToMobileIcon',
});

export default SaveToMobileIcon;
