import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const DictionaryRemoveIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 1920h766l128 128H256q-53 0-99-20t-82-55-55-81-20-100V256q0-49 21-95t58-82 82-57 95-22h1408v1219l-64 64-64-64V128H256q-23 0-46 11t-41 30-29 41-12 46v1316q29-17 61-26t67-10h963l64 64-64 64H256q-27 0-50 10t-40 27-28 41-10 50q0 27 10 50t27 40 41 28 50 10zM1280 768H384V384h896v384zM512 512v128h640V512H512zm1469 797l-291 291 291 291-90 90-291-291-291 291-90-90 291-291-291-291 90-90 291 291 291-291 90 90z" />
    </svg>
  ),
  displayName: 'DictionaryRemoveIcon',
});

export default DictionaryRemoveIcon;
