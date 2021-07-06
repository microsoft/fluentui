import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LookupEntitiesIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 835l-128-128V256h-512v512h-128V256H768v1408h512v-512h128v512h512v-451l128-128v707H0V128h2048v707zM640 768H128v384h512V768zm0 896v-384H128v384h512zm0-1408H128v384h512V256zm899 931l162-163h-677V896h677l-162-163 90-90 317 317-317 317-90-90z" />
    </svg>
  ),
  displayName: 'LookupEntitiesIcon',
});

export default LookupEntitiesIcon;
