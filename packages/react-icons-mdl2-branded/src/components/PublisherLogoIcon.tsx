import * as React from 'react';
import { createSvgIcon } from '@fluentui/react-icons-mdl2';

const PublisherLogoIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg}>
      <path d="M496 819q49 0 78 19t29 72q0 23-10 37t-27 24-36 12-38 4h-92V819h96zm1552-482v1374q0 33-24 57t-57 24h-175v41q0 36-25 61t-62 26H599q-36 0-61-25t-26-62v-297H85q-35 0-60-25t-25-60V597q0-35 25-60t60-25h427V215q0-36 25-61t62-26h1106q36 0 61 25t26 62v41h175q33 0 57 24t24 57zM767 905q0-58-19-99t-54-68-80-38-100-12H243v671h157v-234h106q49 0 95-14t84-42 59-69 23-95zm897 887v-256H640v256h1024zm0-384v-320h-640v320h640zm0-448V256H640v256h299q35 0 60 25t25 60v363h640zm256 704V384h-128v1280h128z" />
    </svg>
  ),
  displayName: 'PublisherLogoIcon',
});

export default PublisherLogoIcon;
