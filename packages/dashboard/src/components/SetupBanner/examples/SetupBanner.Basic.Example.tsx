import * as React from 'react';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { SetupBanner } from '../SetupBanner';
import { ISetupBannerAction, SetupBannerActionType } from '../SetupBanner.types';

interface ISetupBannerBasicExampleStyle {
  sectionMargin: IStyle;
}

const getStyles = (): ISetupBannerBasicExampleStyle => {
  return {
    sectionMargin: {
      marginBottom: '10px'
    }
  };
};

export class SetupBannerBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const actions: ISetupBannerAction[] = [
      {
        text: 'Set up a domain',
        actionType: SetupBannerActionType.PrimaryButton,
        action: () => {
          alert('Set up a domain clicked');
        }
      },
      {
        text: 'Remind me later',
        actionType: SetupBannerActionType.Link,
        action: () => {
          alert('Remind me later clicked');
        }
      }
    ];

    return (
      <SetupBanner
        actions={actions}
        headerText={"Three things you'll need to get set up"}
        onRenderBody={this._onRenderBody}
        onRenderVisualization={this._onRenderVisualization}
      />
    );
  }

  private _onRenderBody = (): JSX.Element => {
    const getClassNames = classNamesFunction<{}, ISetupBannerBasicExampleStyle>();
    const classNames = getClassNames(getStyles!);
    return (
      <div>
        <div className={classNames.sectionMargin}>For now, you're using contoso.onmicrosoft.com for your organization.</div>
        <div>
          But you may want to set up a simpler, more professional domain name to use for your organization's website and email address. If
          so, it's best to do that right away. If you wait and set it up later, you'll have to redo a lot of other work.
        </div>
      </div>
    );
  };

  private _onRenderVisualization = (): JSX.Element => {
    return <div>Visualization</div>;
  };
}
