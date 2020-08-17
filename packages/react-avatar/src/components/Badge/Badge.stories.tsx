import * as React from 'react';
import { Status } from '../Status/Status';
import { StoryExample } from '../utils/StoryExample';

export const StatusExamples = () => (
  <StoryExample title="Status">
    <Status size="smallest" state="error" />
    <Status size="smaller" state="info" />
    <Status size="small" state="success" />
    <Status />
    <Status size="large" state="warning" />
    <Status size="larger" />
    <Status size="largest" />
  </StoryExample>
);
