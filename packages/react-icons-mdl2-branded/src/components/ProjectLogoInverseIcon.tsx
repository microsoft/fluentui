import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const ProjectLogoInverseIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M496 819q49 0 78 19t29 72q0 23-10 37t-27 24-36 12-38 4h-92V819h96zm1552 546v470q0 35-25 60t-60 25H789q-35 0-60-25t-25-60v-299H85q-35 0-60-25t-25-60V597q0-35 25-60t60-25h171V213q0-35 25-60t60-25h918q35 0 60 25t25 60v491h235q35 0 60 25t25 60v491h299q35 0 60 25t25 60zm-512-533h-512v448h512V832zm-769 73q0-58-19-99t-54-68-80-38-100-12H243v671h157v-234h106q49 0 95-14t84-42 59-69 23-95zM384 512h555q35 0 60 25t25 60v107h192V256H384v256zm1536 1280v-384h-896v43q0 35-25 60t-60 25H832v256h1088z" />
    </svg>
  ),
  displayName: 'ProjectLogoInverseIcon',
});

export default ProjectLogoInverseIcon;
