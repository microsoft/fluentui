import * as React from 'react';
import createSvgIcon from '@fluentui/react-icons-mdl2/lib/utils/createSvgIcon';

const OutlookSpacesBucketIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="2048" height="2048">
      <path d="M1472 0q40 0 75 15t61 41 41 61 15 75v1664q0 40-15 75t-41 61-61 41-75 15H448q-40 0-75-15t-61-41-41-61-15-75V192q0-40 15-75t41-61 61-41 75-15h1024zm64 1856V192q0-26-19-45t-45-19H448q-26 0-45 19t-19 45v1664q0 26 19 45t45 19h1024q26 0 45-19t19-45zM512 1024V256h896v768H512zm128-640v512h640V384H640zM512 1792v-640h896v640H512zm128-512v384h640v-384H640z" />
    </svg>
  ),
  displayName: 'OutlookSpacesBucketIcon',
});

export default OutlookSpacesBucketIcon;
