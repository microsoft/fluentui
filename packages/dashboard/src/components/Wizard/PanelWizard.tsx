import * as React from 'react';
import { IPanelWizardProps, IPanelWizardStyles, IPanelWizardStyleProps } from './PanelWizard.types';
import { styled } from 'office-ui-fabric-react/lib/Utilities';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Wizard } from './Wizard';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { defaultPanelStyleSet, defaultWizardStyleSet, getPanelWizardStyles } from './PanelWizard.styles';

// const getClassNames = classNamesFunction<IPanelWizardStyleProps, IPanelWizardStyles>();

/** Component for Setup Wizard */
class PanelWizardBase extends React.Component<IPanelWizardProps, {}> {
  public render(): JSX.Element {
    if (this.props.wizardProps.steps.length === 0) {
      throw new Error('Wizard must have atleast one step.');
    }

    const panelStyle = mergeStyleSets(defaultPanelStyleSet(), this.props.panelProps ? this.props.panelProps.styles : undefined);
    const wizardStyle = mergeStyleSets(defaultWizardStyleSet(), this.props.wizardProps.styles ? this.props.wizardProps.styles : undefined);

    return (
      <Panel type={PanelType.large} {...this.props.panelProps} styles={panelStyle}>
        <Wizard {...this.props.wizardProps} styles={wizardStyle} />
      </Panel>
    );
  }

  // private _renderHeader = () => {
  //   const classNames = getClassNames(this.props.styles!, {theme: this.props.theme!});
  // }
}

export const PanelWizard: (props: IPanelWizardProps) => JSX.Element = styled<IPanelWizardProps, IPanelWizardStyleProps, IPanelWizardStyles>(
  PanelWizardBase,
  getPanelWizardStyles,
  undefined,
  { scope: 'PanelWizard' }
);
