import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const CloudImportExportIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1629 769q88 6 164 43t133 97 89 140 33 167q0 93-35 174t-96 142-142 96-175 36h-64v-128h64q66 0 124-25t102-68 69-102 25-125q0-66-25-124t-68-102-102-69-125-25q-18 0-35 2t-35 6q-10-84-49-155t-98-124-135-83-160-30q-70 0-135 21t-119 59-97 91-67 120q-75-35-158-35-80 0-149 30t-122 82-83 123-30 149q0 61 18 117t52 103 81 84 105 56v134q-84-22-154-69t-122-112-79-146-29-167q0-106 40-199t110-162 163-110 199-41q46 0 93 9 40-61 93-110t115-83 132-53 143-19q91 0 175 28t156 78 126 122 84 157zm-733 932l147-146 90 90-301 301-301-301 90-90 147 146v-677h128v677zm659-312l-147-146v677h-128v-677l-147 146-90-90 301-301 301 301-90 90z" />
    </svg>
  ),
  displayName: 'CloudImportExportIcon',
});

export default CloudImportExportIcon;
