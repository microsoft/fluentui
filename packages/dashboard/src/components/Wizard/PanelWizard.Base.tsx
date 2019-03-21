import * as React from 'react';
import { IPanelWizardProps, IPanelWizardStyles, IPanelWizardStyleProps } from './PanelWizard.types';
import { styled, IRenderFunction, classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { Panel, PanelType, IPanelProps } from 'office-ui-fabric-react/lib/Panel';
import { Wizard } from './Wizard';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { defaultPanelStyleSet, defaultWizardStyleSet, getPanelWizardStyles } from './PanelWizard.styles';
import { getStepToShow } from './Wizard.utils';
import { IWizardStepProps } from '@uifabric/dashboard/lib/components/Wizard/Wizard.types';

const getClassNames = classNamesFunction<IPanelWizardStyleProps, IPanelWizardStyles>();

/**
 * Base component for PanelWizard
 */
export class PanelWizardBase extends React.Component<IPanelWizardProps, {}> {
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
    const step = getStepToShow(this.props.wizardProps);

    return (
      <>
        {this._onRenderTitle(step)}
        {defaultRender(props)}
      </>
    );
  };

  private _onRenderTitle = (step: IWizardStepProps): React.ReactNode => {
    const classNames = getClassNames(this.props.styles!, { theme: this.props.theme! });

    if (step.titleElement) {
      return <div className={classNames.titleElementContainer}>{step.titleElement}</div>;
    }
  };

  private _onRenderFooter = (): JSX.Element => {
    const classNames = getClassNames(this.props.styles!, { theme: this.props.theme! });
    const step = getStepToShow(this.props.wizardProps);

    return <div className={classNames.footerContainer}>{step.footerElement}</div>;
  };
}

export const PanelWizard: React.StatelessComponent<IPanelWizardProps> = styled<
  IPanelWizardProps,
  IPanelWizardStyleProps,
  IPanelWizardStyles
>(PanelWizardBase, getPanelWizardStyles, undefined, { scope: 'PanelWizard' });
