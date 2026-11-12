import * as React from 'react';
import { StoryGrid } from './utils';

export const SingleSelection = (): React.ReactNode => <StoryGrid selectionMode="single" defaultSelectedItems={[0]} />;
