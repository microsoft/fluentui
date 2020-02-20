import { useSelectKnob, useStringKnob } from '@fluentui/docs-components'
import {
  AvatarProps,
  BoxProps,
  DialogProps,
  DividerProps,
  EmbedProps,
  IconProps,
  ImageProps,
  VideoProps,
} from '@fluentui/react'
import * as _ from 'lodash'
import * as faker from 'faker'

import { KnobComponentGenerators } from '../../types'
import { number } from '../ComponentPlayground/typeGenerators'

export const Avatar: KnobComponentGenerators<AvatarProps> = {
  name: ({ propName }) => ({
    hook: useStringKnob,
    name: propName,
    initialValue: _.capitalize(`${faker.name.firstName()} ${faker.name.lastName()}`),
  }),
}

export const Box: KnobComponentGenerators<BoxProps> = {
  // TODO: fix support for boxes
  children: () => null,
}

export const Dialog: KnobComponentGenerators<DialogProps> = {
  footer: () => null,
}

export const Divider: KnobComponentGenerators<DividerProps> = {
  // Workaround for `Divider` component that supports size in different way
  size: number,
}

export const Embed: KnobComponentGenerators<EmbedProps> = {
  placeholder: ({ componentInfo, propName }) => ({
    hook: useStringKnob,
    name: propName,
    initialValue:
      'https://raw.githubusercontent.com/bower-media-samples/big-buck-bunny-480p-5s/master/poster.jpg',
  }),
  // Hack until `size` prop will not supported
  variables: () => ({
    hook: () => [{ width: '480px' }],
    name: 'variables',
  }),
}

export const Icon: KnobComponentGenerators<IconProps> = {
  name: ({ componentInfo, propDef, propName, theme }) => {
    const values = Object.keys(theme.icons).slice(0, 10)

    // This generator can be used for shorthands via recursion.
    // Due wrong type definitions on `Icon` the `name` prop there is neither required, nor does not
    // have default value.
    // TODO: remove this hack once we will clarify types for Icon component
    const isIconComponent = propName === 'name'

    return {
      hook: useSelectKnob,
      name: propName,
      allowsNone: _.isNil(propDef.defaultValue) && !isIconComponent,
      initialValue: isIconComponent ? values[0] : propDef.defaultValue,
      values,
    }
  },
}

export const Image: KnobComponentGenerators<ImageProps> = {
  src: ({ propName }) => ({
    hook: useStringKnob,
    name: propName,
    initialValue: faker.image.avatar(),
  }),
}

export const Video: KnobComponentGenerators<VideoProps> = {
  poster: ({ componentInfo, propName }) => ({
    hook: useStringKnob,
    name: propName,
    initialValue: 'public/images/tears-of-steel.jpg',
  }),
  src: ({ propName }) => ({
    hook: useStringKnob,
    name: propName,
    initialValue:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  }),
  // Hack until `size` prop will not supported
  variables: () => ({
    hook: () => [{ height: '300px', width: '720px' }],
    name: 'variables',
  }),
}
