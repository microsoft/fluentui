import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ConstructionConeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1650 1920h270v128H128v-128h270L846 128h356l448 1792zM626 1536l-96 384h988L1102 256H946l-192 768h414l32 128H722l-64 256h606l32 128H626z" />
    </svg>
  ),
  displayName: 'ConstructionConeIcon',
});

export default ConstructionConeIcon;
