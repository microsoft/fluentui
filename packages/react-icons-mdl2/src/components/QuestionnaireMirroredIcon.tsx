import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const QuestionnaireMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1792 549v1499H128V0h1115l549 549zm-512-37h293l-293-293v293zm384 128h-512V128H256v1792h1408V640zm-512 256h384v384h-384V896zm128 256h128v-128h-128v128zm-896-128h640v128H384v-128zm0-512h640v128H384V512zm768 896h384v384h-384v-384zm128 256h128v-128h-128v128zm-896-128h640v128H384v-128z" />
    </svg>
  ),
  displayName: 'QuestionnaireMirroredIcon',
});

export default QuestionnaireMirroredIcon;
