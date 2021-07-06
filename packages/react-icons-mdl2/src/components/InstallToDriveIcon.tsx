import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const InstallToDriveIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1728 640q66 0 124 25t101 69 69 102 26 124v448h-128V960q0-40-15-75t-41-61-61-41-75-15H320q-40 0-75 15t-61 41-41 61-15 75v320h1408v128H0V960q0-66 25-124t68-101 102-69 125-26h1408zm227 899l90 90-317 317-317-317 90-90 163 162v-549h128v549l163-162zm-163-515h-128V896h128v128zm-384-128h128v128h-128V896z" />
    </svg>
  ),
  displayName: 'InstallToDriveIcon',
});

export default InstallToDriveIcon;
