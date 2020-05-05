import * as React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import ExternalExampleLayout from './components/ExternalExampleLayout';
import DocsLayout from './components/DocsLayout';
import DocsRoot from './components/DocsRoot';
import DocsBehaviorRoot from './components/DocsBehaviorRoot';
import MarkdownPage from './components/MarkdownPage';

import * as Composition from './pages/Composition.mdx';
import * as Layout from './pages/Layout.mdx';
import * as ComponentArchitecture from './pages/ComponentArchitecture.mdx';
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
import CustomToolbarPrototype from './prototypes/customToolbar';
import ChatPanePrototype from './prototypes/chatPane';
import ChatMessagesPrototype from './prototypes/chatMessages';
import AsyncShorthandPrototype from './prototypes/AsyncShorthand';
import EmployeeCardPrototype from './prototypes/employeeCard';
import MeetingOptionsPrototype from './prototypes/meetingOptions';
import SearchPagePrototype from './prototypes/SearchPage';
import MentionsPrototype from './prototypes/mentions';
import DropdownsPrototype from './prototypes/dropdowns';
import PopupsPrototype from './prototypes/popups';
import AlertsPrototype from './prototypes/alerts';
import NestedPopupsAndDialogsPrototype from './prototypes/NestedPopupsAndDialogs';
import VirtualizedTreePrototype from './prototypes/VirtualizedTree';
import CopyToClipboardPrototype from './prototypes/CopyToClipboard';
import ParticipantsListPrototype from './prototypes/ParticipantsList';
import CustomScrollbarPrototype from './prototypes/customScrollbar';
import EditorToolbarPrototype from './prototypes/EditorToolbar';
import HexagonalAvatarPrototype from './prototypes/hexagonalAvatar';
import TablePrototype from './prototypes/table';
import VirtualizedTablePrototype from './prototypes/VirtualizedTable';
import { PerfDataProvider } from './components/ComponentDoc/PerfChart';

// Remove trailing slash
const base = __BASENAME__.slice(-1);

const Routes = () => (
  <BrowserRouter basename={base || '/'}>
    <Switch>
      <Route exact path={`${base}/maximize/:exampleName/:rtl?`} component={ExternalExampleLayout} />
      <DocsLayout>
        <PerfDataProvider>
          <Switch>
            <Route exact path={`${base}/`} component={Introduction} />
            <Route exact path={`${base}/components/:name/:tab`} component={DocsRoot} sidebar />
            <Route
              exact
              path={`${base}/components/:name`}
              render={routeProps => <Redirect to={`${routeProps.location.pathname}/definition`} />}
            />
            <Route exact path={`${base}/behaviors/:name`} component={DocsBehaviorRoot} sidebar />
            <Route exact path={`${base}/quick-start`} component={QuickStart} />
            <Route exact path={`${base}/prototype-chat-pane`} component={ChatPanePrototype} />
            <Route exact path={`${base}/prototype-chat-messages`} component={ChatMessagesPrototype} />
            <Route exact path={`${base}/prototype-custom-scrollbar`} component={CustomScrollbarPrototype} />
            <Route exact path={`${base}/prototype-custom-toolbar`} component={CustomToolbarPrototype} />
            <Route exact path={`${base}/prototype-async-shorthand`} component={AsyncShorthandPrototype} />
            <Route exact path={`${base}/prototype-employee-card`} component={EmployeeCardPrototype} />
            <Route exact path={`${base}/prototype-meeting-options`} component={MeetingOptionsPrototype} />
            <Route exact path={`${base}/prototype-participants-list`} component={ParticipantsListPrototype} />
            <Route exact path={`${base}/prototype-search-page`} component={SearchPagePrototype} />
            <Route exact path={`${base}/prototype-mentions`} component={MentionsPrototype} />
            <Route exact path={`${base}/prototype-dropdowns`} component={DropdownsPrototype} />
            <Route exact path={`${base}/prototype-popups`} component={PopupsPrototype} />
            <Route exact path={`${base}/prototype-alerts`} component={AlertsPrototype} />
            <Route exact path={`${base}/prototype-editor-toolbar`} component={EditorToolbarPrototype} />
            <Route exact path={`${base}/prototype-hexagonal-avatar`} component={HexagonalAvatarPrototype} />
            <Route exact path={`${base}/prototype-table`} component={TablePrototype} />
            <Route
              exact
              path={`${base}/prototype-nested-popups-and-dialogs`}
              component={NestedPopupsAndDialogsPrototype}
            />
            <Route exact path={`${base}/virtualized-tree`} component={VirtualizedTreePrototype} />
            <Route exact path={`${base}/virtualized-table`} component={VirtualizedTablePrototype} />
            <Route exact path={`${base}/prototype-copy-to-clipboard`} component={CopyToClipboardPrototype} />
            <Route exact path={`${base}/faq`} component={FAQ} />
            <Route exact path={`${base}/accessibility`} component={Accessibility} />
            <Route exact path={`${base}/accessibility-behaviors`} component={AccessibilityBehaviors} />
            <Route exact path={`${base}/focus-zone`} component={FocusZone} />
            <Route exact path={`${base}/focus-trap-zone`} component={FocusTrapZone} />
            <Route exact path={`${base}/auto-focus-zone`} component={AutoFocusZone} />
            <Route exact path={`${base}/theming`} component={Theming} />
            <Route exact path={`${base}/theming-examples`} component={ThemingExamples} />
            <Route exact path={`${base}/layout`}>
              <MarkdownPage page={Layout} />
            </Route>
            <Route exact path={`${base}/shorthand-props`}>
              <MarkdownPage page={ShorthandProps} />
            </Route>
            <Route exact path={`${base}/icon-viewer`} component={IconViewer} />
            <Route exact path={`${base}/component-architecture`}>
              <MarkdownPage page={ComponentArchitecture} />
            </Route>
            <Route exact path={`${base}/theming-specification`}>
              <MarkdownPage page={ThemingSpecification} />
            </Route>
            <Route exact path={`${base}/integrate-custom-components`} component={IntegrateCustomComponents} />
            <Route exact path={`${base}/performance`} component={Performance} />
            <Route exact path={`${base}/composition`}>
              <MarkdownPage page={Composition} />
            </Route>
            <Route exact path={`${base}/colors`} component={Colors} />
            <Route exact path={`${base}/color-palette`} component={ColorPalette} />
            <Route exact path={`${base}/color-palette-category`} component={CategoryColorPalette} />
            <Route exact path={`${base}/color-schemes`} component={ColorSchemes} />
            <Route exact path={`${base}/color-schemes-category`} component={CategoryColorSchemes} />
            <Route exact path={`${base}/*`} component={PageNotFound} />
          </Switch>
        </PerfDataProvider>
      </DocsLayout>
    </Switch>
  </BrowserRouter>
);

export default Routes;
