import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SprintIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2042 1728l-301 301-90-90 147-147h-383q83-56 152-128h231l-147-147 90-90 301 301zm-378-704q0 106-27 204t-78 183-120 156-155 120-184 77-204 28H0v-128h896q88 0 170-23t153-64 129-100 100-130 65-153 23-170q0-88-23-170t-64-153-100-129-130-100-153-65-170-23h-14q-7 0-15 2h-6l144 145-90 90-301-301L915 19l90 90-148 148q10-1 19-1t20 0q106 0 204 27t183 78 156 120 120 155 77 184 28 204zM325 1536q-95-106-146-237t-51-275q0-94 22-184t66-172 104-151 140-124l93 93q-69 44-124 103t-93 128-59 147-21 160q0 76 18 148t51 138 82 123 109 103H325z" />
    </svg>
  ),
  displayName: 'SprintIcon',
});

export default SprintIcon;
