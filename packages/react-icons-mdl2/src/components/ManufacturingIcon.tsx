import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ManufacturingIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1317v219h-128v-165l-109-110 3-3q-40 22-89 22-44 0-81-18l-108 109v165h-128v-219l145-144-3-7-251-562-408 421q2 16 3 31t2 32v832h128v128H0v-128h128v-832q0-76 28-143t76-119 114-84 142-37l608-627q36-38 84-58t100-20q35 0 70 10t67 30 57 46 40 60l384 858q9 20 13 41t4 42q0 24-5 47t-17 45l8-8 147 146zM768 1920v-832q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100v832h512zM644 727q62 23 113 65t85 99l530-546q36-38 36-89 0-27-10-50t-27-40-41-28-50-10q-55 0-92 39L644 727zm845-324q-18 29-44 53t-50 49l197 441 117-50-220-493zm236 749q29 0 46-19t17-46q0-20-9-38t-18-36l-117 50q6 15 12 31t15 29 21 21 33 8zM512 1024q27 0 50 10t40 27 28 41 10 50q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10z" />
    </svg>
  ),
  displayName: 'ManufacturingIcon',
});

export default ManufacturingIcon;
