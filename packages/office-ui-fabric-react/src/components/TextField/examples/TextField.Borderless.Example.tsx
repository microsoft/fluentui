import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export const TextFieldBorderlessExample: React.StatelessComponent = () => {
  return <TextField label="Borderless single-line TextField" borderless placeholder="No borders here, folks." />;
};
