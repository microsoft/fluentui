import * as _ from 'lodash'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { List, Header } from '@fluentui/react'

import { getComponentPathname, getInfoForSeeTags } from '../../utils'

const listStyle = { display: 'block' }

const ComponentDocSee: any = ({ displayName }) => {
  const items = getInfoForSeeTags(displayName)

  if (_.isEmpty(items)) return null
  return (
    <List styles={listStyle}>
      {/* Heads up! Still render empty lists to reserve the whitespace */}
      <List.Item>
        <Header color="grey" content={items.length > 0 ? 'See:' : ' '} />
      </List.Item>
      {_.map(items, info => (
        <List.Item
          as={Link}
          content={info.displayName}
          key={info.docblock.description}
          to={getComponentPathname(info)}
        />
      ))}
    </List>
  )
}

ComponentDocSee.propTypes = {
  displayName: PropTypes.string.isRequired,
}

export default ComponentDocSee
