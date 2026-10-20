import * as React from 'react';
import { StoryGrid } from './DataGridShared.stories';

export const SingleSelection = (): React.ReactNode => <StoryGrid selectionMode="single" defaultSelectedItems={[0]} />;
