import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PublishContentIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M896 347L493 749l-90-90 557-557 557 557-90 90-403-402v1317H896V347zm768 1317h128v384H128v-384h128v256h1408v-256z" />
    </svg>
  ),
  displayName: 'PublishContentIcon',
});

export default PublishContentIcon;
