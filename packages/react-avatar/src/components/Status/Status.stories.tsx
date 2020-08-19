import * as React from 'react';
import { Status } from '../Status/Status';
import { StoryExample } from '../utils/StoryExample';

// tslint:disable:no-any

export const StatusCss = () => (
  <StoryExample title="Status (css)">
    <Status size="smallest" state="error" />
    <Status size="smaller" state="info" />
    <Status size="small" state="success" />
    <Status />
    <Status size="large" state="warning" />
    <Status size="larger" />
    <Status size="largest" />
  </StoryExample>
);
