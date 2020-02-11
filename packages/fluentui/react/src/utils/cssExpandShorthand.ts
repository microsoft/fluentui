/* eslint-disable */
/* tslint:disable */

let mapObj = function(obj, cb) {
  let ret = {}
  let keys = Object.keys(obj)

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    let res = cb(key, obj[key], obj)
    ret[res[0]] = res[1]
  }

  return ret
}

let immutable = extend

let hasOwnProperty = Object.prototype.hasOwnProperty

function extend() {
  let target = {}

  for (let i = 0; i < arguments.length; i++) {
    let source = arguments[i]

    for (let key in source) {
      if (hasOwnProperty.call(source, key)) {
        target[key] = source[key]
      }
    }
  }

  return target
}

let hexColorRegex = function hexColorRegex(opts) {
  opts = opts && typeof opts === 'object' ? opts : {}

  return opts.strict
    ? /^#([a-f0-9]{3,4}|[a-f0-9]{4}(?:[a-f0-9]{2}){1,2})\b$/i
    : /#([a-f0-9]{3}|[a-f0-9]{4}(?:[a-f0-9]{2}){0,2})\b/gi
}

let hslaRegex = function hslaRegex(options) {
  options = options || {}

  return options.exact
    ? /^hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*(\d*(?:\.\d+)?)\)$/
    : /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*(\d*(?:\.\d+)?)\)/gi
}

let hslRegex = function hslRegex(options) {
  options = options || {}

  return options.exact
    ? /^hsl\(\s*(\d+)\s*,\s*(\d*(?:\.\d+)?%)\s*,\s*(\d*(?:\.\d+)?%)\)$/
    : /hsl\(\s*(\d+)\s*,\s*(\d*(?:\.\d+)?%)\s*,\s*(\d*(?:\.\d+)?%)\)/gi
}

let rgbRegex = function rgbRegex(options) {
  options = options || {}

  return options.exact
    ? /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/
    : /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/gi
}

let rgbaRegex = function rgbaRegex(options) {
  options = options || {}

  return options.exact
    ? /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)$/
    : /rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)/gi
}

