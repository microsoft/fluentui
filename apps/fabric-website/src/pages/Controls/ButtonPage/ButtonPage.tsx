import * as React from 'react';
import { Toggle, IToggleStyles } from 'office-ui-fabric-react/lib/Toggle';
import { ControlsAreaPage, IControlsPageProps } from '../ControlsAreaPage';
import { ButtonPageProps } from './ButtonPage.doc';
import { Platforms } from '../../../interfaces/Platforms';
import { IPageSectionProps } from '@uifabric/example-app-base/lib/index2';

const toggleStyles: Partial<IToggleStyles> = {
  root: { margin: '10px 0' }
};
const baseUrl = 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/apps/fabric-website/src/pages/Controls/ButtonPage/';

export class ButtonPage extends React.Component<
  IControlsPageProps,
  {
    areButtonsDisabled: boolean;
    areButtonsChecked: boolean;
  }
> {
  public constructor(props: IControlsPageProps) {
    super(props);
    this.state = {
      areButtonsDisabled: false,
      areButtonsChecked: false
    };
  }

  public renderKnobs() {
    const { areButtonsDisabled, areButtonsChecked } = this.state;
    return (
      <>
        <Toggle styles={toggleStyles} label="Disable buttons" inlineLabel checked={areButtonsDisabled} onChange={this._onDisabledChanged} />
        <Toggle styles={toggleStyles} label="Mark as checked" inlineLabel checked={areButtonsChecked} onChange={this._onToggledChanged} />
      </>
    );
  }

  public render() {
    const { areButtonsDisabled, areButtonsChecked } = this.state;
    const buttonPageProps = ButtonPageProps(areButtonsDisabled, areButtonsChecked);
    return (
      <ControlsAreaPage
        {...this.props}
        title="Button"
        {...buttonPageProps[this.props.platform]}
        exampleKnobs={this.renderKnobs()}
        otherSections={this._otherSections(this.props.platform) as IPageSectionProps[]}
      />
    );
  }

  private _otherSections(platform: Platforms): IPageSectionProps<Platforms>[] {
    switch (platform) {
      case 'ios':
        return [
          {
            sectionName: 'Implementation',
            editUrl: baseUrl + 'docs/ios/ButtonImplementation.md',
            content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ButtonPage/docs/ios/ButtonImplementation.md') as string
          }
        ];

      case 'android':
        return [
          {
            sectionName: 'Implementation',
            editUrl: baseUrl + 'docs/android/ButtonImplementation.md',
            content: require('!raw-loader!@uifabric/fabric-website/src/pages/Controls/ButtonPage/docs/android/ButtonImplementation.md') as string
          }
        ];
    }
  }

  private _onDisabledChanged = (ev: React.MouseEvent<HTMLElement>, disabled: boolean): void => {
    this.setState({
      areButtonsDisabled: disabled
    });
  };

  private _onToggledChanged = (ev: React.MouseEvent<HTMLElement>, toggled: boolean): void => {
    this.setState({
      areButtonsChecked: toggled
    });
  };
}
