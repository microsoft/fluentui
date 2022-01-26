import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const HeartBrokenIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1504 127q113 0 212 42t173 117 116 173 43 212q0 109-41 208t-118 176l-865 865-865-865Q83 979 42 880T0 671q0-113 42-212t117-173 173-116 212-43q111 0 208 40t177 119q24 23 47 47t48 48q24-24 47-48t48-47q79-78 176-118t209-41zm294 838q59-59 90-135t31-159q0-87-32-162t-89-132-131-89-163-33q-84 0-159 31t-135 90q-66 65-128 131T955 639l384 384-302 301-90-90 211-211-384-384 163-164q-26-23-50-49t-49-50q-60-59-134-90t-160-31q-87 0-162 32t-132 89-89 132-33 163q0 82 32 159t90 135l774 774 774-774z" />
    </svg>
  ),
  displayName: 'HeartBrokenIcon',
});

export default HeartBrokenIcon;
