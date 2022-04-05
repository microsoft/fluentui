import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const VolumeDisabledIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1472 896q119 0 224 45t183 124 123 183 46 224q0 119-45 224t-124 183-183 123-224 46q-119 0-224-45t-183-124-123-183-46-224q0-119 45-224t124-183 183-123 224-46zm0 1024q93 0 174-35t142-96 96-142 36-175q0-93-35-174t-96-142-142-96-175-36q-93 0-174 35t-142 96-96 142-36 175q0 93 35 174t96 142 142 96 175 36zM640 768v512h122q-8 32-14 64t-9 64H512V640h293l384-384h91v506q-67 18-128 48V475L858 768H640zm1069 557l-147 147 147 147-90 90-147-146-147 146-90-90 146-147-146-147 90-90 147 147 147-147 90 90z" />
    </svg>
  ),
  displayName: 'VolumeDisabledIcon',
});

export default VolumeDisabledIcon;
