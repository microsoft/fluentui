import * as React from 'react';
import { IDocPageProps } from 'office-ui-fabric-react/lib/common/DocPage.types';
import { PanelBasicExample } from './examples/Panel.Basic.Example';
import { PanelConfirmDismissExample } from './examples/Panel.ConfirmDismiss.Example';
import { PanelControlledExample } from './examples/Panel.Controlled.Example';
import { PanelFooterExample } from './examples/Panel.Footer.Example';
import { PanelNavigationExample } from './examples/Panel.Navigation.Example';
import { PanelHandleDismissTargetExample } from './examples/Panel.HandleDismissTarget.Example';
import { PanelHiddenOnDismissExample } from './examples/Panel.HiddenOnDismiss.Example';
import { PanelLightDismissExample } from './examples/Panel.LightDismiss.Example';
import { PanelLightDismissCustomExample } from './examples/Panel.LightDismissCustom.Example';
import { PanelNonModalExample } from './examples/Panel.NonModal.Example';
import { PanelSizesExample } from './examples/Panel.Sizes.Example';

const PanelBasicExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Panel/examples/Panel.Basic.Example.tsx') as string;
const PanelSizesExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Panel/examples/Panel.Sizes.Example.tsx') as string;
const PanelConfirmDismissExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Panel/examples/Panel.ConfirmDismiss.Example.tsx') as string;
const PanelControlledExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Panel/examples/Panel.Controlled.Example.tsx') as string;
const PanelHiddenOnDismissExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Panel/examples/Panel.HiddenOnDismiss.Example.tsx') as string;
const PanelLightDismissExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Panel/examples/Panel.LightDismiss.Example.tsx') as string;
const PanelLightDismissCustomExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Panel/examples/Panel.LightDismissCustom.Example.tsx') as string;
const PanelNonModalExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Panel/examples/Panel.NonModal.Example.tsx') as string;
const PanelFooterExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Panel/examples/Panel.Footer.Example.tsx') as string;
const PanelNavigationExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Panel/examples/Panel.Navigation.Example.tsx') as string;
const PanelHandleDismissTargetExampleCode = require('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Panel/examples/Panel.HandleDismissTarget.Example.tsx') as string;

export const PanelPageProps: IDocPageProps = {
  title: 'Panel',
  componentName: 'Panel',
  componentUrl:
    'https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react/src/components/Panel',
  examples: [
    {
      title: 'Basic',
      code: PanelBasicExampleCode,
      view: <PanelBasicExample />,
    },
    {
      title: 'Size options',
      code: PanelSizesExampleCode,
      view: <PanelSizesExample />,
    },
    {
      title: 'Panel - Footer',
      code: PanelFooterExampleCode,
      view: <PanelFooterExample />,
    },
    {
      title: 'Light dismiss',
      code: PanelLightDismissExampleCode,
      view: <PanelLightDismissExample />,
    },
    {
      title: 'Hidden on dismiss',
      code: PanelHiddenOnDismissExampleCode,
      view: <PanelHiddenOnDismissExample />,
    },
    {
      title: 'Controlled visibility',
      code: PanelControlledExampleCode,
      view: <PanelControlledExample />,
    },
    {
      title: 'Confirm dismiss',
      code: PanelConfirmDismissExampleCode,
      view: <PanelConfirmDismissExample />,
    },
    {
      title: 'Confirm light dismiss',
      code: PanelLightDismissCustomExampleCode,
      view: <PanelLightDismissCustomExample />,
    },
    {
      title: 'Non-modal',
      code: PanelNonModalExampleCode,
      view: <PanelNonModalExample />,
    },
    {
      title: 'Panel - Custom navigation',
      code: PanelNavigationExampleCode,
      view: <PanelNavigationExample />,
    },
    {
      title: 'Panel - Detect dismissal method',
      code: PanelHandleDismissTargetExampleCode,
      view: <PanelHandleDismissTargetExample />,
    },
  ],
  overview: require<string>('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Panel/docs/PanelOverview.md'),
  bestPractices: require<
    string
  >('!raw-loader!@fluentui/examples/src/office-ui-fabric-react/Panel/docs/PanelBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
};
