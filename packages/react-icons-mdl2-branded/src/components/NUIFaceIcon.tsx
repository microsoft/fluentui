import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const NUIFaceIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1019 1575q-101 0-199-26t-187-74-164-118-127-156q-17-26-17-56 0-21 8-40t22-33 33-22 40-8q28 0 50 13t38 36q94 136 220 207t296 71q160 0 286-74t216-204q15-22 35-35t49-14q45 0 76 28t31 75q0 15-4 27t-12 26q-24 44-57 82t-70 73q-115 109-260 165t-303 57zM815 579q0 33-13 63t-35 52-51 36-64 13q-34 0-63-13t-52-35-35-51-13-64q0-34 12-64t35-52 51-36 64-13q34 0 63 13t52 35 36 52 13 64zm420 0q0-34 13-64t35-52 52-35 64-13q34 0 63 13t52 35 34 52 13 64q0 34-13 63t-35 52-51 36-64 13q-34 0-63-13t-52-35-35-52-13-64z" />
    </svg>
  ),
  displayName: 'NUIFaceIcon',
});

export default NUIFaceIcon;
