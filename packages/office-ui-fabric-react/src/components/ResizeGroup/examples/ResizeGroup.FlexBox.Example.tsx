import * as React from 'react';
import { BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { mergeStyles, IStyle } from 'office-ui-fabric-react/lib/Styling';

export interface IFlexBoxResizeGroupExampleStyles {
  root: IStyle;
}

const styles: IFlexBoxResizeGroupExampleStyles = {
  root: mergeStyles({
    display: 'flex',
    justifyContent: 'space-between'
  })
};

export class FlexBoxResizeGroupExample extends BaseComponent<{}, {}> {

  public render() {
    return (
      <div className={ styles.root as string }>
        <span>Left</span>
        <span>Right </span>
      </div>
    );
  }
}