import {
  Box,
  Flex,
  ICSSInJSStyle,
  Input,
  Segment,
  Text,
  ShorthandValue,
  Image,
  Tree,
  TreeProps,
  TreeItemProps,
  TreeTitleProps,
} from '@fluentui/react-northstar';
import { CopyToClipboard } from '@fluentui/docs-components';
import Logo from '../Logo/Logo';
import { getComponentPathname } from '../../utils';
import { getCode } from '@fluentui/keyboard-key';
import * as _ from 'lodash';
import * as React from 'react';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import { SearchIcon, FilesTxtIcon, EditIcon } from '@fluentui/react-icons-northstar';
import { renderSidebarTitle } from './SidebarTitle';
import config from '../../config';

type ComponentMenuItem = { displayName: string; type: string };

const pkg = require('@fluentui/react-northstar/package.json');
const componentMenu: ComponentMenuItem[] = require('../../componentMenu');
const behaviorMenu: ComponentMenuItem[] = require('../../behaviorMenu');

const componentsBlackList = ['Debug', 'Design', 'Datepicker'];
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
    id: 'virtualized-table',
    title: { content: 'VirtualizedTable', as: NavLink, to: '/virtualized-table' },
    public: true,
  },
  {
    id: 'unstable-datepicker',
    title: { content: 'Datepicker', as: NavLink, to: '/unstable-datepicker' },
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
      {
        id: 'component-architecture',
        title: {
          as: NavLink,
          content: 'Component Architecture',
          activeClassName: 'active',
          to: '/component-architecture',
        },
      },
      ...(process.env.NODE_ENV !== 'production'
        ? [
            {
              id: 'theming-specification',
              title: {
                as: NavLink,
                content: 'Theming Specification',
                activeClassName: 'active',
                to: '/theming-specification',
              },
            },
          ]
        : []),
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
        id: 'styles-overrides',
        title: {
          content: 'Styles overrides',
          as: NavLink,
          activeClassName: 'active',
          to: '/styles-overrides',
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
    margin: '0.5em 0em 0.5em 1em',
    width: `${0.9 * props.width}px`,
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
            color: 'white',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          Fluent <span style={gradientTextStyles}>UI</span>
        </Text>
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
      </Flex>
      <Flex column>
        <a href={config.repoURL} target="_blank" rel="noopener noreferrer" style={topItemTheme}>
          <Box>
            GitHub
            <Image src="public/images/github.png" width="20px" height="20px" styles={{ float: 'right' }} />
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
          styles={topItemTheme}
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
    </Segment>
  );
};

export default withRouter(Sidebar);
