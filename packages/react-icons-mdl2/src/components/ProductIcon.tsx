import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ProductIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M960 120l832 416v1040l-832 415-832-415V536l832-416zm625 456L960 264 719 384l621 314 245-122zM960 888l238-118-622-314-241 120 625 312zM256 680v816l640 320v-816L256 680zm768 1136l640-320V680l-640 320v816z" />
    </svg>
  ),
  displayName: 'ProductIcon',
});

export default ProductIcon;
