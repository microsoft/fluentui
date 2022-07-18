import * as React from 'react';

export interface EditTabProps {}

export const EditTab: React.FC<EditTabProps> = props => {
  return <div role="tabpanel" aria-labelledby="Edit" />;
};
