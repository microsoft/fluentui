import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RowsChildIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1024v640H768v-256H256V896H0V256h1280v640H384v384h384v-256h1280zM128 768h1024V384H128v384zm1792 384H896v384h1024v-384z" />
    </svg>
  ),
  displayName: 'RowsChildIcon',
});

export default RowsChildIcon;
