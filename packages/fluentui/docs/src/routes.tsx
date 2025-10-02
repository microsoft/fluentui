import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import DocsLayout from './components/DocsLayout';
import DocsRoot from './components/DocsRoot';
import DocsBehaviorRoot from './components/DocsBehaviorRoot';
import MarkdownPage from './components/MarkdownPage';

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
import AccessibilityBehaviors from './views/AccessibilityBehaviors';
import FocusZone from './views/FocusZoneDoc';
import FocusTrapZone from './views/FocusTrapZoneDoc';
import AutoFocusZone from './views/AutoFocusZoneDoc';
import ButtonNameComputation from './views/ButtonNameComputation';

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

const AppRoutes = () => (
  <React.Suspense fallback="Loading...">
    {/* Remove trailing slash */}
    <BrowserRouter basename={__BASENAME__ === '/' ? __BASENAME__ : __BASENAME__.slice(0, -1)}>
      <Routes>
        <Route path="/maximize/:exampleName/:rtl?" element={<ExternalExampleLayout />} />

        <Route element={<DocsLayout />}>
          <Route path="/" element={<Introduction />} />
          <Route path="/components/:name" element={<DocsRoot />} />
          <Route path="/components/:name/:tab" element={<DocsRoot />} />
          <Route path="/behaviors/:name" element={<DocsBehaviorRoot sidebar />} />

          <Route path="/debugging" element={<MarkdownPage page={Debugging} />} />
          <Route path="/quick-start" element={<QuickStart />} />
          <Route path="/prototype-roster" element={<RosterPrototype />} />
          <Route path="/prototype-chat-pane" element={<ChatPanePrototype />} />
          <Route path="/prototype-chat-messages" element={<ChatMessagesPrototype />} />
          <Route path="/prototype-compact-chat" element={<CompactChatPrototype />} />
          <Route path="/prototype-chat-refresh" element={<ChatRefreshPrototype />} />
          <Route path="/prototype-custom-scrollbar" element={<CustomScrollbarPrototype />} />
          <Route path="/prototype-custom-toolbar" element={<CustomToolbarPrototype />} />
          <Route path="/prototype-async-shorthand" element={<AsyncShorthandPrototype />} />
          <Route path="/prototype-employee-card" element={<EmployeeCardPrototype />} />
          <Route path="/prototype-meeting-options" element={<MeetingOptionsPrototype />} />
          <Route path="/prototype-participants-list" element={<ParticipantsListPrototype />} />
          <Route path="/prototype-search-page" element={<SearchPagePrototype />} />
          <Route path="/prototype-mentions" element={<MentionsPrototype />} />
          <Route path="/prototype-dropdowns" element={<DropdownsPrototype />} />
          <Route path="/prototype-popups" element={<PopupsPrototype />} />
          <Route path="/prototype-alerts" element={<AlertsPrototype />} />
          <Route path="/prototype-editor-toolbar" element={<EditorToolbarPrototype />} />
          <Route path="/prototype-hexagonal-avatar" element={<HexagonalAvatarPrototype />} />
          <Route path="/prototype-text-area-autosize" element={<TextAreaAutoSize />} />
          <Route path="/prototype-table" element={<TablePrototype />} />
          <Route path="/prototype-nested-popups-and-dialogs" element={<NestedPopupsAndDialogsPrototype />} />
          <Route path="/prototype-form-validation" element={<FormValidationPrototype />} />
          <Route path="/virtualized-tree" element={<VirtualizedTreePrototype />} />
          <Route path="/virtualized-sticky-tree" element={<VirtualizedStickyTreePrototype />} />
          <Route path="/virtualized-table" element={<VirtualizedTablePrototype />} />
          <Route path="/prototype-copy-to-clipboard" element={<CopyToClipboardPrototype />} />
          <Route path="/prototype-menu-list" element={<MenuList />} />

          <Route path="/faq" element={<FAQ />} />
          <Route path="/accessibility" element={<Accessibility />} />
          <Route path="/accessibility-behaviors" element={<AccessibilityBehaviors />} />
          <Route path="/button-name-computation" element={<ButtonNameComputation />} />
          <Route path="/focus-zone" element={<FocusZone />} />
          <Route path="/focus-trap-zone" element={<FocusTrapZone />} />
          <Route path="/auto-focus-zone" element={<AutoFocusZone />} />
          <Route path="/theming" element={<Theming />} />
          <Route path="/theming-examples" element={<ThemingExamples />} />
          <Route path="/layout" element={<MarkdownPage page={Layout} />} />
          <Route path="/shorthand-props" element={<MarkdownPage page={ShorthandProps} />} />
          <Route path="/icon-viewer" element={<IconViewer />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/composition" element={<MarkdownPage page={Composition} />} />
          <Route path="/colors" element={<Colors />} />
          <Route path="/color-palette" element={<ColorPalette />} />
          <Route path="/color-palette-category" element={<CategoryColorPalette />} />
          <Route path="/color-schemes" element={<ColorSchemes />} />
          <Route path="/color-schemes-category" element={<CategoryColorSchemes />} />
          <Route path="/*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.Suspense>
);

export default AppRoutes;
