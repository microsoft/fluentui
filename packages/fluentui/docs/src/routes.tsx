import { Loader } from '@fluentui/react-northstar';
import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import DocsLayout from './components/DocsLayout';
import DocsRoot from './components/DocsRoot';
import DocsBehaviorRoot from './components/DocsBehaviorRoot';
import MarkdownPage from './components/MarkdownPage';
import { PerfDataProvider } from './components/ComponentDoc/PerfChart';

import * as Composition from './pages/Composition.mdx';
import * as Debugging from './pages/Debugging.mdx';
import * as Layout from './pages/Layout.mdx';
import Accessibility from './views/Accessibility';
import Colors from './views/Colors';
import ColorPalette from './views/ColorPalette';
import CategoryColorPalette from './views/CategoryColorPalette';
import ColorSchemes from './views/ColorSchemes';
import CategoryColorSchemes from './views/CategoryColorSchemes';
import FAQ from './views/FAQ';
import Performance from './views/Performance';
import * as ShorthandProps from './pages/ShorthandProps.mdx';
import Introduction from './views/Introduction';
import PageNotFound from './views/PageNotFound';
import QuickStart from './views/QuickStart';
import Theming from './views/Theming';
import ThemingExamples from './views/ThemingExamples';
import IconViewer from './views/IconViewer';
import IntegrateCustomComponents from './views/IntegrateCustomComponents';
import AccessibilityBehaviors from './views/AccessibilityBehaviors';
import FocusZone from './views/FocusZoneDoc';
import FocusTrapZone from './views/FocusTrapZoneDoc';
import AutoFocusZone from './views/AutoFocusZoneDoc';
import PerformanceTests from './views/PerformanceTests';
import ButtonNameComputation from './views/ButtonNameComputation';
import { LazyWithBabel } from './components/ComponentDoc/LazyWithBabel';
import {
  AlertsPrototype,
  AsyncShorthandPrototype,
  ChatMessagesPrototype,
  ChatPanePrototype,
  CompactChatPrototype,
  ChatRefreshPrototype,
  CopyToClipboardPrototype,
  CustomScrollbarPrototype,
  CustomToolbarPrototype,
  DropdownsPrototype,
  EditorToolbarPrototype,
  EmployeeCardPrototype,
  FormValidationPrototype,
  HexagonalAvatarPrototype,
  MeetingOptionsPrototype,
  MentionsPrototype,
  MenuList,
  NestedPopupsAndDialogsPrototype,
  ParticipantsListPrototype,
  PopupsPrototype,
  RosterPrototype,
  SearchPagePrototype,
  TablePrototype,
  TextAreaAutoSize,
  VirtualizedStickyTreePrototype,
  VirtualizedTablePrototype,
  VirtualizedTreePrototype,
} from '@fluentui/react-northstar-prototypes';

const ExternalExampleLayout = React.lazy(
  () => import(/* webpackChunkName: "examples" */ './components/ExternalExampleLayout'),
);

const _Builder = React.lazy(async () => ({
  default: (await import(/* webpackChunkName: "builder" */ '@fluentui/react-builder')).Builder,
}));

const Builder: React.FunctionComponent = () => (
  <LazyWithBabel>
    <_Builder />
  </LazyWithBabel>
);
const FullScreenPreview = React.lazy(async () => ({
  default: (await import(/* webpackChunkName: "builder" */ '@fluentui/react-builder')).FullScreenPreview,
}));