let aqua = '#00ffff'
let aliceblue = '#f0f8ff'
let antiquewhite = '#faebd7'
let black = '#000000'
let blue = '#0000ff'
let cyan = '#00ffff'
let darkblue = '#00008b'
let darkcyan = '#008b8b'
let darkgreen = '#006400'
let darkturquoise = '#00ced1'
let deepskyblue = '#00bfff'
let green = '#008000'
let lime = '#00ff00'
let mediumblue = '#0000cd'
let mediumspringgreen = '#00fa9a'
let navy = '#000080'
let springgreen = '#00ff7f'
let teal = '#008080'
let midnightblue = '#191970'
let dodgerblue = '#1e90ff'
let lightseagreen = '#20b2aa'
let forestgreen = '#228b22'
let seagreen = '#2e8b57'
let darkslategray = '#2f4f4f'
let darkslategrey = '#2f4f4f'
let limegreen = '#32cd32'
let mediumseagreen = '#3cb371'
let turquoise = '#40e0d0'
let royalblue = '#4169e1'
let steelblue = '#4682b4'
let darkslateblue = '#483d8b'
let mediumturquoise = '#48d1cc'
let indigo = '#4b0082'
let darkolivegreen = '#556b2f'
let cadetblue = '#5f9ea0'
let cornflowerblue = '#6495ed'
let mediumaquamarine = '#66cdaa'
let dimgray = '#696969'
let dimgrey = '#696969'
let slateblue = '#6a5acd'
let olivedrab = '#6b8e23'
let slategray = '#708090'
let slategrey = '#708090'
let lightslategray = '#778899'
let lightslategrey = '#778899'
let mediumslateblue = '#7b68ee'
let lawngreen = '#7cfc00'
let aquamarine = '#7fffd4'
let chartreuse = '#7fff00'
let gray = '#808080'
let grey = '#808080'
let maroon = '#800000'
let olive = '#808000'
let purple = '#800080'
let lightskyblue = '#87cefa'
let skyblue = '#87ceeb'
let blueviolet = '#8a2be2'
let darkmagenta = '#8b008b'
let darkred = '#8b0000'
let saddlebrown = '#8b4513'
let darkseagreen = '#8fbc8f'
let lightgreen = '#90ee90'
let mediumpurple = '#9370db'
let darkviolet = '#9400d3'
let palegreen = '#98fb98'
let darkorchid = '#9932cc'
let yellowgreen = '#9acd32'
let sienna = '#a0522d'
let brown = '#a52a2a'
let darkgray = '#a9a9a9'
let darkgrey = '#a9a9a9'
let greenyellow = '#adff2f'
let lightblue = '#add8e6'
let paleturquoise = '#afeeee'
let lightsteelblue = '#b0c4de'
let powderblue = '#b0e0e6'
let firebrick = '#b22222'
let darkgoldenrod = '#b8860b'
let mediumorchid = '#ba55d3'
let rosybrown = '#bc8f8f'
let darkkhaki = '#bdb76b'
let silver = '#c0c0c0'
let mediumvioletred = '#c71585'
let indianred = '#cd5c5c'
let peru = '#cd853f'
let chocolate = '#d2691e'
let tan = '#d2b48c'
let lightgray = '#d3d3d3'
let lightgrey = '#d3d3d3'
let thistle = '#d8bfd8'
let goldenrod = '#daa520'
let orchid = '#da70d6'
let palevioletred = '#db7093'
let crimson = '#dc143c'
let gainsboro = '#dcdcdc'
let plum = '#dda0dd'
let burlywood = '#deb887'
let lightcyan = '#e0ffff'
let lavender = '#e6e6fa'
let darksalmon = '#e9967a'
let palegoldenrod = '#eee8aa'
let violet = '#ee82ee'
let azure = '#f0ffff'
let honeydew = '#f0fff0'
let khaki = '#f0e68c'
let lightcoral = '#f08080'
let sandybrown = '#f4a460'
let beige = '#f5f5dc'
let mintcream = '#f5fffa'
let wheat = '#f5deb3'
let whitesmoke = '#f5f5f5'
let ghostwhite = '#f8f8ff'
let lightgoldenrodyellow = '#fafad2'
let linen = '#faf0e6'
let salmon = '#fa8072'
let oldlace = '#fdf5e6'
let bisque = '#ffe4c4'
let blanchedalmond = '#ffebcd'
let coral = '#ff7f50'
let cornsilk = '#fff8dc'
let darkorange = '#ff8c00'
let deeppink = '#ff1493'
let floralwhite = '#fffaf0'
let fuchsia = '#ff00ff'
let gold = '#ffd700'
let hotpink = '#ff69b4'
let ivory = '#fffff0'
let lavenderblush = '#fff0f5'
let lemonchiffon = '#fffacd'
let lightpink = '#ffb6c1'
let lightsalmon = '#ffa07a'
let lightyellow = '#ffffe0'
let magenta = '#ff00ff'
let mistyrose = '#ffe4e1'
let moccasin = '#ffe4b5'
let navajowhite = '#ffdead'
let orange = '#ffa500'
let orangered = '#ff4500'
let papayawhip = '#ffefd5'
let peachpuff = '#ffdab9'
let pink = '#ffc0cb'
let red = '#ff0000'
let seashell = '#fff5ee'
let snow = '#fffafa'
let tomato = '#ff6347'
let white = '#ffffff'
let yellow = '#ffff00'
let rebeccapurple = '#663399'
let keywords = {
  aqua,
  aliceblue,
  antiquewhite,
  black,
  blue,
  cyan,
  darkblue,
  darkcyan,
  darkgreen,
  darkturquoise,
  deepskyblue,
  green,
  lime,
  mediumblue,
  mediumspringgreen,
  navy,
  springgreen,
  teal,
  midnightblue,
  dodgerblue,
  lightseagreen,
  forestgreen,
  seagreen,
  darkslategray,
  darkslategrey,
  limegreen,
  mediumseagreen,
  turquoise,
  royalblue,
  steelblue,
  darkslateblue,
  mediumturquoise,
  indigo,
  darkolivegreen,
  cadetblue,
  cornflowerblue,
  mediumaquamarine,
  dimgray,
  dimgrey,
  slateblue,
  olivedrab,
  slategray,
  slategrey,
  lightslategray,
  lightslategrey,
  mediumslateblue,
  lawngreen,
  aquamarine,
  chartreuse,
  gray,
  grey,
  maroon,
  olive,
  purple,
  lightskyblue,
  skyblue,
  blueviolet,
  darkmagenta,
  darkred,
  saddlebrown,
  darkseagreen,
  lightgreen,
  mediumpurple,
  darkviolet,
  palegreen,
  darkorchid,
  yellowgreen,
  sienna,
  brown,
  darkgray,
  darkgrey,
  greenyellow,
  lightblue,
  paleturquoise,
  lightsteelblue,
  powderblue,
  firebrick,
  darkgoldenrod,
  mediumorchid,
  rosybrown,
  darkkhaki,
  silver,
  mediumvioletred,
  indianred,
  peru,
  chocolate,
  tan,
  lightgray,
  lightgrey,
  thistle,
  goldenrod,
  orchid,
  palevioletred,
  crimson,
  gainsboro,
  plum,
  burlywood,
  lightcyan,
  lavender,
  darksalmon,
  palegoldenrod,
  violet,
  azure,
  honeydew,
  khaki,
  lightcoral,
  sandybrown,
  beige,
  mintcream,
  wheat,
  whitesmoke,
  ghostwhite,
  lightgoldenrodyellow,
  linen,
  salmon,
  oldlace,
  bisque,
  blanchedalmond,
  coral,
  cornsilk,
  darkorange,
  deeppink,
  floralwhite,
  fuchsia,
  gold,
  hotpink,
  ivory,
  lavenderblush,
  lemonchiffon,
  lightpink,
  lightsalmon,
  lightyellow,
  magenta,
  mistyrose,
  moccasin,
  navajowhite,
  orange,
  orangered,
  papayawhip,
  peachpuff,
  pink,
  red,
  seashell,
  snow,
  tomato,
  white,
  yellow,
  rebeccapurple,
}

