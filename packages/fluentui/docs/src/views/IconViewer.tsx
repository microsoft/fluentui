import * as React from 'react';
import * as _ from 'lodash';
import { Link } from 'react-router-dom';
import {
  SvgIconProps,
  Input,
  Flex,
  Card,
  Box,
  Text,
  Header,
  Dropdown,
  Checkbox,
  Divider,
  SizeValue,
} from '@fluentui/react-northstar';
import * as exports from '@fluentui/react-icons-northstar';
import { CodeSnippet, CopyToClipboard } from '@fluentui/docs-components';
import GuidesNavigationFooter from '../components/GuidesNavigationFooter';
import ComponentPlaygroundSnippet from '../../src/components/ComponentPlayground/ComponentPlaygroundSnippet';
import DocPage from '../components/DocPage';

const iconFlexStyles = {
  '> *:nth-child(5n)': {
    marginRight: '0px',
  },
};

const cardsStyles = {
  background: 'white',
  minHeight: 330,
  overflow: 'unset',
};

const icons = Object.keys(exports).reduce((acc: React.FC<SvgIconProps>[], exportName) => {
  if (!!exports[exportName].displayName) {
    acc.push(exports[exportName]);
  }

  return acc;
}, []);

const exampleCode = `
import { QnaIcon } from '@fluentui/react-icons-northstar';

const Example = () => (
  <>
    <QnaIcon />
    <QnaIcon outline />
    <QnaIcon size="large" />
  </>
)
`;

const IntroCard = props => {
  const { QnaIcon } = exports;
  return (
    <Card variables={{ borderColor: '#f2f2f2' }} style={cardsStyles} {...props}>
      <Card.Header>
        <Flex gap="gap.small">
          <QnaIcon size="largest" />
          <Flex column>
            <Text size="large" content="How to use the icons?" weight="bold" />
            <Text
              content={
                <span>
                  Just add the <code>@fluentui/react-icons-northstar</code> package and choose from over 200
                  customizable icons.
                </span>
              }
            />
          </Flex>
        </Flex>
      </Card.Header>
      <Card.Body>
        <CodeSnippet mode="jsx" value={exampleCode} />
        <div>
          <Text>
            Checkout our{' '}
            <Link to="components/svg-icon/definition">
              <Text color="brand" weight="bold">
                icon
              </Text>
            </Link>{' '}
            docs for more examples!
          </Text>
        </div>
      </Card.Body>
    </Card>
  );
};

interface PlaygroundAction {
  type: 'toggle_bordered' | 'toggle_circular' | 'toggle_outline' | 'change_rotate' | 'change_size';
  value?: SizeValue | number;
}

interface PlaygroundCardState {
  bordered: boolean;
  circular: boolean;
  outline: boolean;
  rotate: number;
  size: SizeValue;
}

const playgroundStateReducer = (state: PlaygroundCardState, action: PlaygroundAction) => {
  switch (action.type) {
    case 'toggle_bordered':
      return { ...state, bordered: !state.bordered };
    case 'toggle_outline':
      return { ...state, outline: !state.outline };
    case 'toggle_circular':
      return { ...state, circular: !state.circular };
    case 'change_rotate':
      return { ...state, rotate: action.value as number };
    case 'change_size':
      return { ...state, size: action.value as SizeValue };

    default:
      throw new Error(`Action ${action.type} is not supported`);
  }
};

