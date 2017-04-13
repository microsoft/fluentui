import { DefaultButton, IconButton } from './index';
import { IconName } from '../../Icon';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class DefaultButtonVPage extends React.Component<any, any> {
  public render() {
    let iconName: IconName = 'Snow';
    return <div>
      <div><label> Default Button:   </label>
        <DefaultButton id='DefaultButton' icon='Add' text='Default Button' /></div>
      <div><label> Default Button image:   </label>
        <img style={ { width: 304, height: 228 } }
          src='C:\Users\v-reja\OneDrive\LEAPNodeJSPractice\FabricDemo\office-ui-fabric-react\packages\office-ui-fabric-react\visualtests\baseline\DefaultButton_hovered_1.png'></img></div>
      <div><label> Default Button Disabled:   </label>
        <DefaultButton id='DefaultButtonDisabled' disabled={ true } icon='Add' text='Default Button' /></div>
      <div style={ { backgroundColor: 'white' } }>
        <IconButton id={ 'IconButton' } icon={ iconName } />
      </div>
    </div>;
  }
}