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
import IconViewerPrototype from './prototypes/IconViewer';
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

const Routes = () => (
  <BrowserRouter basename={__BASENAME__}>
    <Switch>
      <Route exact path="/maximize/:exampleName/:rtl?" component={ExternalExampleLayout} />
      <DocsLayout>
        <Switch>
          <Route exact path="/" component={Introduction} />
          <Route exact path="/components/:name/:tab" component={DocsRoot} sidebar />
          <Route
            exact
            path="/components/:name"
            render={routeProps => <Redirect to={`${routeProps.location.pathname}/definition`} />}
          />
          <Route exact path="/behaviors/:name" component={DocsBehaviorRoot} sidebar />
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
          <Route exact path="/icon-viewer" component={IconViewerPrototype} />
          <Route exact path="/prototype-alerts" component={AlertsPrototype} />
          <Route exact path="/prototype-editor-toolbar" component={EditorToolbarPrototype} />
          <Route exact path="/prototype-hexagonal-avatar" component={HexagonalAvatarPrototype} />
          <Route exact path="/prototype-table" component={TablePrototype} />
          <Route exact path="/prototype-nested-popups-and-dialogs" component={NestedPopupsAndDialogsPrototype} />
          <Route exact path="/virtualized-tree" component={VirtualizedTreePrototype} />
          <Route exact path="/virtualized-table" component={VirtualizedTablePrototype} />
          <Route exact path="/prototype-copy-to-clipboard" component={CopyToClipboardPrototype} />
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
          <Route exact path="/component-architecture">
            <MarkdownPage page={ComponentArchitecture} />
          </Route>
          <Route exact path="/theming-specification">
            <MarkdownPage page={ThemingSpecification} />
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
      </DocsLayout>
    </Switch>
  </BrowserRouter>
);

export default Routes;
