import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EgnyteLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1843 662l-663 488v770H870v-768q-1-1-28-21t-71-52-100-75-117-86-119-87-107-78-81-60-42-31l262-193 557 410 557-411 262 194zm-431 599l418 308-92 125-418-308 92-125zm-309-613H947V128h156v520zm-467 613l92 125-418 308-92-125 418-308z" />
    </svg>
  ),
  displayName: 'EgnyteLogoIcon',
});

export default EgnyteLogoIcon;
