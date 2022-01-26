import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const ParachuteIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1920 832q0 29-10 53t-28 46-39 38-45 30q-11 7-20 9t-20 13l-478 478v453q0 40-28 68t-68 28H736q-40 0-68-28t-28-68v-453l-478-478q-10-10-19-12t-21-10q-23-13-45-30t-39-38-27-45-11-54q0-127 38-238t106-203 160-165 198-123 223-76T960 0q117 0 234 26t223 77 199 122 159 165 106 204 39 238zM960 128q-99 0-199 22t-193 64-173 102-139 139-94 173-34 204q0 8 5 15t12 14 15 12 13 8q46 29 107 51t132 38 144 26 147 16 138 9 119 3q52 0 118-2t138-9 147-17 145-26 131-38 108-51q5-3 12-8t15-12 13-14 5-15q0-109-34-203t-93-173-140-139-172-103-193-64-200-22zm-64 1023q-118-2-236-13t-234-35l305 305h165v-257zm256 385H768v384h384v-384zm342-433q-116 23-234 34t-236 14v257h165l305-305z" />
    </svg>
  ),
  displayName: 'ParachuteIcon',
});

export default ParachuteIcon;
