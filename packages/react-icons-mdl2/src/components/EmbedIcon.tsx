import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const EmbedIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M467 595l90 90-338 339 338 339-90 90-430-429 430-429zm1114 0l430 429-430 429-90-90 338-339-338-339 90-90zM701 1792l512-1536h134L835 1792H701z" />
    </svg>
  ),
  displayName: 'EmbedIcon',
});

export default EmbedIcon;
