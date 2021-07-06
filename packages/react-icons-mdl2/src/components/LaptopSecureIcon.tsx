import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const LaptopSecureIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M884 1536q15 67 42 128H128q-27 0-50-10t-40-27-28-41-10-50q0-16 3-34t8-38 14-35 21-29l210-211V256h1536v611q-30-17-62-28t-66-19V384H384v768h480v128H347l-206 205q-3 3-5 10t-4 14-3 15-1 12H64h820zm652-571q59 0 108 14t100 43q42 25 96 31t108 7h51q25 0 49-1v325q0 105-38 198t-101 173-145 144-169 110l-59 31-60-31q-87-45-168-109t-145-145-101-173-38-198v-325h50q26 0 54 1 53 0 106-6t96-33q50-29 99-42t107-14zm384 222q-66 0-127-12t-118-45q-34-20-66-28t-73-9q-38 0-71 8t-66 28q-58 33-119 45t-128 13v197q0 86 33 162t88 142 123 118 140 90q70-37 139-89t123-118 88-142 34-163v-197z" />
    </svg>
  ),
  displayName: 'LaptopSecureIcon',
});

export default LaptopSecureIcon;
