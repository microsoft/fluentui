import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TextFieldIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 256v1408H0V256h2048zm-128 128H128v1152h1792V384zM397 1278H283l235-628h117l234 628H754l-56-160H451l-54 160zm176-535q-2 10-3 20t-5 20l-87 250h193l-88-250q-3-9-4-19t-4-21h-2zm460 535H931V614h102v294h1q26-43 63-66t89-23q48 0 82 18t57 50 32 71 10 83q0 48-11 92t-36 79-62 55-92 21q-86 0-132-75h-1v65zm-1-188q0 24 8 45t22 38 34 25 46 10q35 0 58-15t37-39 20-54 6-59q0-26-6-51t-19-46-34-32-52-12q-29 0-51 11t-38 29-23 43-8 52v55zm632 198q-50 0-91-16t-70-46-45-71-16-91q0-55 17-100t48-77 76-50 101-18q28 0 55 5t53 16v95q-22-16-47-25t-53-10q-35 0-62 12t-45 34-29 50-10 62q0 66 37 108t105 42q29 0 55-10t49-29v88q-29 17-62 24t-66 7z" />
    </svg>
  ),
  displayName: 'TextFieldIcon',
});

export default TextFieldIcon;
