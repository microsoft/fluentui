import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { tabListBehavior, Header, Text, Flex, Menu } from '@fluentui/react-northstar';
import { ArrowDownIcon } from '@fluentui/react-icons-northstar';

import { getFormattedHash } from '../../utils';
// import ComponentDocLinks from './ComponentDocLinks'
// import ComponentDocSee from './ComponentDocSee'
import ComponentProps from './ComponentProps';
import { ComponentDocAccessibility } from './ComponentDocAccessibility';
import { ThemeContext } from '../../context/ThemeContext';
import ExampleContext from '../../context/ExampleContext';
import { ComponentInfo } from '../../types';
import * as _ from 'lodash';
import ThemeDropdown from '../ThemeDropdown';

const ComponentExamples = React.lazy(async () => ({
  default: (await import(/* webpackChunkName: "examples-with-source" */ './ComponentExamples')).ComponentExamples,
}));
const ComponentPlayground = React.lazy(
  () => import(/* webpackChunkName: "playground" */ '../ComponentPlayground/ComponentPlayground'),
);
const ComponentBestPractices = React.lazy(
  () => import(/* webpackChunkName: "best-practices" */ './ComponentBestPractices'),
);

const exampleEndStyle: React.CSSProperties = {
  textAlign: 'center',
  opacity: 0.5,
  paddingTop: '75vh',
};

type ComponentDocProps = {
  info: ComponentInfo;
  tabs: string[];
} & RouteComponentProps<{}>;

type ComponentDocState = {
  activePath: string;
  currentTabIndex: number;
};

class ComponentDoc extends React.Component<ComponentDocProps, ComponentDocState> {
  state = {
    activePath: '',
    propComponent: '',
    currentTabIndex: 0,
  };

  tabRegex = new RegExp(/[^\/]*$/);

  getTabIndexOrRedirectToDefault(tab: string, tabs) {
    const lowercaseTabs = _.map(tabs, tab => tab.toLowerCase());
    const index = lowercaseTabs.indexOf(tab);
    if (index === -1) {
      const { history, location } = this.props;
      const at = location.pathname;
      const newLocation = at.replace(this.tabRegex, 'definition');
      history.push(newLocation);
      return 0;
    }
    return index;
  }

  getCurrentTabTitle() {
    return this.props.tabs[this.state.currentTabIndex];
  }

  UNSAFE_componentWillMount() {
    const { history, location, tabs } = this.props;
    const tab = location.pathname.match(this.tabRegex)[0];
    const tabIndex = this.getTabIndexOrRedirectToDefault(tab, tabs);
    this.setState({ currentTabIndex: tabIndex });

    if (location.hash) {
      const activePath = getFormattedHash(location.hash);
      history.replace({ ...history.location, hash: activePath });
      this.setState({ activePath });
    }
  }

  UNSAFE_componentWillReceiveProps({ info, location, tabs }) {
    const tab = location.pathname.match(this.tabRegex)[0];
    const tabIndex = this.getTabIndexOrRedirectToDefault(tab, tabs);
    this.setState({ currentTabIndex: tabIndex });

    if (info.displayName !== this.props.info.displayName) {
      this.setState({ activePath: undefined });
    }
  }

  handleExamplePassed = (passedAnchorName: string) => {
    this.setState({ activePath: passedAnchorName });
  };

  /* TODO: bring back the right floating menu
  handleSidebarItemClick = (e, { examplePath }) => {
    const { history } = this.props
    const activePath = examplePathToHash(examplePath)

    history.replace({ ...history.location, hash: activePath })
    // set active hash path
    this.setState({ activePath }, scrollToAnchor)
  }
  */

  handleTabClick = (e, props) => {
    const newIndex = props.index;
    const { history, location } = this.props;
    const at = location.pathname;
    const newLocation = at.replace(this.tabRegex, this.props.tabs[newIndex].toLowerCase());

    history.push(newLocation);
    this.setState({ currentTabIndex: newIndex });
  };

  render() {
    const { info, tabs } = this.props;
    const { activePath, currentTabIndex } = this.state;

    const PAGE_PADDING = '20px';
    return (
      <div>
        <DocumentTitle title={`Fluent UI - ${info.displayName}`} />
        <div
          id="docs-sticky-header"
          style={{
            position: 'sticky',
            padding: `${PAGE_PADDING} ${PAGE_PADDING} 10px ${PAGE_PADDING}`,
            top: 0,
            background: '#DDDDDD88',
            borderBottom: '1px solid #00000022',
            backdropFilter: 'blur(10px)',
            zIndex: 1000,
          }}
        >
          <ThemeContext.Consumer>
            {({ changeTheme, themeOptions }) => (
              <ThemeDropdown style={{ float: 'right' }} onChange={changeTheme} themeOptions={themeOptions} />
            )}
          </ThemeContext.Consumer>
          <Header
            as="h1"
            aria-level={2}
            content={info.displayName}
            style={{ margin: 0 }}
            variables={{ color: 'black' }}
          />
          <Menu
            underlined
            activeIndex={currentTabIndex}
            items={tabs}
            style={{ marginTop: '0.5rem', background: 'none', border: 'none' }}
            variables={siteVariables => ({
              underlinedColorHover: siteVariables.colors.black,
              color: siteVariables.colors.grey[500],
              colorActive: siteVariables.colors.black,
              activeUnderlinedBorderBottomColor: siteVariables.colors.black,
              underlinedWrapperColorHover: siteVariables.colors.black,
              backgroundColorActive: siteVariables.colors.black,
              activeUnderlinedColor: siteVariables.colors.black,
            })}
            onItemClick={this.handleTabClick}
            accessibility={tabListBehavior}
          />
        </div>
        {/* <ComponentDocSee displayName={info.displayName} /> */}

        <div style={{ padding: PAGE_PADDING }}>
          {/* <ComponentDocLinks */}
          {/*  displayName={info.displayName} */}
          {/*  parentDisplayName={info.parentDisplayName} */}
          {/*  repoPath={info.repoPath} */}
          {/*  type={info.type} */}
          {/* /> */}

          {this.getCurrentTabTitle() === 'Accessibility' && <ComponentDocAccessibility info={info} />}

          {this.getCurrentTabTitle() === 'Props' && (
            <ComponentProps displayName={info.displayName} props={info.props} />
          )}

          {this.getCurrentTabTitle() === 'Definition' && (
            <>
              <Text
                size="large"
                content={info.docblock.description}
                style={{
                  display: 'block',
                  margin: '0 0 1rem 0',
                }}
              />
              <ComponentPlayground
                componentName={info.displayName}
                key={info.displayName}
                style={{ marginTop: '1rem' }}
              />
              <Flex column>
                <ComponentBestPractices displayName={info.displayName} />
                <ExampleContext.Provider
                  value={{
                    activeAnchorName: activePath,
                    onExamplePassed: this.handleExamplePassed,
                  }}
                >
                  <ComponentExamples displayName={info.displayName} />
                </ExampleContext.Provider>
              </Flex>
            </>
          )}

          <div style={exampleEndStyle}>
            This is the bottom <ArrowDownIcon />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ComponentDoc);
