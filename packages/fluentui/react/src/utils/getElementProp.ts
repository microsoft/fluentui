import * as _ from 'lodash'

const getElementProp = (element, propName) => {
  return _.get(element, `props.${propName}`)
}

export default getElementProp
