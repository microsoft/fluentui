import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ConstructionConeSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 1920v128H128v-128h270l96-384h802l-32-128H526l64-256h610l-32-128H622l224-896h356l448 1792h270z" />
    </svg>
  ),
  displayName: 'ConstructionConeSolidIcon',
});

export default ConstructionConeSolidIcon;
