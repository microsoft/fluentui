import * as _ from 'lodash';
import * as React from 'react';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';

import { getCode } from '@fluentui/accessibility';
import { CopyToClipboard } from '@fluentui/docs-components';
import { EditIcon, FilesTxtIcon, SearchIcon } from '@fluentui/react-icons-northstar';
import {
  Box,
  Flex,
  ICSSInJSStyle,
  Input,
  Segment,
  ShorthandValue,
  Text,
  Tree,
  TreeItemProps,
  TreeProps,
  TreeTitleProps,
} from '@fluentui/react-northstar';

import config from '../../config';
import { getComponentPathname } from '../../utils';
import componentInfoContext from '../../utils/componentInfoContext';
import { GitHubIcon } from '../Icons/GitHubIcon';
import Logo from '../Logo/Logo';
import { renderSidebarTitle } from './SidebarTitle';
import { VersionDropdown } from './VersionDropdown';

type ComponentMenuItem = { displayName: string; type: string };

const pkg = require('@fluentui/react-northstar/package.json');

const componentMenu: ComponentMenuItem[] = _.sortBy(componentInfoContext.parents, 'displayName');
const behaviorMenu: ComponentMenuItem[] = require('../../behaviorMenu');

const componentsBlackList = ['Debug', 'Design', process.env.NODE_ENV === 'production' && 'SvgIcon'];
const typeOrder = ['component', 'behavior'];

interface SidebarProps {
  width: number;
  treeItemStyle: React.CSSProperties;
}

const treeItemsByType = _.map(typeOrder, nextType => {
  const items = _.chain([...componentMenu, ...behaviorMenu])
    .filter(({ type }) => type === nextType)
    .filter(({ displayName }) => !_.includes(componentsBlackList, displayName))
    .map(info => ({
      id: info.displayName.concat(nextType),
      title: { content: info.displayName, as: NavLink, to: getComponentPathname(info) },
    }))
    .value();

  return { items };
});

