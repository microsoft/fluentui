import * as React from 'react';
import createSvgIcon from '@fluentui/react-icons-mdl2/lib/utils/createSvgIcon';

const CloudEditIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="2048" height="2048">
      <path d="M897 1536l-128 128H512q-106 0-199-40t-162-110-110-163-41-199q0-106 40-199t110-162 163-110 199-41q46 0 93 9 40-62 92-111t115-83 132-53 144-18q96 0 184 30t162 86 126 132 81 170q-32 20-58 47t-53 54q-11-84-49-155t-98-124-135-82-160-30q-63 0-121 17t-109 48-93 76-72 99l-25 46q-38-13-76-21t-80-9q-80 0-149 30t-122 82-83 123-30 149q0 80 30 149t82 122 122 83 150 30h385zm1151-442q0 39-15 76t-43 65l-717 717-377 94 94-377 717-716q29-29 65-43t76-14q42 0 78 15t64 41 42 63 16 79zm-128 0q0-31-20-50t-52-20q-14 0-27 4t-23 15l-692 692-34 135 135-34 692-691q21-21 21-51z" />
    </svg>
  ),
  displayName: 'CloudEditIcon',
});

export default CloudEditIcon;
