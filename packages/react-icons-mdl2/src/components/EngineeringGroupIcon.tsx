import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EngineeringGroupIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M453 512q110-123 258-189t313-67q32 0 64 3t64 8v130q-32-6-64-9t-64-4q-104 0-200 33t-180 95H453zm1198 640q6-32 9-64t4-64q0-32-3-64t-10-64h130q5 32 8 64t3 64q0 32-3 64t-8 64h-130zM515 1408q45 60 102 107t122 81 138 50 147 18q32 0 64-3t64-10v130q-32 5-64 8t-64 3q-103 0-200-26t-183-77-158-121-123-160h155zM2048 128v640h-768V128h768zm-128 128h-512v384h512V256zm-640 1024h768v640h-768v-640zm128 512h512v-384h-512v384zm-640-512H0V640h768v640zM640 768H128v384h512V768z" />
    </svg>
  ),
  displayName: 'EngineeringGroupIcon',
});

export default EngineeringGroupIcon;
