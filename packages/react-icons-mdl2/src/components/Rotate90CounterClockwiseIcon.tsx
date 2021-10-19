import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Rotate90CounterClockwiseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1024q0 124-32 238t-90 214-140 181-181 140-214 91-239 32v-128q106 0 204-27t183-78 156-120 120-155 77-184 28-204q0-106-27-204t-78-183-120-156-155-120-184-77-204-28q-106 0-204 27t-183 78-156 120-120 155-77 184-28 204v37l147-146 90 90-301 301-301-301 90-90 147 146v-10q0-98 16-191t54-185q52-124 137-225t193-172 235-111 261-39q124 0 238 32t214 90 181 140 140 181 91 214 32 239zm-640 0q0 53-20 99t-55 82-81 55-100 20q-53 0-99-20t-82-55-55-81-20-100q0-53 20-99t55-82 81-55 100-20q53 0 99 20t82 55 55 81 20 100zm-384 0q0 27 10 50t27 40 41 28 50 10q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50z" />
    </svg>
  ),
  displayName: 'Rotate90CounterClockwiseIcon',
});

export default Rotate90CounterClockwiseIcon;
