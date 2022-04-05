import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PageHeaderIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M127 0h1792v2048H127V0zm1665 1921V129H256v1792h1536zM1663 258v639H383V258h1280zm-127 510V387H512v381h1024zm127 256v641H383v-641h1280zm-127 512v-383H512v383h1024z" />
    </svg>
  ),
  displayName: 'PageHeaderIcon',
});

export default PageHeaderIcon;
