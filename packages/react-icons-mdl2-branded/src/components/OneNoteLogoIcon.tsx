import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const OneNoteLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1963 128q35 0 60 25t25 60v1622q0 35-25 60t-60 25H597q-35 0-60-25t-25-60v-299H85q-35 0-60-25t-25-60V597q0-35 25-60t60-25h427V213q0-35 25-60t60-25h1366zM389 939l242 420h152V689H635v429L402 689H241v670h148V939zm1531 853v-256h-256v256h256zm0-384v-256h-256v256h256zm0-384V768h-256v256h256zm0-384V256H640v256h299q35 0 60 25t25 60v854q0 35-25 60t-60 25H640v256h896V640h384z" />
    </svg>
  ),
  displayName: 'OneNoteLogoIcon',
});

export default OneNoteLogoIcon;
