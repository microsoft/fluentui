import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BackToWindowIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 1152h640v640H768v-421L93 2045l-90-90 674-675H256v-128zm1115-384h421v128h-640V256h128v421L1955 3l90 90-674 675z" />
    </svg>
  ),
  displayName: 'BackToWindowIcon',
});

export default BackToWindowIcon;
