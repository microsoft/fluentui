import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SyncOccurenceIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 256h128v512h-512V640h281q-51-88-122-159t-158-121-184-77-201-27q-138 0-263 46T536 431 366 628t-96 249l-126-25q20-105 63-199t106-174 141-146 170-110 192-70 208-25q118 0 230 30t211 87 183 137 144 180V256zm-768 1536q138 0 263-46t225-129 170-196 96-249l125 24q-30 158-111 290t-198 229-263 151-307 54q-119 0-231-30t-212-87-182-136-143-181v306H128v-512h512v128H359q51 89 122 160t158 120 183 77 202 27z" />
    </svg>
  ),
  displayName: 'SyncOccurenceIcon',
});

export default SyncOccurenceIcon;
