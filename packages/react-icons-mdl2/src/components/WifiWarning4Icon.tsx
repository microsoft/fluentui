import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const WifiWarning4Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M576 896l576 1152H0L576 896zm395 1040l-395-790-395 790h790zm-459-528h128v320H512v-320zm0 384h128v128H512v-128zm1216-256q40 0 75 15t61 41 41 61 15 75q0 40-15 75t-41 61-61 41-75 15q-40 0-75-15t-61-41-41-61-15-75q0-40 15-75t41-61 61-41 75-15zM763 913q109-126 241-224t280-166 308-103 328-36v128q-160 0-313 35t-294 103-264 165-224 222l-62-124zm191 381q80-123 186-220t230-166 264-104 286-36v128q-141 0-273 37t-249 106-212 168-164 222l-68-135zm221 442q32-128 102-235t170-185 220-121 253-43v128q-88 0-170 23t-153 64-129 100-100 130-65 153-23 170h-13l-92-184z" />
    </svg>
  ),
  displayName: 'WifiWarning4Icon',
});

export default WifiWarning4Icon;
