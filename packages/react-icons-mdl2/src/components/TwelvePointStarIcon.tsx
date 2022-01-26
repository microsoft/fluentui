import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TwelvePointStarIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1754 1220l142 308-338 30-30 338-308-142-196 277-196-277-308 142-30-338-338-30 142-308-277-196 277-196-142-308 338-30 30-338 308 142 196-277 196 277 308-142 30 338 338 30-142 308 277 196-277 196zm-50 196l-111-240 216-152-216-152 111-240-264-24-24-264-240 111-152-216-152 216-240-111-24 264-264 24 111 240-216 152 216 152-111 240 264 24 24 264 240-111 152 216 152-216 240 111 24-264 264-24z" />
    </svg>
  ),
  displayName: 'TwelvePointStarIcon',
});

export default TwelvePointStarIcon;