const Routes = () => (
  <React.Suspense fallback="Loading...">
    {/* Remove trailing slash */}
    <BrowserRouter basename={__BASENAME__ === '/' ? __BASENAME__ : __BASENAME__.slice(0, -1)}>
      <Switch>
        <Route exact path="/maximize/:exampleName/:rtl?" component={ExternalExampleLayout} />
        <Route exact path="/builder" component={Builder} />
        <Route exact path="/builder/maximize" component={FullScreenPreview} />

        <DocsLayout>
          <PerfDataProvider>
            <React.Suspense fallback={<Loader />}>
              <Switch>
                <Route exact path="/" component={Introduction} />
                <Route exact path="/components/:name/:tab" component={DocsRoot} sidebar />
                <Route
                  exact
                  path="/components/:name"
                  render={routeProps => <Redirect to={`${routeProps.location.pathname}/definition`} />}
                />
                <Route exact path="/behaviors/:name" component={DocsBehaviorRoot} sidebar />
                <Route exact path="/debugging">
                  <MarkdownPage page={Debugging} />
                </Route>
                <Route exact path="/quick-start" component={QuickStart} />
                <Route exact path="/perf-tests" component={PerformanceTests} />
                <Route exact path="/prototype-roster" component={RosterPrototype} />
                <Route exact path="/prototype-chat-pane" component={ChatPanePrototype} />
                <Route exact path="/prototype-chat-messages" component={ChatMessagesPrototype} />
                <Route exact path="/prototype-compact-chat" component={CompactChatPrototype} />
                <Route exact path="/prototype-chat-refresh" component={ChatRefreshPrototype} />
                <Route exact path="/prototype-custom-scrollbar" component={CustomScrollbarPrototype} />
                <Route exact path="/prototype-custom-toolbar" component={CustomToolbarPrototype} />
                <Route exact path="/prototype-async-shorthand" component={AsyncShorthandPrototype} />
                <Route exact path="/prototype-employee-card" component={EmployeeCardPrototype} />
                <Route exact path="/prototype-meeting-options" component={MeetingOptionsPrototype} />
                <Route exact path="/prototype-participants-list" component={ParticipantsListPrototype} />
                <Route exact path="/prototype-search-page" component={SearchPagePrototype} />
                <Route exact path="/prototype-mentions" component={MentionsPrototype} />
                <Route exact path="/prototype-dropdowns" component={DropdownsPrototype} />
                <Route exact path="/prototype-popups" component={PopupsPrototype} />
                <Route exact path="/prototype-alerts" component={AlertsPrototype} />
                <Route exact path="/prototype-editor-toolbar" component={EditorToolbarPrototype} />
                <Route exact path="/prototype-hexagonal-avatar" component={HexagonalAvatarPrototype} />
                <Route exact path="/prototype-text-area-autosize" component={TextAreaAutoSize} />
                <Route exact path="/prototype-table" component={TablePrototype} />
                <Route exact path="/prototype-nested-popups-and-dialogs" component={NestedPopupsAndDialogsPrototype} />
                <Route exact path="/prototype-form-validation" component={FormValidationPrototype} />
                <Route exact path="/virtualized-tree" component={VirtualizedTreePrototype} />
                <Route exact path="/virtualized-sticky-tree" component={VirtualizedStickyTreePrototype} />
                <Route exact path="/virtualized-table" component={VirtualizedTablePrototype} />
                <Route exact path="/prototype-copy-to-clipboard" component={CopyToClipboardPrototype} />
                <Route exact path="/prototype-menu-list" component={MenuList} />

                <Route exact path="/faq" component={FAQ} />
                <Route exact path="/accessibility" component={Accessibility} />
                <Route exact path="/accessibility-behaviors" component={AccessibilityBehaviors} />
                <Route exact path="/button-name-computation" component={ButtonNameComputation} />
                <Route exact path="/focus-zone" component={FocusZone} />
                <Route exact path="/focus-trap-zone" component={FocusTrapZone} />
                <Route exact path="/auto-focus-zone" component={AutoFocusZone} />
                <Route exact path="/theming" component={Theming} />
                <Route exact path="/theming-examples" component={ThemingExamples} />
                <Route exact path="/layout">
                  <MarkdownPage page={Layout} />
                </Route>
                <Route exact path="/shorthand-props">
                  <MarkdownPage page={ShorthandProps} />
                </Route>
                <Route exact path="/icon-viewer" component={IconViewer} />
                <Route exact path="/integrate-custom-components" component={IntegrateCustomComponents} />
                <Route exact path="/performance" component={Performance} />
                <Route exact path="/composition">
                  <MarkdownPage page={Composition} />
                </Route>
                <Route exact path="/colors" component={Colors} />
                <Route exact path="/color-palette" component={ColorPalette} />
                <Route exact path="/color-palette-category" component={CategoryColorPalette} />
                <Route exact path="/color-schemes" component={ColorSchemes} />
                <Route exact path="/color-schemes-category" component={CategoryColorSchemes} />
                <Route exact path="/*" component={PageNotFound} />
              </Switch>
            </React.Suspense>
          </PerfDataProvider>
        </DocsLayout>
      </Switch>
    </BrowserRouter>
  </React.Suspense>
);

export default Routes;
