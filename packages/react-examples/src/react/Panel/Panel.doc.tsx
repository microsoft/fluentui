import * as React from 'react';
import { IDocPageProps } from '@fluentui/react/lib/common/DocPage.types';
import { PanelBasicExample } from './Panel.Basic.Example';
import { PanelConfirmDismissExample } from './Panel.ConfirmDismiss.Example';
import { PanelControlledExample } from './Panel.Controlled.Example';
import { PanelFooterExample } from './Panel.Footer.Example';
import { PanelNavigationExample } from './Panel.Navigation.Example';
import { PanelHandleDismissTargetExample } from './Panel.HandleDismissTarget.Example';
import { PanelHiddenOnDismissExample } from './Panel.HiddenOnDismiss.Example';
import { PanelLightDismissExample } from './Panel.LightDismiss.Example';
import { PanelLightDismissCustomExample } from './Panel.LightDismissCustom.Example';
import { PanelNonModalExample } from './Panel.NonModal.Example';
import { PanelSizesExample } from './Panel.Sizes.Example';

const PanelBasicExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Panel/Panel.Basic.Example.tsx') as string;
const PanelSizesExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Panel/Panel.Sizes.Example.tsx') as string;
const PanelConfirmDismissExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Panel/Panel.ConfirmDismiss.Example.tsx') as string;
const PanelControlledExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Panel/Panel.Controlled.Example.tsx') as string;
const PanelHiddenOnDismissExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Panel/Panel.HiddenOnDismiss.Example.tsx') as string;
const PanelLightDismissExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Panel/Panel.LightDismiss.Example.tsx') as string;
const PanelLightDismissCustomExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Panel/Panel.LightDismissCustom.Example.tsx') as string;
const PanelNonModalExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Panel/Panel.NonModal.Example.tsx') as string;
const PanelFooterExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Panel/Panel.Footer.Example.tsx') as string;
const PanelNavigationExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Panel/Panel.Navigation.Example.tsx') as string;
const PanelHandleDismissTargetExampleCode =
  require('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Panel/Panel.HandleDismissTarget.Example.tsx') as string;

export const PanelPageProps: IDocPageProps = {
  title: 'Panel',
  componentName: 'Panel',
  componentUrl: 'https://github.com/microsoft/fluentui/tree/master/packages/react/src/components/Panel',
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
  overview: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Panel/docs/PanelOverview.md'),
  bestPractices: require<string>('!raw-loader?esModule=false!@fluentui/react-examples/src/react/Panel/docs/PanelBestPractices.md'),
  isHeaderVisible: true,
  isFeedbackVisible: true,
  allowNativeProps: true,
};
