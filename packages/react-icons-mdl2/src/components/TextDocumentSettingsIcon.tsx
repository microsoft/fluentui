import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const TextDocumentSettingsIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
      <path d="M1103 1920q23 37 52 68t62 60H128V0h1115l549 549v494q-63-22-128-29V640h-512V128H256v1792h847zm177-1701v293h293l-293-293zm-128 998q-13 15-25 30t-24 33H512v-128h640v65zm-640 319v-128h512v60q0 14-4 33t-6 35H512zm896-640v128H512V896h896zm512 704q0 31-6 61l124 51-49 119-124-52q-35 51-86 86l52 124-119 49-51-124q-30 6-61 6t-61-6l-51 124-119-49 52-124q-51-35-86-86l-124 52-49-119 124-51q-6-30-6-61t6-61l-124-51 49-119 124 52q18-25 39-47t47-39l-52-124 119-49 51 124q30-6 61-6t61 6l51-124 119 49-52 124q51 35 86 86l124-52 49 119-124 51q6 30 6 61zm-128 0q0-40-15-75t-41-61-61-41-75-15q-40 0-75 15t-61 41-41 61-15 75q0 40 15 75t41 61 61 41 75 15q40 0 75-15t61-41 41-61 15-75z" />
    </svg>
  ),
  displayName: 'TextDocumentSettingsIcon',
});

export default TextDocumentSettingsIcon;
