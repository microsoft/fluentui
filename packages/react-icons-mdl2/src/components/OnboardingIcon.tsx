import * as React from 'react';
import createSvgIcon from '../utils/createSvgIcon';

const OnboardingIcon = createSvgIcon({
  svg: ({ classes }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" className={classes.svg} focusable="false">
      <path d="M2048 512v1536H0V512h517q-2-16-3-32t-2-32q0-93 35-174t96-143 142-96T960 0q93 0 174 35t143 96 96 142 35 175q0 16-1 32t-4 32h645zM960 128q-66 0-124 25t-102 69-69 102-25 124q0 66 25 124t68 102 102 69 125 25q66 0 124-25t101-68 69-102 26-125q0-66-25-124t-69-101-102-69-124-26zm960 512h-555q-25 52-62 97t-85 77q103 40 186 106t140 152 89 188 31 212v64h-128v-64q0-123-44-228t-121-183-182-121-229-44q-111 0-210 38t-176 107-126 162-61 205h648l-230-230 91-90 384 384-384 384-91-90 230-230H256v-64q0-110 31-211t90-187 141-152 185-107q-98-69-148-175H128v1280h1792V640z" />
    </svg>
  ),
  displayName: 'OnboardingIcon',
});

export default OnboardingIcon;