const prototypesTreeItems: TreeProps['items'] = [
  {
    id: 'chatpane',
    title: { content: 'Chat Pane', as: NavLink, to: '/prototype-chat-pane' },
    public: false,
  },
  {
    id: 'chatMssages',
    title: { content: 'Chat Messages', as: NavLink, to: '/prototype-chat-messages' },
    public: true,
  },
  {
    id: 'compactChat',
    title: { content: 'Compact Chat', as: NavLink, to: '/prototype-compact-chat' },
    public: true,
  },
  {
    id: 'chatRefresh',
    title: { content: 'Chat Refresh', as: NavLink, to: '/prototype-chat-refresh' },
    public: true,
  },
  {
    id: 'customscrollbar',
    title: { content: 'Custom Scrollbar', as: NavLink, to: '/prototype-custom-scrollbar' },
    public: true,
  },
  {
    id: 'customtoolbar',
    title: { content: 'Custom Styled Toolbar', as: NavLink, to: '/prototype-custom-toolbar' },
    public: true,
  },
  {
    id: 'editor-toolbar',
    title: { content: 'Editor Toolbar', as: NavLink, to: '/prototype-editor-toolbar' },
    public: true,
  },
  {
    id: 'form-validation',
    title: { content: 'Form Validation', as: NavLink, to: '/prototype-form-validation' },
    public: true,
  },
  {
    id: 'dropdowns',
    title: { content: 'Dropdowns', as: NavLink, to: '/prototype-dropdowns' },
    public: false,
  },
  {
    id: 'alerts',
    title: { content: 'Alerts', as: NavLink, to: '/prototype-alerts' },
    public: false,
  },
  {
    id: 'asyncshorthand',
    title: { content: 'Async Shorthand', as: NavLink, to: '/prototype-async-shorthand' },
    public: false,
  },
  {
    id: 'employeecard',
    title: { content: 'Employee Card', as: NavLink, to: '/prototype-employee-card' },
    public: false,
  },
  {
    id: 'meetingoptions',
    title: { content: 'Meeting Options', as: NavLink, to: '/prototype-meeting-options' },
    public: false,
  },
  {
    id: 'mentions',
    title: { content: 'Mentions', as: NavLink, to: '/prototype-mentions' },
    public: true,
  },
  {
    id: 'participants-list',
    title: { content: 'Participants list', as: NavLink, to: '/prototype-participants-list' },
    public: true,
  },
  {
    id: 'roster',
    title: { content: 'Roster', as: NavLink, to: '/prototype-roster' },
    public: false,
  },
  {
    id: 'searchpage',
    title: { content: 'Search Page', as: NavLink, to: '/prototype-search-page' },
    public: false,
  },
  {
    id: 'popups',
    title: { content: 'Popups', as: NavLink, to: '/prototype-popups' },
    public: false,
  },
  {
    id: 'nested-popups-and-dialogs',
    title: {
      content: 'Nested Popups & Dialogs',
      as: NavLink,
      to: '/prototype-nested-popups-and-dialogs',
    },
    public: true,
  },
  {
    id: 'virtualized-tree',
    title: { content: 'VirtualizedTree', as: NavLink, to: '/virtualized-tree' },
    public: true,
  },
  {
    id: 'virtualized-sticky-tree',
    title: { content: 'Virtualized StickyTree', as: NavLink, to: '/virtualized-sticky-tree' },
    public: true,
  },
  {
    id: 'copy-to-clipboard',
    title: { content: 'Copy to Clipboard', as: NavLink, to: '/prototype-copy-to-clipboard' },
    public: true,
  },
  {
    id: 'hexagonal-avatar',
    title: {
      content: 'Hexagonal Avatar',
      as: NavLink,
      to: '/prototype-hexagonal-avatar',
    },
    public: true,
  },
  {
    id: 'table',
    title: {
      content: 'Table',
      as: NavLink,
      to: '/prototype-table',
    },
    public: true,
  },
  {
    id: 'menulist',
    title: {
      content: 'Menu List',
      as: NavLink,
      to: '/prototype-menu-list',
    },
    public: false,
  },
  {
    id: 'text-area',
    title: {
      content: 'TextArea Auto Size',
      as: NavLink,
      to: '/prototype-text-area-autosize',
    },
    public: true,
  },
  {
    id: 'virtualized-table',
    title: { content: 'VirtualizedTable', as: NavLink, to: '/virtualized-table' },
    public: true,
  },
];

const baseTreeItems: TreeProps['items'] = [
  {
    id: 'concepts',
    title: 'Concepts',
    items: [
      {
        id: 'intro',
        title: {
          as: NavLink,
          content: 'Introduction',
          exact: true,
          activeClassName: 'active',
          to: '/',
        },
      },
      {
        id: 'shorthand',
        title: {
          as: NavLink,
          content: 'Shorthand Props',
          activeClassName: 'active',
          to: '/shorthand-props',
        },
      },
      {
        id: 'composition',
        title: {
          as: NavLink,
          content: 'Composition',
          activeClassName: 'active',
          to: '/composition',
        },
      },
      {
        id: 'icons-viewer',
        title: {
          as: NavLink,
          content: 'Icons',
          activeClassName: 'active',
          to: '/icon-viewer',
        },
      },
    ],
  },
  {
    id: 'guides',
    title: 'Guides',
    items: [
      {
        id: 'quickstart',
        title: {
          content: 'QuickStart',
          as: NavLink,
          activeClassName: 'active',
          to: '/quick-start',
        },
      },
      {
        id: 'faq',
        title: { content: 'FAQ', as: NavLink, activeClassName: 'active', to: '/faq' },
      },
      {
        id: 'accessiblity',
        title: {
          content: 'Accessibility',
          as: NavLink,
          activeClassName: 'active',
          to: '/accessibility',
        },
      },
      {
        id: 'theming',
        title: { content: 'Theming', as: NavLink, activeClassName: 'active', to: '/theming' },
      },
      {
        id: 'theming-examples',
        title: {
          content: 'Theming Examples',
          as: NavLink,
          activeClassName: 'active',
          to: '/theming-examples',
        },
      },
      {
        id: 'colorpalette',
        title: { content: 'Colors', as: NavLink, activeClassName: 'active', to: '/colors' },
      },
      {
        id: 'layout',
        title: { content: 'Layout', as: NavLink, activeClassName: 'active', to: '/layout' },
      },
      {
        id: 'integrate-custom',
        title: {
          content: 'Integrate Custom Components',
          as: NavLink,
          activeClassName: 'active',
          to: '/integrate-custom-components',
        },
      },
      {
        id: 'performance',
        title: {
          content: 'Performance',
          as: NavLink,
          activeClassName: 'active',
          to: '/performance',
        },
      },
      {
        id: 'debugging',
        title: { content: 'Debugging', as: NavLink, activeClassName: 'active', to: '/debugging' },
      },
    ],
  },
  {
    id: 'components',
    title: 'Components',
    items: treeItemsByType[0].items,
  },
];

