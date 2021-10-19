import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ZipFolderIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 0q27 0 50 10t40 27 28 41 10 50v480q0 45-9 77t-24 58-31 46-31 40-23 44-10 55v992q0 27-10 50t-27 40-41 28-50 10H256V0h1536zM640 128v384h256V128H640zm1024 800q0-31-9-54t-24-44-31-41-31-45-23-58-10-78V128h-512v512H768v128H640V640H512V128H384v1792h384v-128h128v128h768V928zm128-800h-128v480q0 24 4 42t13 33 20 29 27 32q15-17 26-31t20-30 13-33 5-42V128zM640 896h128v128H640V896zm0 256h128v128H640v-128zm0 256h128v128H640v-128zm128 256v128H640v-128h128zm0-768V768h128v128H768zm0 256v-128h128v128H768zm0 256v-128h128v128H768zm0 256v-128h128v128H768z" />
    </svg>
  ),
  displayName: 'ZipFolderIcon',
});

export default ZipFolderIcon;
