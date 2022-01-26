import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const OpenFolderHorizontalIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 768q26 0 49 10t41 27 28 41 10 49q0 30-14 58l-419 839H0V384q0-27 10-50t27-40 41-28 50-10h352q45 0 77 9t58 24 46 31 40 31 44 23 55 10h736q27 0 50 10t40 27 28 41 10 50v256h256zM128 1457l309-618q17-33 47-52t68-19h984V512H800q-45 0-77-9t-58-24-46-31-40-31-44-23-55-10H128v1073zm1792-561H552l-384 768h1368l384-768z" />
    </svg>
  ),
  displayName: 'OpenFolderHorizontalIcon',
});

export default OpenFolderHorizontalIcon;
