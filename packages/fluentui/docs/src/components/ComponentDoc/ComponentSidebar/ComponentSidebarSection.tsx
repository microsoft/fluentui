import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Icon, HierarchicalTree } from '@fluentui/react'

import { examplePathToHash } from '../../../utils'

export default class ComponentSidebarSection extends React.PureComponent<any, any> {
  static propTypes = {
    activePath: PropTypes.string,
    examples: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        examplePath: PropTypes.string,
      }),
    ),
    sectionName: PropTypes.string,
    onItemClick: PropTypes.func,
    onTitleClick: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isActiveByProps: this.isActiveAccordion(),
    }
  }

  componentWillReceiveProps(nextProps) {
    const isActiveByProps = this.isActiveAccordion(nextProps)
    const didCloseByProps = this.state.isActiveByProps && !isActiveByProps

    // We allow the user to open accordions, but we close them when we scroll passed them
    this.setState(prevState => ({
      isActiveByProps,
      isActiveByUser: didCloseByProps ? false : prevState.isActiveByUser,
    }))
  }

  handleItemClick = examplePath => e => {
    _.invoke(this.props, 'onItemClick', e, { examplePath })
  }

  handleTitleClick = () => {
    this.setState(prevState => ({ isActiveByUser: !prevState.isActiveByUser }))
  }

  isActiveAccordion = (props = this.props) =>
    (props.examples || []).findIndex(item => {
      const exampleHash = examplePathToHash(item.examplePath)
      return exampleHash === props.activePath
    }) !== -1

  render() {
    const { activePath, examples, sectionName } = this.props
    const { isActiveByProps, isActiveByUser } = this.state

    const active = isActiveByUser || isActiveByProps

    if (process.env.NODE_ENV !== 'development' && sectionName === 'Performance') {
      return null
    }

    const items = [
      {
        key: sectionName,
        title: sectionName,
        items: _.map(examples, example => ({
          key: example.examplePath,
          title: {
            content: example.title,
            active: activePath === examplePathToHash(example.examplePath),
          },
          styles: {
            paddingLeft: 0,
          },
        })),
      },
    ]

    const treeStyles = {
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: '.6rem',
      paddingLeft: 0,
      ':focus, :hover': {
        color: '#252424',
        outline: 'none',
      },
    }

    const titleRenderer = (Component, { content, open, hasSubtree, ...restProps }) => (
      <Component
        open={open}
        hasSubtree={hasSubtree}
        {...restProps}
        styles={treeStyles}
        active={active}
        onClick={this.handleTitleClick}
      >
        <span>{content}</span>
        {hasSubtree && <Icon name="arrow-down" />}
      </Component>
    )

    return <HierarchicalTree items={items} renderItemTitle={titleRenderer} />
  }
}
