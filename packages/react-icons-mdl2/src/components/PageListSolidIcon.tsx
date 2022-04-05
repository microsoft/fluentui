import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PageListSolidIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 0v1792H256V0h1536zM640 1152H512v128h128v-128zm0-384H512v128h128V768zm0-384H512v128h128V384zm896 768H768v128h768v-128zm0-384H768v128h768V768zm0-384H768v128h768V384z" />
    </svg>
  ),
  displayName: 'PageListSolidIcon',
});

export default PageListSolidIcon;
