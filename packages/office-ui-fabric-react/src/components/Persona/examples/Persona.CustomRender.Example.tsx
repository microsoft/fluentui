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
  imageUrl: TestImages.personaFemale,
  imageInitials: 'AL',
  primaryText: 'Annie Lindqvist',
  secondaryText: 'Software Engineer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm'
};

export class PersonaCustomRenderExample extends React.Component<React.Props<PersonaCustomRenderExample>, any> {
  constructor() {
    super();
  }

  public render() {
    return (
      <div className='ms-PersonaExample'>
        <div className={ exampleStyles.exampleLabel }>Custom icon in secondary text</div>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.size72 }
          presence={ PersonaPresence.offline }
          onRenderSecondaryText={ this._onRenderSecondaryText }
        />
        <div className={ exampleStyles.exampleLabel }>Custom coin size = 150</div>
        <Persona
          { ...examplePersona }
          coinSize={ 150 }
          presence={ PersonaPresence.online }
          onRenderSecondaryText={ this._onRenderSecondaryText }
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
}
