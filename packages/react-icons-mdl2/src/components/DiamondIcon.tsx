import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DiamondIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1928 829l-904 1113L120 829l537-573h734l537 573zm-666-61l-144-384H930L786 768h476zM779 896l245 858 245-858H779zm-93-512L327 768h343l144-384H686zM314 896l542 667-191-667H314zm878 667l542-667h-351l-191 667zm529-795l-359-384h-128l144 384h343z" />
    </svg>
  ),
  displayName: 'DiamondIcon',
});

export default DiamondIcon;
