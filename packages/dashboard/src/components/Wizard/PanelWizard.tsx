import * as React from 'react';
import { IPanelWizardProps, IPanelWizardStyles, IPanelWizardStyleProps } from './PanelWizard.types';
import { styled, IRenderFunction, classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { Panel, PanelType, IPanelProps } from 'office-ui-fabric-react/lib/Panel';
import { Wizard } from './Wizard';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { defaultPanelStyleSet, defaultWizardStyleSet, getPanelWizardStyles } from './PanelWizard.styles';
import { getStepContentToShow } from './Wizard.utils';

const getClassNames = classNamesFunction<IPanelWizardStyleProps, IPanelWizardStyles>();

/**
 * Base component for PanelWizard
 */
class PanelWizardBase extends React.Component<IPanelWizardProps, {}> {
  public render(): JSX.Element {
    if (this.props.wizardProps.steps.length === 0) {
      throw new Error('Wizard must have atleast one step.');
    }

    const panelStyle = mergeStyleSets(
      defaultPanelStyleSet(this.props.theme!),
      this.props.panelProps ? this.props.panelProps.styles : undefined
    );
    const wizardStyle = mergeStyleSets(
      defaultWizardStyleSet(this.props.theme!),
      this.props.wizardProps.styles ? this.props.wizardProps.styles : undefined
    );

    return (
      <Panel
        type={PanelType.large}
        onRenderNavigation={this._onRenderNavigationContent}
        isFooterAtBottom={true}
        onRenderFooter={this._onRenderFooter}
        {...this.props.panelProps}
        styles={panelStyle}
      >
        <Wizard {...this.props.wizardProps} styles={wizardStyle} />
      </Panel>
    );
  }

  private _onRenderNavigationContent = (props: IPanelProps, defaultRender: IRenderFunction<IPanelProps>): JSX.Element => {
    const classNames = getClassNames(this.props.styles!, { theme: this.props.theme! });
    const step = getStepContentToShow(this.props.wizardProps);

    return (
      <>
        <div className={classNames.titleElementContainer}>{step.titleElement}</div>
        {defaultRender(props)}
      </>
    );
  };

  private _onRenderFooter = (): JSX.Element => {
    const classNames = getClassNames(this.props.styles!, { theme: this.props.theme! });
    const step = getStepContentToShow(this.props.wizardProps);

    return <div className={classNames.footerContainer}>{step.footerElement}</div>;
  };
}

export const PanelWizard: (props: IPanelWizardProps) => JSX.Element = styled<IPanelWizardProps, IPanelWizardStyleProps, IPanelWizardStyles>(
  PanelWizardBase,
  getPanelWizardStyles,
  undefined,
  { scope: 'PanelWizard' }
);
