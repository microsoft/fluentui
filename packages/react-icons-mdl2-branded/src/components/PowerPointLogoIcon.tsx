import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const PowerPointLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1152 128q124 0 238 32t214 90 181 140 140 181 91 214 32 239q0 124-32 238t-90 214-140 181-181 140-214 91-239 32q-110 0-215-26t-199-75-176-121-145-162H85q-35 0-60-25t-25-60V597q0-35 25-60t60-25h332q63-90 144-161t176-121 200-76 215-26zm64 131v701h701q-12-140-70-262t-152-216-217-152-262-71zM767 905q0-58-19-99t-54-68-80-38-100-12H243v671h157v-234h106q49 0 95-14t84-42 59-69 23-95zm385 887q100 0 193-24t175-70 152-109 121-142 84-170 40-190h-828V259q-148 12-279 77T580 512h359q35 0 60 25t25 60v854q0 35-25 60t-60 25H580q55 61 120 108t139 81 152 50 161 17zM496 819q49 0 78 19t29 72q0 23-10 37t-27 24-36 12-38 4h-92V819h96z" />
    </svg>
  ),
  displayName: 'PowerPointLogoIcon',
});

export default PowerPointLogoIcon;
