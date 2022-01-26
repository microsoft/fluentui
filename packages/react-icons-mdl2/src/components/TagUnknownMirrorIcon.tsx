import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TagUnknownMirrorIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1600 448q0 27-10 50t-27 40-41 28-50 10q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10q27 0 50 10t40 27 28 41 10 50zM181 1024l715 715 384-384v181l-384 384L0 1024 1024 0h896v896l-105 105q-44-9-87-9-25 0-49 3t-49 10l162-162V128h-715l-896 896zm1483 1024v-128h128v128h-128zm64-896q53 0 99 20t82 55 55 81 20 100h-128q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50q0 29 14 52t35 45 47 44 46 51 36 63 14 81v48h-128v-48q0-29-14-52t-35-45-47-44-46-51-36-62-14-82q0-53 20-99t55-82 81-55 100-20z" />
    </svg>
  ),
  displayName: 'TagUnknownMirrorIcon',
});

export default TagUnknownMirrorIcon;
