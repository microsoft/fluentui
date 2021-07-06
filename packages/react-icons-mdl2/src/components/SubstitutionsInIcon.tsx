import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const SubstitutionsInIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1045 0l875 1278h-512v770H638v-770H128L1045 0zm235 1150h397l-635-927-665 927h389v770h514v-770z" />
    </svg>
  ),
  displayName: 'SubstitutionsInIcon',
});

export default SubstitutionsInIcon;
