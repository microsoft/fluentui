import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PermissionsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1573v475h-512v-256h-256v-256h-256v-207q-74 39-155 59t-165 20q-97 0-187-25t-168-71-142-110-111-143-71-168T0 704q0-97 25-187t71-168 110-142T349 96t168-71T704 0q97 0 187 25t168 71 142 110 111 143 71 168 25 187q0 51-8 101t-23 98l671 670zm-128 54l-690-690q22-57 36-114t14-119q0-119-45-224t-124-183-183-123-224-46q-119 0-224 45T297 297 174 480t-46 224q0 119 45 224t124 183 183 123 224 46q97 0 190-33t169-95h89v256h256v256h256v256h256v-293zM512 384q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10z" />
    </svg>
  ),
  displayName: 'PermissionsIcon',
});

export default PermissionsIcon;
