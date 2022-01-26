import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const VisuallyImpairedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M176 854q27-24 56-46t58-43l769 769q-9 0-17 1t-18 1q-46 0-91-4t-91-13L176 854zm1872 170q-128 144-285 257t-339 180l349 350-90 90-398-398-63 13-822-822 48-28L19 237l90-90 461 461q108-46 222-71t232-25q150 0 292 39t272 107 246 163 214 203zM1024 640q-77 0-147 29t-125 83l181 181q18-18 41-27t50-10q27 0 50 10t41 27 27 40 10 51q0 26-9 49t-28 42l181 181q54-54 83-124t29-148q0-80-30-150t-82-122-122-82-150-30zm419 676q120-53 227-127t201-165q-94-91-201-165t-227-127q45 64 68 139t23 153q0 78-23 153t-68 139zM0 1024q39-43 81-84l511 511q-172-69-320-179T0 1024z" />
    </svg>
  ),
  displayName: 'VisuallyImpairedIcon',
});

export default VisuallyImpairedIcon;
