import * as React from 'react';
import {
  IPersonaProps,
  IPersonaSharedProps,
  Persona,
  PersonaSize,
  PersonaPresence
} from 'office-ui-fabric-react/lib/Persona';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { TestImages } from '../../../common/TestImages';
import './PersonaExample.scss';
import * as exampleStylesImport from '../../../common/_exampleStyles.scss';
const exampleStyles: any = exampleStylesImport;

const examplePersona: IPersonaSharedProps = {
  imageUrl: TestImages.personaFemale,
  imageInitials: 'AL',
  text: 'Annie Lindqvist',
  secondaryText: 'Software Engineer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm'
};

export class PersonaCustomRenderExample extends React.Component {

  public render(): JSX.Element {
    return (
      <div className='ms-PersonaExample'>
        <div className={ exampleStyles.exampleLabel }>Custom icon in secondary text</div>
        <Persona
          { ...examplePersona }
          size={ PersonaSize.size72 }
          presence={ PersonaPresence.offline }
          onRenderSecondaryText={ this._onRenderSecondaryText }
        />
      </div>
    );
  }

  private _onRenderSecondaryText = (props: IPersonaProps): JSX.Element => {
    return (
      <div>
        <Icon iconName={ 'Suitcase' } className={ 'ms-JobIconExample' } />
        { props.secondaryText }
      </div>
    );
  }
}
