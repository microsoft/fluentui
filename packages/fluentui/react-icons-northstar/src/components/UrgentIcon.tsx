import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const UrgentIcon = createSvgIcon({
  svg: ({ classes, icons }) => (icons['urgent'] ? icons['urgent'].icon({ classes }) : null),
  displayName: 'UrgentIcon',
});

export default UrgentIcon;
