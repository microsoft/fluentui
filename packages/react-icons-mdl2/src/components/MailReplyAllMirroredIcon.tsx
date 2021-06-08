import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MailReplyAllMirroredIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M0 384v1082q29-23 61-39t67-29V583l896 449 896-449v953h-704v128h832V384H0zm1024 504L271 512h1506l-753 376zm-91 712l-226 227 90 90 318-317-318-317-90 90 226 227zm-384-64q-50 0-110-2t-122 0-118 14-101 40-71 78-27 126q0 53 20 99t55 81 82 55 99 21v-128q-27 0-50-10t-40-27-28-41-10-50q0-27 10-50t27-40 41-28 50-10h293l-162 163 90 90 317-317-317-317-90 90 162 163z" />
    </svg>
  ),
  displayName: 'MailReplyAllMirroredIcon',
});

export default MailReplyAllMirroredIcon;
