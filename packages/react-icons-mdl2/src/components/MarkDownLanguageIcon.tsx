import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MarkDownLanguageIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M643 1430q14-40 28-79t32-78l393-889h184v1280h-146V805q0-63 3-124t6-125q-8 31-16 63t-22 61l-429 984h-72L176 688q-14-31-22-65t-19-67q5 63 6 125t1 126v857H0V384h194l386 893q16 37 32 75t25 78h6zm1386-41l-301 301-301-301 90-90 147 146V384h128v1061l147-146 90 90z" />
    </svg>
  ),
  displayName: 'MarkDownLanguageIcon',
});

export default MarkDownLanguageIcon;