const changeLogUrl: string = `${config.repoURL}/blob/master/packages/fluentui/CHANGELOG.md`;

const removePublicTags = prototyptesTreeItems => {
  return prototyptesTreeItems.map(p => {
    delete p.public;
    return p;
  });
};

const getSectionsWithPrototypeSectionIfApplicable = (currentSections, allPrototypes) => {
  let prototypes = process.env.NODE_ENV === 'production' ? _.filter(allPrototypes, { public: true }) : allPrototypes;

  if (prototypes.length === 0) {
    return currentSections;
  }
  prototypes = removePublicTags(prototypes);
  const prototypeTreeSection = {
    id: 'prototypes',
    title: 'Prototypes',
    items: prototypes,
  };
  return currentSections.concat(prototypeTreeSection);
};

const Sidebar: React.FC<RouteComponentProps & SidebarProps> = props => {
  const [query, setQuery] = React.useState('');
  const [activeItemIds, setActiveItemIds] = React.useState<string[]>([]);
  const searchInputRef = React.useRef<HTMLInputElement>();
  const regexQuery = React.useMemo(() => new RegExp(`.*${_.escapeRegExp(query)}`, 'i'), [query]);

  const handleDocumentKeyDown = React.useCallback(
    e => {
      const code = getCode(e);
      const isAZ = code >= 65 && code <= 90;
      const hasModifier = e.altKey || e.ctrlKey || e.metaKey;
      const bodyHasFocus = document.activeElement === document.body;

      if (!hasModifier && isAZ && bodyHasFocus) searchInputRef.current?.focus();
    },
    [searchInputRef],
  );

  const findActiveCategoryId = (at: string, sections: ShorthandValue<any>[]): string => {
    let newAt = at;
    if (at.startsWith('/components')) {
      newAt = newAt.replace(/[^\/]*$/, '');
    }
    if (newAt[newAt.length - 1] === '/') {
      newAt = newAt.substr(0, newAt.length - 1);
    }

    return sections.find(section => {
      return section.items.some(item => item.title?.to.startsWith(newAt));
    })?.id;
  };

  const treeItems = React.useMemo(
    () => getSectionsWithPrototypeSectionIfApplicable(baseTreeItems, prototypesTreeItems),
    [],
  );

  React.useEffect(() => {
    const at = props.location.pathname;
    const id = findActiveCategoryId(at, treeItems);
    setActiveItemIds(prev => (prev.includes(id) ? prev : [...prev, id]));
  }, [props.location.pathname, treeItems]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleDocumentKeyDown);
    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [handleDocumentKeyDown]);

  const allSections = React.useMemo(
    () =>
      treeItems
        .map((section: TreeItemProps) => {
          return {
            ...section,
            items: _.filter(section.items as TreeItemProps[], item =>
              regexQuery.test((item.title as TreeTitleProps).content as string),
            ),
          };
        })
        .filter((section: TreeItemProps) => Array.isArray(section.items) && section.items.length > 0),
    [regexQuery, treeItems],
  );

  React.useEffect(() => {
    if (query.length) {
      setActiveItemIds(allSections.map(section => section.id));
    }
  }, [allSections, query]);

  const topItemTheme = {
    ...props.treeItemStyle,
    padding: undefined,
    margin: '0.5rem 1rem',
  };

  const sidebarStyles: ICSSInJSStyle = {
    background: '#201f1f',
    width: `${props.width}px`,
    position: 'fixed',
    overflowY: 'scroll',
    top: 0,
    left: 0,
    padding: 0,
    height: '100%',
    zIndex: 1000,
  };

  const logoStyles: ICSSInJSStyle = {
    marginRight: '0.5rem',
    width: '36px',
  };

  const gradientTextStyles: React.CSSProperties = {
    background: 'linear-gradient(45deg, rgb(138, 255, 124), rgb(123, 226, 251))',
    color: 'transparent',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 100,
  };

  return (
    <Segment styles={sidebarStyles}>
      <Flex column hAlign="center" styles={{ padding: '1rem', background: 'black' }}>
        <Logo flavor="white" styles={logoStyles} />
        <Text
          role="heading"
          aria-level={1}
          styles={{
            fontSize: '1.25rem',
            fontWeight: 600,
            marginBottom: '10px',
          }}
        >
          Fluent <span style={gradientTextStyles}>UI</span>
        </Text>
        <VersionDropdown />
        {process.env.NIGHTLYRELEASEDATE ? null : (
          <CopyToClipboard value={`yarn add ${pkg.name}@${pkg.version}`} timeout={3000}>
            {(active, onClick) => (
              <Box
                as="code"
                onClick={onClick}
                styles={{
                  display: 'block',
                  fontWeight: 'normal',
                  fontSize: '12px',
                  opacity: active ? 1 : 0.6,
                  color: active ? 'rgb(138, 255, 124)' : 'inherit',
                  marginTop: '10px',
                  cursor: 'pointer',
                  ...(!active && {
                    ':hover': {
                      opacity: 0.75,
                    },
                  }),
                }}
              >
                {active ? 'Copied! Happy coding :)' : `${pkg.name}@${pkg.version}`}
              </Box>
            )}
          </CopyToClipboard>
        )}
      </Flex>
      <Flex column>
        <a href={config.repoURL} target="_blank" rel="noopener noreferrer" style={topItemTheme}>
          <Box>
            GitHub
            <GitHubIcon styles={{ float: 'right' }} />
          </Box>
        </a>
        <NavLink to="/builder" exact style={topItemTheme} activeStyle={{ fontWeight: 'bold' }}>
          <Box>
            Builder
            <span style={{ border: 'orange', color: 'orange', marginLeft: '0.5rem' }}>alpha</span>
            <EditIcon styles={{ float: 'right' }} />
          </Box>
        </NavLink>
        <a href={changeLogUrl} target="_blank" rel="noopener noreferrer" style={topItemTheme}>
          <Box>
            CHANGELOG
            <FilesTxtIcon styles={{ float: 'right' }} />
          </Box>
        </a>
        <Input
          styles={{ ...topItemTheme, width: 'auto' }}
          inverted
          fluid
          clearable
          autoComplete="off"
          icon={<SearchIcon />}
          placeholder="Search"
          iconPosition="end"
          role="search"
          onChange={(_, { value }) => {
            setQuery(value);
          }}
          value={query}
          inputRef={searchInputRef}
        />
      </Flex>
      <Tree
        items={allSections}
        renderItemTitle={renderSidebarTitle}
        activeItemIds={activeItemIds}
        onActiveItemIdsChange={(e, { activeItemIds }) => {
          setActiveItemIds(activeItemIds);
        }}
      />
      {/* TODO enable after we have data
      <Flex column>
        <NavLink to="/perf-tests" exact style={topItemTheme}>
          <Box>Performance Tests</Box>
        </NavLink>
      </Flex> */}
    </Segment>
  );
};

export default withRouter(Sidebar);
