import * as _ from 'lodash'
import expand from './cssExpandShorthand'
import * as _memoize from 'fast-memoize'

// `fast-memoize` is a CJS library, there are known issues with them:
// https://github.com/rollup/rollup/issues/1267#issuecomment-446681320
const memoize = (_memoize as any).default || _memoize

// _.camelCase is quite fast, but we are running it for the same values many times
const camelCase = memoize(_.camelCase)

const handledCssPropsMap = {
  font: 'font',
  padding: 'padding',
  margin: 'margin',
  border: 'border',
  borderWidth: 'border-width',
  borderStyle: 'border-style',
  borderColor: 'border-color',
  borderTop: 'border-top',
  borderRight: 'border-right',
  borderBottom: 'border-bottom',
  borderLeft: 'border-left',
  borderRadius: 'border-radius',
  background: 'background',
  outline: 'outline',
}

export default () => {
  const expandCssShorthands = (styles: Object) => {
    return Object.keys(styles).reduce((acc, cssPropertyName) => {
      const cssPropertyValue = styles[cssPropertyName]

      if (typeof cssPropertyValue === 'object') {
        return { ...acc, [cssPropertyName]: expandCssShorthands(cssPropertyValue) }
      }

      if (handledCssPropsMap[cssPropertyName]) {
        const expandedProps = expand(handledCssPropsMap[cssPropertyName], `${cssPropertyValue}`)
        if (expandedProps) {
          return { ...acc, ...convertKeysToCamelCase(expandedProps) }
        }
      }

      return { ...acc, [cssPropertyName]: cssPropertyValue }
    }, {})
  }

  return expandCssShorthands
}

const convertKeysToCamelCase = obj => _.mapKeys(obj, (value, key) => camelCase(key))
