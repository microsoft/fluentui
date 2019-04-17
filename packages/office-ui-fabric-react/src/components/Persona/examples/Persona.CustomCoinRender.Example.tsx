import * as React from 'react';
import { IPersonaProps, IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { TestImages } from '../../../common/TestImages';
import './PersonaExample.scss';
import * as exampleStylesImport from '../../../common/_exampleStyles.scss';
const exampleStyles: any = exampleStylesImport;

const examplePersona: IPersonaSharedProps = {
  imageInitials: 'TR',
  text: 'Ted Randall',
  secondaryText: 'Project Manager',
  optionalText: 'Available at 4:00pm'
};

export class PersonaCustomCoinRenderExample extends React.Component {
  public render(): JSX.Element {
    return (
      <div className="ms-PersonaExample">
        <div className={exampleStyles.exampleLabel}>Custom functional element in place of persona coin's image</div>
        <Persona
          {...examplePersona}
          size={PersonaSize.size72}
          presence={PersonaPresence.online}
          onRenderCoin={this._onRenderCoin}
          imageAlt={'Custom Coin Image'}
          imageUrl={TestImages.personaMale}
          coinSize={72}
        />
      </div>
    );
  }

  private _onRenderCoin = (props: IPersonaProps): JSX.Element => {
    const { coinSize, imageAlt, imageUrl } = props;
    return (
      <div className="customExampleCoin">
        <img src={imageUrl} alt={imageAlt} width={coinSize} height={coinSize} />
      </div>
    );
  };
}
