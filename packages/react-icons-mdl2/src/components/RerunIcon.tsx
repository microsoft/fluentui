import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RerunIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1152 640V512h421l-107-107-108-108q-81-80-182-122t-216-43q-79 0-151 21t-136 58-116 91-89 117-58 137-21 151q0 112 42 214t122 181l599 599v182l-690-690q-97-97-149-224t-53-265q0-96 25-185t72-167 110-142 143-109 167-71T963 5q125 0 219 34t174 91 153 133 155 158V0h128v640h-640zm128 512l768 448-768 448v-896zm128 223v450l386-225-386-225z" />
    </svg>
  ),
  displayName: 'RerunIcon',
});

export default RerunIcon;
