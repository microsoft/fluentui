import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const FolderOpenIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1536 0q26 0 49 10t41 27 28 41 10 50v928q0 31 9 54t24 43 31 41 31 46 23 58 10 78v288q0 26-10 49t-27 41-41 28-50 10H768v128q0 39-21 71t-58 47q-23 10-49 10-53 0-91-38l-293-293V0h1280zM640 1568q0-45 9-77t24-58 31-46 31-40 23-44 10-55V603L384 219v1445l256 256v-352zm1024-192q0-31-9-54t-24-43-31-41-31-46-23-58-10-78V128H475l384 384q18 18 27 41t10 50v645q0 45-9 77t-24 58-31 46-31 40-23 44-10 55v96h896v-288z" />
    </svg>
  ),
  displayName: 'FolderOpenIcon',
});

export default FolderOpenIcon;
