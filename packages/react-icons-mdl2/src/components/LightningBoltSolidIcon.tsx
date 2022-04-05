import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LightningBoltSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1223 768h660L603 2048H313l384-768H248L888 0h719l-384 768z" />
    </svg>
  ),
  displayName: 'LightningBoltSolidIcon',
});

export default LightningBoltSolidIcon;
