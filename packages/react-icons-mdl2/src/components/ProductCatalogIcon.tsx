import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ProductCatalogIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 1792q0 27 10 50t27 40 41 28 50 10h640l257 128H256q-53 0-99-20t-82-55-55-81-20-100V256q0-49 21-95t57-82 82-57 96-22h1408v681l-128-64V128H256q-23 0-46 11t-41 30-29 41-12 46v1316q29-17 61-26t67-10h512v128H256q-27 0-50 10t-40 27-28 41-10 50zm1920-777v762l-576 287-576-287v-762l576-287 576 287zm-576-144l-369 184 369 184 369-184-369-184zm-448 827l384 191v-539l-384-192v540zm896 0v-540l-384 192v539l384-191z" />
    </svg>
  ),
  displayName: 'ProductCatalogIcon',
});

export default ProductCatalogIcon;
