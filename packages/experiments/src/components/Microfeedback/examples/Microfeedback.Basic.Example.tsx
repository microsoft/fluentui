import * as React from 'react';
import { Microfeedback } from '../Microfeedback';

export class MicrofeedbackBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <Microfeedback />
      </div>
    );
  }
}
