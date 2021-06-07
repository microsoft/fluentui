import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TextOverflowIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M507 650l234 628H626l-56-160H323l-54 160H155l235-628h117zm36 383l-88-250q-3-9-5-20t-4-20q-2 9-3 19t-6 21l-87 250h193zm498-214q48 0 82 18t57 50 32 71 10 83q0 48-11 92t-36 79-62 55-92 21q-85 0-134-75v65H785V614h104v294q51-89 152-89zm-44 389q34 0 57-15t38-40 20-53 6-59q0-26-6-51t-20-46-35-32-51-12q-29 0-51 11t-38 29-23 43-8 52v55q0 24 8 45t22 38 35 25 46 10zm987-56q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45q0-26 19-45t45-19zm-256 0q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45q0-26 19-45t45-19zm-256 0q26 0 45 19t19 45q0 26-19 45t-45 19q-26 0-45-19t-19-45q0-26 19-45t45-19z" />
    </svg>
  ),
  displayName: 'TextOverflowIcon',
});

export default TextOverflowIcon;
