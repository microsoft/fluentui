import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ImageDiffIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 0v1920H0V0h2048zM128 896h933L576 410 128 859v37zm1573 0l-293-293-230 229 65 64h458zM128 1792h933l-485-486-448 449v37zm1115 0h458l-293-293-230 229 65 64zm677-768H128v549l448-447 512 512 320-321 475 475h37v-768zm0-128V128H128v549l448-447 512 512 320-321 475 475h37z" />
    </svg>
  ),
  displayName: 'ImageDiffIcon',
});

export default ImageDiffIcon;
