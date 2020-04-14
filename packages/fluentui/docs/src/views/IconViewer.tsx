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
  SvgIconSizeValue,
} from '@fluentui/react-northstar';
import * as exports from '@fluentui/react-icons-northstar';
import { CodeSnippet, CopyToClipboard } from '@fluentui/docs-components';
import GuidesNavigationFooter from '../components/GuidesNavigationFooter';

const iconFlexStyles = {
  '> *:nth-child(5n)': {
    marginRight: '0px',
  },
};

const icons = Object.keys(exports).reduce((acc: React.FC<SvgIconProps>[], exportName) => {
  if (!!exports[exportName].displayName) {
    acc.push(exports[exportName]);
  }

  return acc;
}, []);

const exampleCode = `
import { QnaIcon } from '@fluentui/react-icons-northstar';

const Icons = () => (
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
    <Card variables={{ borderColor: '#f2f2f2' }} style={{ background: 'white' }} {...props}>
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
      </Card.Body>
    </Card>
  );
};

const PlaygroundCard = props => {
  const { QnaIcon, EditIcon } = exports;

  const [bordered, setBordered] = React.useState(false);
  const [circular, setCircular] = React.useState(false);
  const [outline, setOutline] = React.useState(false);
  const [rotate, setRotate] = React.useState(0);
  const [size, setSize] = React.useState('largest');

  return (
    <Card variables={{ borderColor: '#f2f2f2' }} style={{ background: 'white', overflow: 'unset' }} {...props}>
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
              <Checkbox checked={outline} label="Outline" onChange={() => setOutline(!outline)} />
            </div>
            <div>
              <Checkbox checked={bordered} label="Bordered" onChange={() => setBordered(!bordered)} />
            </div>
            <div>
              <Checkbox checked={circular} label="Circular" onChange={() => setCircular(!circular)} />
            </div>
            <div>
              <Text weight="semibold">Rotate</Text>
              <br />
              <Input
                type="number"
                placeholder="Enter angle of rotation"
                value={rotate}
                onChange={(e, data) => setRotate(Number(data.value))}
              />
            </div>
            <div style={{ marginBottom: '7px' }}>
              <Text weight="semibold">Size</Text>
              <Dropdown
                items={['smallest', 'smaller', 'small', 'medium', 'large', 'larger', 'largest']}
                value={size}
                onChange={(e, d) => setSize(d.value.toString())}
              />
            </div>
            <Divider />
            <div>
              <Text>
                Checkout our <Link to="components/svg-icon/definition">icon</Link> docs for more examples!
              </Text>
            </div>
          </Flex>
          <Flex.Item grow>
            <Flex hAlign="center" vAlign="center">
              <Flex.Item>
                <div>
                  <QnaIcon
                    size={size as SvgIconSizeValue}
                    outline={outline}
                    bordered={bordered}
                    circular={circular}
                    rotate={rotate}
                  />
                </div>
              </Flex.Item>
            </Flex>
          </Flex.Item>
        </Flex>
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
    <Flex column gap="gap.medium">
      <Flex padding="padding.medium" gap="gap.medium">
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
              >
                <Card.Header>
                  <Flex gap="gap.small" column hAlign="center">
                    <Icon size="largest" />
                    <br />
                    <CopyToClipboard value={`<${Icon.displayName} />`} timeout={3000}>
                      {(active, onClick) => (
                        <Box
                          as="code"
                          onClick={onClick}
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
        <GuidesNavigationFooter
          previous={{ name: 'Shorthand Props', url: 'shorthand-props' }}
          next={{ name: 'Component Architecture', url: 'component-architecture' }}
        />
      </Flex>
    </Flex>
  );
};

export default IconViewer;
