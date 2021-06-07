import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const NewFolderIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 0q27 0 50 10t40 27 28 41 10 50v992q0 31 9 54t24 44 31 41 31 45 23 58 10 78v480q0 27-10 50t-27 40-41 28-50 10H768v-128h896v-480q0-45 9-77t24-58 31-46 31-40 23-44 10-55V128H512v768H384V0h1408zm128 1440q0-24-4-42t-13-33-20-29-27-32q-15 17-26 31t-20 30-13 33-5 42v480h128v-480zM896 1664H512v384H384v-384H0v-128h384v-384h128v384h384v128z" />
    </svg>
  ),
  displayName: 'NewFolderIcon',
});

export default NewFolderIcon;
