import * as React from 'react';
import {
  IPersonaProps,
  Persona,
  PersonaSize,
  PersonaPresence
} from 'office-ui-fabric-react/lib/Persona';
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
        <div className={ exampleStyles.exampleLabel }>Custom functional element in place of persona coin's image</div>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.size72 }
          presence={ PersonaPresence.online }
          onRenderCoin={ this._onRenderCoin }
          imageAlt={ 'Custom Coin Image' }
          coinSize={ 72 }
        />
      </div>
    );
  }

  private _onRenderCoin = (props: IPersonaProps): JSX.Element => {
    const {
      coinSize,
      imageUrl,
      imageAlt,
    } = props;

    return (
      <div className='customExampleCoin'>
        <img src={ imageUrl } alt={ imageAlt } width={ coinSize } height={ coinSize } />
      </div>
    );
  }
}
