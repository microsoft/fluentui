import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const PasteAsCodeIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M256 1792h512v128H128V256h512q0-53 20-99t55-82 81-55T896 0q53 0 99 20t82 55 55 81 20 100h512v640h-128V384h-128v256H384V384H256v1408zM512 384v128h768V384h-256V256q0-27-10-50t-27-40-41-28-50-10q-27 0-50 10t-40 27-28 41-10 50v128H512zm525 941l-210 211 210 211-90 90-301-301 301-301 90 90zm1005 211l-301 301-90-90 210-211-210-211 90-90 301 301zm-549-512h128l-341 1024h-128l341-1024z" />
    </svg>
  ),
  displayName: 'PasteAsCodeIcon',
});

export default PasteAsCodeIcon;
