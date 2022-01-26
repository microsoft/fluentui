import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const VaccinationIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M1955 637l-99-99-166 166 99 99-90 90-99-99-869 870H474l-202 203-272 90 384-384v-256l870-869-99-99 90-90 99 99 166-166-99-99 90-90 544 544-90 90zM677 1536l832-832-165-165-229 229 82 83-90 90-83-82-102 101 83 83-90 90-83-83-101 102 82 83-90 90-83-82-128 128v165h165zm923-923l165-165-165-165-165 165 165 165z" />
    </svg>
  ),
  displayName: 'VaccinationIcon',
});

export default VaccinationIcon;
