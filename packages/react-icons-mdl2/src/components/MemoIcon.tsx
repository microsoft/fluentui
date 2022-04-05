import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MemoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1600 512q93 0 174 35t142 96 96 142 36 175q0 93-35 174t-96 142-142 96-175 36H448q-93 0-174-35t-142-96-96-142T0 960q0-93 35-174t96-142 142-96 175-36q93 0 174 35t142 96 96 142 36 175q0 21-4 50t-13 61-20 64-27 61-33 51-38 33h526q-20-11-38-33t-33-50-27-61-20-64-12-61-5-51q0-93 35-174t96-142 142-96 175-36zM128 960q0 66 25 124t69 101 102 69 124 26q66 0 124-25t101-69 69-102 26-124q0-66-25-124t-69-101-102-69-124-26q-66 0-124 25t-101 69-69 102-26 124zm1472 320q66 0 124-25t101-69 69-102 26-124q0-66-25-124t-69-101-102-69-124-26q-66 0-124 25t-101 69-69 102-26 124q0 66 25 124t69 101 102 69 124 26z" />
    </svg>
  ),
  displayName: 'MemoIcon',
});

export default MemoIcon;
