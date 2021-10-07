import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ProvisioningPackageIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1521 887l-123 51q10 40 10 86t-10 86l123 51-48 118-124-51q-46 75-121 121l51 124-118 48-51-123q-40 10-86 10t-86-10l-51 123-118-48 51-124q-75-46-121-121l-124 51-48-118 123-51q-10-40-10-86t10-86l-123-51 48-118 124 51q46-75 121-121l-51-124 118-48 51 123q40-10 86-10t86 10l51-123 118 48-51 124q75 46 121 121l124-51 48 118zm-497 393q52 0 99-20t81-55 55-81 21-100q0-52-20-99t-55-81-82-55-99-21q-53 0-99 20t-81 55-55 82-21 99q0 53 20 99t55 81 81 55 100 21zm779 448l-230 229-74-74 90-91H256v-512h128v384h1205l-90-91 74-74 230 229zM475 549L245 320 475 91l74 74-90 91h1333v512h-128V384H459l90 91-74 74z" />
    </svg>
  ),
  displayName: 'ProvisioningPackageIcon',
});

export default ProvisioningPackageIcon;
