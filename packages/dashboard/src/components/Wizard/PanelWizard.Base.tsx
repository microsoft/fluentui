import * as React from 'react';
import { IPanelWizardProps, IPanelWizardStyles, IPanelWizardStyleProps } from './PanelWizard.types';
import { styled, IRenderFunction, classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { Panel, PanelType, IPanelProps } from 'office-ui-fabric-react/lib/Panel';
import { Wizard } from './Wizard';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { defaultPanelStyleSet, defaultWizardStyleSet, getPanelWizardStyles } from './PanelWizard.styles';
import { getStepToShow } from './Wizard.utils';

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
        onRenderHeader={this._renderNullHeader}
        {...this.props.panelProps}
        styles={panelStyle}
      >
        <Wizard {...this.props.wizardProps} styles={wizardStyle} />
      </Panel>
    );
  }

  private _renderNullHeader = (): null => {
    return null;
  };

  private _onRenderNavigationContent = (props: IPanelProps, defaultRender: IRenderFunction<IPanelProps>): JSX.Element => {
    return (
      <>
        {this._onRenderTitle(props)}
        {defaultRender(props)}
      </>
    );
  };

  private _onRenderTitle = (props: IPanelProps): React.ReactNode => {
    const classNames = getClassNames(this.props.styles!, { theme: this.props.theme! });

    if (props.headerText) {
      return <div className={classNames.titleElementContainer}>{props.headerText}</div>;
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