const PlaygroundCard = props => {
  const { QnaIcon, EditIcon } = exports;

  const [state, dispatch] = React.useReducer(playgroundStateReducer, {
    bordered: false,
    circular: false,
    outline: false,
    rotate: 0,
    size: 'largest',
  });

  const element = (
    <QnaIcon
      size={state.size}
      outline={state.outline}
      bordered={state.bordered}
      circular={state.circular}
      rotate={state.rotate}
    />
  );

  return (
    <Card variables={{ borderColor: '#f2f2f2' }} style={cardsStyles} {...props}>
      <Card.Header>
        <Flex gap="gap.small">
          <EditIcon size="largest" />
          <Flex column>
            <Text size="large" content="Want to see different options on the icons?" weight="bold" />
            <Text content="Use the controls below to see how the icons will change." />
          </Flex>
        </Flex>
      </Card.Header>
      <Card.Body>
        <Flex>
          <Flex column>
            <div>
              <Checkbox checked={state.outline} label="Outline" onChange={() => dispatch({ type: 'toggle_outline' })} />
            </div>
            <div>
              <Checkbox
                checked={state.bordered}
                label="Bordered"
                onChange={() => dispatch({ type: 'toggle_bordered' })}
              />
            </div>
            <div>
              <Checkbox
                checked={state.circular}
                label="Circular"
                onChange={() => dispatch({ type: 'toggle_circular' })}
              />
            </div>
            <div>
              <Text weight="semibold">Rotate</Text>
              <br />
              <Input
                type="number"
                placeholder="Enter angle of rotation"
                value={state.rotate}
                onChange={(e, data) => dispatch({ type: 'change_rotate', value: Number(data.value) })}
              />
            </div>
            <div style={{ marginBottom: '7px' }}>
              <Text weight="semibold">Size</Text>
              <Dropdown
                items={['smallest', 'smaller', 'small', 'medium', 'large', 'larger', 'largest']}
                value={state.size}
                onChange={(e, d) => dispatch({ type: 'change_size', value: d.value.toString() as SizeValue })}
              />
            </div>
          </Flex>
          <Flex.Item grow>
            <Flex hAlign="center" vAlign="center">
              <Flex.Item>
                <div>{element}</div>
              </Flex.Item>
            </Flex>
          </Flex.Item>
        </Flex>
        <Divider />
        <div>
          <ComponentPlaygroundSnippet element={element} />
        </div>
      </Card.Body>
    </Card>
  );
};

const IconViewer = () => {
  const [query, setQuery] = React.useState('');

  const { SearchIcon } = exports;

  const escapedQuery = _.escapeRegExp(query);
  const regexQuery = new RegExp(`.*${escapedQuery}`, 'i');

  const handleQueryChange = (e, data) => {
    setQuery(data.value);
  };

  const filteredIcons = icons.filter(IconComponent => regexQuery.test(IconComponent.displayName));

  return (
    <DocPage title="Icons" fluid>
      <Flex column gap="gap.medium">
        <Flex gap="gap.medium">
          <Flex.Item grow>
            <IntroCard />
          </Flex.Item>
          <Flex.Item grow>
            <PlaygroundCard />
          </Flex.Item>
        </Flex>
        <Flex column gap="gap.medium" padding="padding.medium">
          <Header content="Looking for particular icon?" style={{ textAlign: 'center' }} />
          <Input
            inverted
            fluid
            clearable
            icon={<SearchIcon />}
            placeholder={`Search across ${icons.length} icons`}
            iconPosition="end"
            role="search"
            onChange={handleQueryChange}
            value={query}
          />
          <Flex wrap gap="gap.medium" styles={iconFlexStyles}>
            {filteredIcons.map(Icon => (
              <Flex.Item align="center" key={Icon.displayName}>
                <Card
                  centered
                  variables={{ borderColor: '#f2f2f2', width: 'calc(20% - 12px)' }}
                  styles={{ marginTop: '10px', background: 'white' }}
                  aria-roledescription="Icon card"
                >
                  <Card.Header>
                    <Flex gap="gap.small" column hAlign="center">
                      <Icon outline size="largest" />
                      <br />
                      <CopyToClipboard value={`<${Icon.displayName} />`} timeout={3000}>
                        {(active, onClick) => (
                          <Box
                            as="code"
                            onClick={onClick}
                            title="Click to copy JSX to your clipboard"
                            styles={{
                              fontSize: '10px !improtant',
                              opacity: active ? 1 : 0.6,
                              color: active ? 'green' : 'inherit',
                              cursor: 'pointer',
                              ...(!active && {
                                ':hover': {
                                  opacity: 0.75,
                                },
                              }),
                            }}
                          >
                            {active ? 'Copied! Happy coding :)' : `<${Icon.displayName} />`}
                          </Box>
                        )}
                      </CopyToClipboard>
                    </Flex>
                  </Card.Header>
                </Card>
              </Flex.Item>
            ))}
          </Flex>
        </Flex>
        <Flex padding="padding.medium">
          <GuidesNavigationFooter previous={{ name: 'Composition', url: 'composition' }} />
        </Flex>
      </Flex>
    </DocPage>
  );
};

export default IconViewer;
