import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const ProjectLogo16Icon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M2048 1536v384q0 27-10 50t-27 40-41 28-50 10H640q-27 0-50-10t-40-27-28-41-10-50v-256H128q-26 0-49-10t-41-27-28-41-10-50V512q0-26 10-49t27-41 41-28 50-10h128V160q0-30 10-58t29-51 45-37 58-14h996q32 0 58 14t45 36 29 51 10 59v480h110q30 0 56 11t47 32 31 46 12 57v622h128q27 0 50 10t40 27 28 41 10 50zm-402-768h-366v640h384V786q0-8-5-13t-13-5zM384 160v224h768q26 0 49 10t41 27 28 41 10 50v128h128V160q0-2-1-7t-2-11-5-10-6-4H398q-3 0-6 4t-4 9-3 11-1 8zm183 1009h107q65 0 121-19t99-57 66-91 24-122q0-70-22-121t-62-85-95-50-122-16H361v832h206v-271zm1353 751v-384h-640q0 26-10 49t-27 41-41 28-50 10H640v256h1280zM770 886q0 57-29 79t-83 22h-91V791h95q53 0 80 20t28 75z" />
    </svg>
  ),
  displayName: 'ProjectLogo16Icon',
});

export default ProjectLogo16Icon;
