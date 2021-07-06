import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const Header2Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M768 384h128v1408H768v-640H128v640H0V384h128v640h640V384zm1186 373q0 82-19 147t-52 119-79 99-97 86-109 81-113 84q-22 17-45 37t-44 42-38 47-26 52q-8 25-11 56t-4 57h603v128h-768q0-57 1-113t18-112q19-65 55-117t84-98 101-84 108-80 103-82 87-92 60-109 23-135q0-59-18-105t-51-79-80-50-106-18q-48 0-94 13t-88 37-80 54-69 65V517q39-37 78-62t83-41 90-23 100-7q85 0 157 25t126 73 84 117 30 158z" />
    </svg>
  ),
  displayName: 'Header2Icon',
});

export default Header2Icon;
