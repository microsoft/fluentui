import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const AsteriskIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1943 568l-791 456 791 456-64 112-791-457v913H960v-913l-791 457-64-112 791-456-791-456 64-112 791 457V0h128v913l791-457 64 112z" />
    </svg>
  ),
  displayName: 'AsteriskIcon',
});

export default AsteriskIcon;
