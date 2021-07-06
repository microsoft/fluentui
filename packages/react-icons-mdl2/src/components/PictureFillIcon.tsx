import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PictureFillIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 0v2048H0V0h2048zm-128 987l-358 357 358 357V987zm-256-731q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10q27 0 50-10t40-27 28-41 10-50zM128 128v677l448-447 896 896 448-449V128h-162q34 58 34 128 0 53-20 99t-55 82-81 55-100 20q-53 0-99-20t-82-55-55-81-20-100q0-70 34-128H128zm1792 1792v-37L576 538 128 987v933h1792z" />
    </svg>
  ),
  displayName: 'PictureFillIcon',
});

export default PictureFillIcon;
