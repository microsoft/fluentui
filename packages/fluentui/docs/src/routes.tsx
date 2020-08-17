import { Loader } from '@fluentui/react-northstar';
import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import ExternalExampleLayout from './components/ExternalExampleLayout';
import DocsLayout from './components/DocsLayout';
import DocsRoot from './components/DocsRoot';
import DocsBehaviorRoot from './components/DocsBehaviorRoot';
import MarkdownPage from './components/MarkdownPage';
import { PerfDataProvider } from './components/ComponentDoc/PerfChart';

import * as Composition from './pages/Composition.mdx';
import * as Debugging from './pages/Debugging.mdx';
import * as Layout from './pages/Layout.mdx';
import * as ComponentArchitecture from './pages/ComponentArchitecture.mdx';
import * as StylesOverrides from './pages/StylesOverrides.mdx';
import Accessibility from './views/Accessibility';
import Colors from './views/Colors';
import ColorPalette from './views/ColorPalette';
import CategoryColorPalette from './views/CategoryColorPalette';
import ColorSchemes from './views/ColorSchemes';
import CategoryColorSchemes from './views/CategoryColorSchemes';
import FAQ from './views/FAQ';
import Performance from './views/Performance';
import * as ShorthandProps from './pages/ShorthandProps.mdx';
import * as ThemingSpecification from './pages/ThemingSpecification.mdx';
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
import { LazyWithBabel } from './components/ComponentDoc/LazyWithBabel';

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

const CustomToolbarPrototype = React.lazy(() =>
  import(/* webpackChunkName: "prototypes" */ './prototypes/customToolbar'),
);
const ChatPanePrototype = React.lazy(() => import(/* webpackChunkName: "prototypes" */ './prototypes/chatPane'));
const ChatMessagesPrototype = React.lazy(() =>
  import(/* webpackChunkName: "prototypes" */ './prototypes/chatMessages'),
);
const AsyncShorthandPrototype = React.lazy(() =>
  import(/* webpackChunkName: "prototypes" */ './prototypes/AsyncShorthand'),
);
const EmployeeCardPrototype = React.lazy(() =>
  import(/* webpackChunkName: "prototypes" */ './prototypes/employeeCard'),
);
const MeetingOptionsPrototype = React.lazy(() =>
  import(/* webpackChunkName: "prototypes" */ './prototypes/meetingOptions'),
);
const SearchPagePrototype = React.lazy(() => import(/* webpackChunkName: "prototypes" */ './prototypes/SearchPage'));
const MentionsPrototype = React.lazy(() => import(/* webpackChunkName: "prototypes" */ './prototypes/mentions'));
const DropdownsPrototype = React.lazy(() => import(/* webpackChunkName: "prototypes" */ './prototypes/dropdowns'));
const PopupsPrototype = React.lazy(() => import(/* webpackChunkName: "prototypes" */ './prototypes/popups'));
const AlertsPrototype = React.lazy(() => import(/* webpackChunkName: "prototypes" */ './prototypes/alerts'));
const NestedPopupsAndDialogsPrototype = React.lazy(() =>
  import(/* webpackChunkName: "prototypes" */ './prototypes/NestedPopupsAndDialogs'),
);
const VirtualizedTreePrototype = React.lazy(() =>
  import(/* webpackChunkName: "prototypes" */ './prototypes/VirtualizedTree'),
);
const CopyToClipboardPrototype = React.lazy(() =>
  import(/* webpackChunkName: "prototypes" */ './prototypes/CopyToClipboard'),
);
const ParticipantsListPrototype = React.lazy(() =>
  import(/* webpackChunkName: "prototypes" */ './prototypes/ParticipantsList'),
);
const CustomScrollbarPrototype = React.lazy(() =>
  import(/* webpackChunkName: "prototypes" */ './prototypes/customScrollbar'),
);
const EditorToolbarPrototype = React.lazy(() =>
  import(/* webpackChunkName: "prototypes" */ './prototypes/EditorToolbar'),
);
const HexagonalAvatarPrototype = React.lazy(() =>
  import(/* webpackChunkName: "prototypes" */ './prototypes/hexagonalAvatar'),
);
const TablePrototype = React.lazy(() => import(/* webpackChunkName: "prototypes" */ './prototypes/table'));
const VirtualizedTablePrototype = React.lazy(() =>
  import(/* webpackChunkName: "prototypes" */ './prototypes/VirtualizedTable'),
);
const FormValidationPrototype = React.lazy(() =>
  import(/* webpackChunkName: "prototypes" */ './prototypes/FormValidation'),
);

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

                <Route exact path="/prototype-chat-pane" component={ChatPanePrototype} />
                <Route exact path="/prototype-chat-messages" component={ChatMessagesPrototype} />
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
                <Route exact path="/prototype-table" component={TablePrototype} />
                <Route exact path="/prototype-nested-popups-and-dialogs" component={NestedPopupsAndDialogsPrototype} />
                <Route exact path="/prototype-form-validation" component={FormValidationPrototype} />
                <Route exact path="/virtualized-tree" component={VirtualizedTreePrototype} />
                <Route exact path="/virtualized-table" component={VirtualizedTablePrototype} />
                <Route exact path="/prototype-copy-to-clipboard" component={CopyToClipboardPrototype} />
                <Route
                  exact
                  path="/unstable-datepicker"
                  render={() => <Redirect to={`/components/datepicker/definition`} />}
                />

                <Route exact path="/faq" component={FAQ} />
                <Route exact path="/accessibility" component={Accessibility} />
                <Route exact path="/accessibility-behaviors" component={AccessibilityBehaviors} />
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
                <Route exact path="/component-architecture">
                  <MarkdownPage page={ComponentArchitecture} />
                </Route>
                <Route exact path="/theming-specification">
                  <MarkdownPage page={ThemingSpecification} />
                </Route>
                <Route exact path="/styles-overrides">
                  <MarkdownPage page={StylesOverrides} />
                </Route>
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
