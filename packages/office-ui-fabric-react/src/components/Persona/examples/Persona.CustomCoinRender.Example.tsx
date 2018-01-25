import * as React from 'react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import {
  IPersonaProps,
  Persona,
  PersonaSize,
  PersonaPresence
} from 'office-ui-fabric-react/lib/Persona';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TestImages } from '../../../common/TestImages';
import './PersonaExample.scss';
import * as exampleStylesImport from '../../../common/_exampleStyles.scss';
const exampleStyles: any = exampleStylesImport;

const examplePersona = {
  imageUrl: TestImages.personaMale,
  imageInitials: 'TR',
  primaryText: 'Ted Randall',
  secondaryText: 'Project Manager',
  optionalText: 'Available at 4:00pm'
};

export class PersonaCustomCoinRenderExample extends React.Component {

  public render() {
    return (
      <div className='ms-PersonaExample'>
        <div className={ exampleStyles.exampleLabel }>Custom functional element as image</div>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.size72 }
          presence={ PersonaPresence.online }
          onRenderCoin={ this._onRenderCoin }
        />
      </div>
    );
  }

  @autobind
  private _onRenderSecondaryText(props: IPersonaProps): JSX.Element {
    return (
      <div>
        <Icon iconName={ 'Suitcase' } className={ 'ms-JobIconExample' } />
        { props.secondaryText }
      </div>
    );
  }

  @autobind
  private _onRenderCoin(props: IPersonaProps): JSX.Element {
    return (
      <div className='custom-example-coin'>
        <img src={ props.imageUrl } alt='' width='72' height='72' />
      </div>
    );
  }
}
