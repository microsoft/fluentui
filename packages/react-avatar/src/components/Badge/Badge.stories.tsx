import * as React from 'react';
import { Badge } from '../Badge/Badge';
import { StoryExample } from '../utils/StoryExample';

export const BadgeExamples = () => (
  <StoryExample title="Badge">
    <Badge size="smallest" state="error" />
    <Badge size="smaller" state="info" />
    <Badge size="small" state="success" />
    <Badge />
    <Badge size="large" state="warning" />
    <Badge size="larger" />
    <Badge size="largest" />
  </StoryExample>
);
