import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const MailReplyAllIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 384v1082q-29-23-61-39t-67-29V583l-896 449-896-449v953h704v128H0V384h2048zM1024 888l753-376H271l753 376zm91 712l226 227-90 90-318-317 318-317 90 90-226 227zm384-64q50 0 110-2t122 0 118 14 101 40 71 78 27 126q0 53-20 99t-55 81-82 55-99 21v-128q27 0 50-10t40-27 28-41 10-50q0-27-10-50t-27-40-41-28-50-10h-293l162 163-90 90-317-317 317-317 90 90-162 163z" />
    </svg>
  ),
  displayName: 'MailReplyAllIcon',
});

export default MailReplyAllIcon;
