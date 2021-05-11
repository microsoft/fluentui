import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const CloudUploadIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1629 769q88 6 164 43t133 97 89 140 33 167q0 93-35 174t-96 142-142 96-175 36h-320v-128h320q66 0 124-25t102-68 69-102 25-125q0-66-25-124t-68-102-102-69-125-25q-18 0-35 2t-35 6q-10-84-49-155t-98-124-135-83-160-30q-70 0-135 21t-119 59-97 91-67 120q-75-35-158-35-80 0-149 30t-122 82-83 123-30 149q0 80 30 149t82 122 122 83 150 30h384v128H512q-106 0-199-40t-162-110-110-163-41-199q0-106 40-199t110-162 163-110 199-41q46 0 93 9 40-61 93-110t115-83 132-53 143-19q91 0 175 28t156 78 126 122 84 157zm-330 620l-147-146v677h-128v-677l-147 146-90-90 301-301 301 301-90 90z" />
    </svg>
  ),
  displayName: 'CloudUploadIcon',
});

export default CloudUploadIcon;
