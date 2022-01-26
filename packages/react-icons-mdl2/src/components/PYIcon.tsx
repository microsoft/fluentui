import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PYIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 128v1792H128V128h1792zm-119 119H247v1554h1554V247zM602 1664h-90V896h211q55 0 102 13t83 41 54 71 20 104q0 61-22 107t-60 78-89 48-108 16H602v290zm0-372h94q40 0 75-8t61-28 40-51 15-76q0-42-13-71t-38-47-57-26-72-8H602v315zm680 90l-247-486h102l172 347q6 11 10 23t11 24q3-13 8-24t12-23l180-347h95l-253 484v284h-90v-282z" />
    </svg>
  ),
  displayName: 'PYIcon',
});

export default PYIcon;
