import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EventDateMissed12Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 171h341v1877H0V171h341V0h171v171h853V0h171v171zm171 1706V683H171v1194h1536zm0-1365V341H171v171h1536zm-854 853V853h171v512H853zm0 342v-171h171v171H853z" />
    </svg>
  ),
  displayName: 'EventDateMissed12Icon',
});

export default EventDateMissed12Icon;
