import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const BlockedSiteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1314 674l-68-68-286 286-286-286-68 68 286 286-286 286 68 68 286-286 284 284 68-68-284-284 286-286zM960 2045q-119-70-236-149t-224-171-198-196-159-223-105-253T0 768V256q83 0 161-6t152-22 146-45 144-75q85-55 170-81T960 0q51 0 97 6t89 20 86 34 85 48q72 46 144 75t146 45 152 22 161 6v512q0 151-38 285t-105 253-158 223-198 195-224 171-237 150zM128 382v386q0 127 33 244t92 222 138 200 172 178 193 155 204 130q102-59 203-130t194-154 172-178 138-200 91-223 34-244V382q-149-8-285-48t-263-121q-68-44-135-64t-149-21q-81 0-148 20t-136 65q-126 81-262 121t-286 48z" />
    </svg>
  ),
  displayName: 'BlockedSiteIcon',
});

export default BlockedSiteIcon;
