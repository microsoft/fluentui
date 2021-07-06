import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ProductVariantIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1344 2l704 352v785l-128-64V497l-512 256v258l-128 64V753L768 497v227l-128-64V354L1344 2zm0 640l177-89-463-265-211 106 497 248zm315-157l182-91-497-249-149 75 464 265zm-507 654l-128 64v-1l-384 192v455l384-193v144l-448 224L0 1735v-676l576-288 576 288v80zm-640 710v-455l-384-192v454l384 193zm64-566l369-184-369-185-369 185 369 184zm576-1l448-224 448 224v527l-448 224-448-224v-527zm384 576v-305l-256-128v305l256 128zm384-128v-305l-256 128v305l256-128zm-320-288l241-121-241-120-241 120 241 121z" />
    </svg>
  ),
  displayName: 'ProductVariantIcon',
});

export default ProductVariantIcon;
