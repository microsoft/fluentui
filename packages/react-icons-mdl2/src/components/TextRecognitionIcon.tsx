import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TextRecognitionIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M128 1152v384h384v128H0v-512h128zm390-502h117l234 628H754l-56-160H451l-54 160H283l235-628zm-40 383h193l-88-250q-3-9-4-19t-4-21h-2q-2 10-3 20t-5 20l-87 250zM128 384v384H0V256h512v128H128zm1239 657q0 48-11 92t-36 79-62 55-92 21q-86 0-132-75h-1v65H931V614h102v294h1q25-43 63-66t89-23q48 0 82 18t57 50 32 71 10 83zm-104 0q0-27-6-52t-19-45-34-32-52-12q-29 0-51 11t-38 29-23 43-8 52v55q0 24 8 45t22 38 34 25 46 10q35 0 58-15t37-39 20-54 6-59zm273-785h512v512h-128V384h-384V256zm384 1280v-384h128v512h-512v-128h384zm-256-248q-50 0-91-16t-70-46-45-71-16-91q0-55 17-100t48-77 76-50 101-18q55 0 108 21v95q-21-15-47-25t-53-10q-35 0-62 12t-45 34-29 50-10 62q0 67 36 108t106 42q32 0 55-10t49-29v88q-29 17-61 24t-67 7z" />
    </svg>
  ),
  displayName: 'TextRecognitionIcon',
});

export default TextRecognitionIcon;
