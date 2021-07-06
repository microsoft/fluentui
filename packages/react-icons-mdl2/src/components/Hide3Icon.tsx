import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Hide3Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M74 292l90-90 1630 1629-91 91-457-457q-54 35-105 53t-117 18q-80 0-150-30t-122-82-82-122-30-150q0-65 18-116t53-106L391 610Q266 715 197 851t-69 301H0q0-91 21-179t60-170 94-153 126-130L74 292zm694 860q0 53 20 99t55 82 81 55 100 20q36 0 67-9t62-27l-349-349q-17 31-26 62t-10 67zm328-245L963 774l30-4q15-2 31-2 79 0 149 30t122 82 83 123 30 149q0 15-2 30t-4 31l-133-133q-42-131-173-173zm952 245h-128q0-118-36-221t-99-188-150-152-185-113-208-70-218-24q-98 0-192 19t-185 56l-98-98q116-53 231-79t244-26q144 0 285 35t265 105 226 170 166 234q40 82 61 171t21 181z" />
    </svg>
  ),
  displayName: 'Hide3Icon',
});

export default Hide3Icon;
