import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const VisioDiagramSyncIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1152 768h896v256h-128V896h-640v128H979l-339 226v158h384v512H128v-512h384v-158L77 960l435-290V512H216q-18 0-34-7t-28-19-19-28-7-34V88q0-18 7-34t19-28 28-19 34-7h720q18 0 34 7t28 19 19 28 7 34v336q0 18-7 34t-19 28-28 19-34 7H640v158l339 226h173V768zM256 128v256h640V128H256zm640 1664v-256H256v256h640zm-320-653l269-179-269-179-269 179 269 179zm1344 150v-137h128v384h-384v-128h190q-45-60-112-94t-142-34q-59 0-111 20t-95 55-70 85-38 107l-127-22q14-81 54-149t98-118 133-78 156-28q91 0 174 35t146 102zm-320 631q58 0 111-20t95-55 70-85 38-107l127 22q-14 81-54 149t-98 118-133 78-156 28q-91 0-174-35t-146-102v137h-128v-384h384v128h-190q45 60 112 94t142 34z" />
    </svg>
  ),
  displayName: 'VisioDiagramSyncIcon',
});

export default VisioDiagramSyncIcon;
