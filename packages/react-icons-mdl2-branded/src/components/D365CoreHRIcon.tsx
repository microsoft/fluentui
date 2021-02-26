import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const D365CoreHRIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M1766 128q30 0 58 10t49 28 34 45 13 58v1497q0 32-12 60t-34 49-49 33-59 12H269q-32 0-58-12t-44-34-29-50-10-58V269q0-29 11-54t30-45 45-31 55-11h1497zM768 1792v-486q0-8-4-14t-9-12H256v486q0 8 4 14t9 12h499zm512 0V781q-5-5-12-9t-14-4H883q-10 69-43 128t-82 101-113 67-133 24q-72 0-138-25t-118-77v166h499q32 0 58 12t44 34 29 50 10 58v486h384zM256 704q0 53 20 99t55 82 81 55 100 20q53 0 99-20t82-55 55-81 20-100q0-53-20-99t-55-82-81-55-100-20q-53 0-99 20t-82 55-55 81-20 100zm1536 1062V269q-5-5-12-9t-14-4H269l-13 13v154q51-52 117-77t139-26q70 0 133 24t112 66 83 102 43 128h371q30 0 58 10t49 28 34 45 13 58v1011h358q10 0 18-8t8-18z" />
    </svg>
  ),
  displayName: 'D365CoreHRIcon',
});

export default D365CoreHRIcon;
