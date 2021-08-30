import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EllipseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1024 256q131 0 268 27t264 85 233 144 175 206q41 71 62 147t22 159q0 82-21 158t-63 148q-68 119-174 206t-233 144-264 84-269 28q-131 0-268-27t-264-85-233-144-175-206q-41-71-62-147T0 1024q0-82 21-158t63-148q68-119 174-206t233-144 264-84 269-28zm0 1408q84 0 169-11t167-36 159-60 146-87q54-40 101-88t81-105 53-120 20-133q0-70-19-133t-54-119-81-105-101-89q-68-50-145-86t-160-61-167-35-169-12q-84 0-169 11t-167 36-159 60-146 87q-54 40-101 88t-81 105-53 120-20 133q0 70 19 133t54 119 81 105 101 89q68 50 145 86t160 61 167 35 169 12z" />
    </svg>
  ),
  displayName: 'EllipseIcon',
});

export default EllipseIcon;
