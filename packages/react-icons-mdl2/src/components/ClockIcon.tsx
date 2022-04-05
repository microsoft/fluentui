import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ClockIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 2048q-124 0-238-32t-214-90-181-140-140-181-91-214-32-239q0-124 32-238t90-214 140-181 181-140 214-91 239-32q124 0 238 32t214 90 181 140 140 181 91 214 32 239q0 124-32 238t-90 214-140 181-181 140-214 91-239 32zm0-1664q-159 0-298 60T482 609 317 853t-61 299q0 159 60 298t165 244 244 165 299 61q159 0 298-60t244-165 165-244 61-299q0-159-60-298t-165-244-244-165-299-61zm0 768V640H896v640h512v-128h-384z" />
    </svg>
  ),
  displayName: 'ClockIcon',
});

export default ClockIcon;
