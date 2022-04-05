import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const RecurringTaskIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 1152v384h-384v-128h190q-45-60-112-94t-142-34q-59 0-111 20t-95 55-70 85-38 107l-127-22q14-81 54-149t98-118 133-78 156-28q91 0 174 35t146 102v-137h128zm-448 768q58 0 111-20t95-55 70-85 38-107l127 22q-14 81-54 149t-98 118-133 78-156 28q-91 0-174-35t-146-102v137h-128v-384h384v128h-190q45 60 112 94t142 34zM576 1061l627-626 90 90-717 718-333-334 90-90 243 242zm-448 347h912q-11 31-18 63t-10 65H0V0h1536v1012q-33 3-65 10t-63 18V128H128v1280z" />
    </svg>
  ),
  displayName: 'RecurringTaskIcon',
});

export default RecurringTaskIcon;