let repeatElement = function repeat(ele, num) {
  let arr = new Array(num)

  for (let i = 0; i < num; i++) {
    arr[i] = ele
  }

  return arr
}

let cssUrlRegex = function() {
  return /url\(.*?\)/gi
}

let states = {
  VARIATION: 1,
  LINE_HEIGHT: 2,
  FONT_FAMILY: 3,
}

function parse(input: string): object {
  let state = states.VARIATION,
    buffer = '',
    result = {
      'font-family': [],
    }

  for (let c, i = 0; (c = input.charAt(i)); i += 1) {
    if (state === states.FONT_FAMILY && (c === '"' || c === "'")) {
      let index = i + 1 // consume the entire string

      do {
        index = input.indexOf(c, index) + 1

        if (!index) {
          // If a string is not closed by a ' or " return null.
          // TODO: Check to see if this is correct.
          return null
        }
      } while (input.charAt(index - 2) === '\\')

      result['font-family'].push(input.slice(i + 1, index - 1).replace(/\\('|")/g, '$1'))
      i = index - 1
      buffer = ''
    } else if (state === states.FONT_FAMILY && c === ',') {
      if (!/^\s*$/.test(buffer)) {
        result['font-family'].push(buffer.replace(/^\s+|\s+$/, '').replace(/\s+/g, ' '))
        buffer = ''
      }
    } else if (state === states.VARIATION && (c === ' ' || c === '/')) {
      if (
        /^((xx|x)-large|(xx|s)-small|small|large|medium)$/.test(buffer) ||
        /^(larg|small)er$/.test(buffer) ||
        /^(\+|-)?([0-9]*\.)?[0-9]+(em|ex|ch|rem|vh|vw|vmin|vmax|px|mm|cm|in|pt|pc|%)$/.test(buffer)
      ) {
        state = c === '/' ? states.LINE_HEIGHT : states.FONT_FAMILY
        result['font-size'] = buffer
      } else if (/^(italic|oblique)$/.test(buffer)) {
        result['font-style'] = buffer
      } else if (/^small-caps$/.test(buffer)) {
        result['font-variant'] = buffer
      } else if (/^(bold(er)?|lighter|normal|[1-9]00)$/.test(buffer)) {
        result['font-weight'] = buffer
      } else if (/^((ultra|extra|semi)-)?(condensed|expanded)$/.test(buffer)) {
        result['font-stretch'] = buffer
      }

      buffer = ''
    } else if (state === states.LINE_HEIGHT && c === ' ') {
      if (
        /^(\+|-)?([0-9]*\.)?[0-9]+(em|ex|ch|rem|vh|vw|vmin|vmax|px|mm|cm|in|pt|pc|%)?$/.test(buffer)
      ) {
        result['line-height'] = buffer
      }

      state = states.FONT_FAMILY
      buffer = ''
    } else {
      buffer += c
    }
  }

  if (state === states.FONT_FAMILY && !/^\s*$/.test(buffer)) {
    result['font-family'].push(buffer.replace(/^\s+|\s+$/, '').replace(/\s+/g, ' '))
  }

  if (result['font-size'] && result['font-family'].length) {
    return result
  }
  return null
}

function font(input) {
  if (/^(inherit|initial)$/.test(input)) {
    return {
      'font-size': input,
      'line-height': input,
      'font-style': input,
      'font-weight': input,
      'font-variant': input,
      'font-stretch': input,
      'font-family': input,
    }
  }

  input = input.replace(/\s*\/\s*/, '/')
  let result = parse(input)

  if (result) {
    // @ts-ignore
    result['font-family'] = result['font-family']
      .map(function(family) {
        return /^(serif|sans-serif|monospace|cursive|fantasy)$/.test(family)
          ? family
          : '"' + family + '"'
      })
      .join(', ')
  }

  return result
}

function repeat(ele, num) {
  let arr = new Array(num)

  for (let i = 0; i < num; i++) {
    arr[i] = ele
  }

  return arr
}

function directional(value) {
  let values = value.split(/\s+/)
  if (values.length === 1) {
    values = repeat(values[0], 4)
  } else if (values.length === 2) {
    values = values.concat(values)
  } else if (values.length === 3) {
    values.push(values[1])
  } else if (values.length > 4) {
    return null
  }

  return ['top', 'right', 'bottom', 'left'].reduce(function(acc, direction, i) {
    acc[direction] = values[i]
    return acc
  }, {})
}

// @ts-ignore
let HEX = new RegExp('^' + hexColorRegex().source + '$', 'i')
let HSLA = hslaRegex({
  exact: true,
})
let HSL = hslRegex({
  exact: true,
})
let RGB = rgbRegex({
  exact: true,
})
let RGBA = rgbaRegex({
  exact: true,
})
function isColor(value) {
  value = value.toLowerCase()
  return (
    !!keywords[value] ||
    value === 'currentcolor' ||
    value === 'transparent' ||
    HEX.test(value) ||
    HSLA.test(value) ||
    HSL.test(value) ||
    RGB.test(value) ||
    RGBA.test(value)
  )
}

let LENGTH = /^(\+|-)?([0-9]*\.)?[0-9]+(em|ex|ch|rem|vh|vw|vmin|vmax|px|mm|cm|in|pt|pc|%)$/i
let ZERO = /^(\+|-)?(0*\.)?0+$/
function isLength(value) {
  return LENGTH.test(value) || ZERO.test(value)
}

// @ts-ignore
let FUNCTIONS = [hslaRegex(), hslRegex(), rgbRegex(), rgbaRegex()]
function normalize(value) {
  return FUNCTIONS.reduce(function(acc, func) {
    return acc.replace(func, function(match) {
      return match.replace(/\s+/g, '')
    })
  }, value)
}

let WIDTH = /^(thin|medium|thick)$/
let STYLE = /^(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset)$/i
let KEYWORD = /^(inherit|initial)$/i

let borderSuffix = function borderSuffix(_suffix, shouldNormalizeColor = false) {
  return function(value) {
    const normalizedValue = shouldNormalizeColor ? normalize(value) : value
    const longhand = directional(normalizedValue)

    return (
      longhand &&
      mapObj(longhand, function(key, value) {
        return ['border-' + key + '-' + _suffix, value]
      })
    )
  }
}

let direction = function direction(_direction) {
  return function(value) {
    let longhand = all(value)
    return (
      longhand &&
      mapObj(longhand, function(key, value) {
        return ['border-' + _direction + '-' + key, value]
      })
    )
  }
}

let all = function all(value) {
  let values = normalize(value).split(/\s+/)
  let first = values[0]
  // @ts-ignore
  if (values.length > 3) return

  if (values.length === 1 && KEYWORD.test(first)) {
    return {
      width: first,
      style: first,
      color: first,
    }
  }

  let result = {}

  for (let i = 0; i < values.length; i++) {
    let v = values[i]

    if (WIDTH.test(v) || isLength(v)) {
      // @ts-ignore
      if (result.width) return
      // @ts-ignore
      result.width = v
    } else if (STYLE.test(v)) {
      // @ts-ignore
      if (result.style) return
      // @ts-ignore
      result.style = v
    } else if (isColor(v)) {
      // @ts-ignore
      if (result.color) return
      // @ts-ignore
      result.color = v
    } else {
      // @ts-ignore
      return
    }
  }

  return result
}

let border = function border(value) {
  let longhand = all(value)
  return (
    longhand &&
    Object.keys(longhand).reduce(function(acc, key) {
      let props = border[key](longhand[key])
      // @ts-ignore
      return immutable(acc, props)
    }, {})
  )
}

// @ts-ignore
border.width = borderSuffix('width')
// @ts-ignore
border.style = borderSuffix('style')
// @ts-ignore
border.color = borderSuffix('color', true)
// @ts-ignore
border.top = direction('top')
// @ts-ignore
border.right = direction('right')
// @ts-ignore
border.bottom = direction('bottom')
// @ts-ignore
border.left = direction('left')

let directional$1 = function directional(value) {
  let values = value.split(/\s+/)
  if (values.length === 1) values = repeatElement(values[0], 4)
  else if (values.length === 2) values = values.concat(values)
  else if (values.length === 3) values.push(values[1])
  // @ts-ignore
  else if (values.length > 4) return
  return ['top-left', 'top-right', 'bottom-right', 'bottom-left'].reduce(function(
    acc,
    direction,
    i,
  ) {
    acc[direction] = values[i]
    return acc
  },
  {})
}

let borderRadius = function borderRadius(value) {
  let longhand = directional$1(value)
  return (
    longhand &&
    mapObj(longhand, function(key, value) {
      return ['border-' + key + '-radius', value]
    })
  )
}

let ATTACHMENT = /^(fixed|local|scroll)$/
let BOX = /^(border-box|padding-box|content-box)$/
let IMAGE = new RegExp('^(none|' + cssUrlRegex().source + ')$', 'i')
let REPEAT_SINGLE = /^(repeat-x|repeat-y)$/i
let REPEAT_DOUBLE = /^(repeat|space|round|no-repeat)$/i
let POSITION_HORIZONTAL = /^(left|center|right)$/
let POSITION_VERTICAL = /^(top|center|bottom)$/
let SIZE_SINGLE = /^(cover|contain)$/
let KEYWORD$1 = /^(inherit|initial)$/i

let normalizeUrl = function normalizeUrl(value) {
  return value.replace(cssUrlRegex(), function(match) {
    return match.replace(/^url\(\s+/, 'url(').replace(/\s+\)$/, ')')
  })
}

function background(value) {
  let result = {}
  let values = normalizeUrl(normalize(value))
    .replace(/\(.*\/.*\)|(\/)+/g, (match, group1) => (!group1 ? match : ' / '))
    .split(/\s+/)
  let first = values[0]

  if (values.length === 1 && KEYWORD$1.test(first)) {
    return {
      'background-attachment': first,
      'background-clip': first,
      'background-image': first,
      'background-repeat': first,
      'background-color': first,
      'background-position': first,
      'background-size': first,
    }
  }

  for (let i = 0; i < values.length; i++) {
    let v = values[i]

    if (ATTACHMENT.test(v)) {
      // @ts-ignore
      if (result.attachment) return
      // @ts-ignore
      result.attachment = v
    } else if (BOX.test(v)) {
      // @ts-ignore
      if (result.clip) return
      // @ts-ignore
      result.clip = v
    } else if (IMAGE.test(v)) {
      // @ts-ignore
      if (result.image) return
      // @ts-ignore
      result.image = v
    } else if (REPEAT_SINGLE.test(v)) {
      // @ts-ignore
      if (result.repeat) return
      // @ts-ignore
      result.repeat = v
    } else if (REPEAT_DOUBLE.test(v)) {
      // @ts-ignore
      if (result.repeat) return
      let n = values[i + 1]

      if (n && REPEAT_DOUBLE.test(n)) {
        v += ' ' + n
        i++
      }

      // @ts-ignore
      result.repeat = v
    } else if (isColor(v)) {
      // @ts-ignore
      if (result.color) return
      // @ts-ignore
      result.color = v
    } else if (POSITION_HORIZONTAL.test(v) || POSITION_VERTICAL.test(v) || isLength(v)) {
      // @ts-ignore
      if (result.position) return
      let n = values[i + 1]
      let isHorizontal = POSITION_HORIZONTAL.test(v) || isLength(v)
      let isVertical = POSITION_VERTICAL.test(n) || isLength(n)

      if (isHorizontal && isVertical) {
        // @ts-ignore
        result.position = v + ' ' + n
        i++
      } else {
        // @ts-ignore
        result.position = v
      }

      v = values[i + 1]

      if (v === '/') {
        i += 2
        v = values[i]

        if (SIZE_SINGLE.test(v)) {
          // @ts-ignore
          result.size = v
        } else if (v === 'auto' || isLength(v)) {
          n = values[i + 1]

          if (n === 'auto' || isLength(n)) {
            v += ' ' + n
            i++
          }

          // @ts-ignore
          result.size = v
        } else {
          // @ts-ignore
          return
        }
      }
    } else {
      // @ts-ignore
      return
    }
  }

  return mapObj(result, function(key, value) {
    return ['background-' + key, value]
  })
}

let WIDTH$1 = /^(thin|medium|thick)$/
let STYLE$1 = /^(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset)$/i
let KEYWORD$2 = /^(inherit|initial)$/i

let outline = function outline(value) {
  let values = normalize(value).split(/\s+/)
  // @ts-ignore
  if (values.length > 3) return

  if (values.length === 1 && KEYWORD$2.test(values[0])) {
    return {
      'outline-width': values[0],
      'outline-style': values[0],
      'outline-color': values[0],
    }
  }

  let result = {}

  for (let i = 0; i < values.length; i++) {
    let v = values[i]

    if (isLength(v) || WIDTH$1.test(v)) {
      // @ts-ignore
      if (result['outline-width']) return
      result['outline-width'] = v
    } else if (STYLE$1.test(v)) {
      // @ts-ignore
      if (result['outline-style']) return
      result['outline-style'] = v
    } else if (isColor(v)) {
      // @ts-ignore
      if (result['outline-color']) return
      result['outline-color'] = v
    } else {
      // @ts-ignore
      return
    }
  }
  return result
}

let prefix = function prefix(_prefix) {
  return function(value) {
    let longhand = directional(value)
    return (
      longhand &&
      mapObj(longhand, function(key, value) {
        return [_prefix + '-' + key, value]
      })
    )
  }
}

let shorthand = {
  font,
  padding: prefix('padding'),
  margin: prefix('margin'),
  border,
  // @ts-ignore
  'border-width': border.width,
  // @ts-ignore
  'border-style': border.style,
  // @ts-ignore
  'border-color': border.color,
  // @ts-ignore
  'border-top': border.top,
  // @ts-ignore
  'border-right': border.right,
  // @ts-ignore
  'border-bottom': border.bottom,
  // @ts-ignore
  'border-left': border.left,
  'border-radius': borderRadius,
  background,
  outline,
}
function index(property, value) {
  let normalized = value.trim()
  let important = /\s+!important$/.test(normalized)
  normalized = normalized.replace(/\s+!important$/, '')
  let parse = shorthand[property]
  let longhand = parse && parse(normalized)
  if (!longhand) return
  if (!important) return longhand
  return mapObj(longhand, function(key, value) {
    return [key, value + ' !important']
  })
}

export default index
