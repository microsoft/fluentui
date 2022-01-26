import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RelationshipIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 640h-640V482L691 960l717 478v-158h640v640h-640v-328l-768-512v200H0V640h640v200l768-512V0h640v640zm-512 768v384h384v-384h-384zM512 1152V768H128v384h384zM1536 128v384h384V128h-384z" />
    </svg>
  ),
  displayName: 'RelationshipIcon',
});

export default RelationshipIcon;
