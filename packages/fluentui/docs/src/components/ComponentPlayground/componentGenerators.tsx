import { useStringKnob, useBooleanKnob } from '@fluentui/docs-components';
import {
  AvatarProps,
  AlertProps,
  BoxProps,
  CardProps,
  DialogProps,
  DividerProps,
  EmbedProps,
  ImageProps,
  VideoProps,
  Avatar as _Avatar,
  CardBody as _CardBody,
  CardHeader as _CardHeader,
  Flex as _Flex,
  Text as _Text,
  DatepickerProps,
  InputProps,
} from '@fluentui/react-northstar';
import * as _ from 'lodash';
import * as faker from 'faker';
import * as React from 'react';

import { KnobComponentGenerators } from '../../types';
import { number } from '../ComponentPlayground/typeGenerators';

export const Avatar: KnobComponentGenerators<AvatarProps> = {
  name: ({ propName }) => ({
    hook: useStringKnob,
    name: propName,
    initialValue: _.capitalize(`${faker.name.firstName()} ${faker.name.lastName()}`),
  }),
};

export const Box: KnobComponentGenerators<BoxProps> = {
  // TODO: fix support for boxes
  children: () => null,
};

export const Input: KnobComponentGenerators<InputProps> = {
  children: () => null,
};
export const Datepicker: KnobComponentGenerators<DatepickerProps> = {
  calendar: () => null,
};

export const Card: KnobComponentGenerators<CardProps> = {
  children: () => {
    const name = `${faker.name.firstName()} ${faker.name.lastName()}`;
    const jobTitle = faker.name.jobTitle();
    const content = faker.lorem.paragraph();

    return {
      name: null,
      hook: () => [
        [
          <_CardHeader key="header">
            <_Flex gap="gap.small">
              <_Avatar
                image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobertTolbert.jpg"
                label={jobTitle}
                name={name}
                status="unknown"
              />
              <_Flex column>
                <_Text content={name} weight="bold" />
                <_Text content={jobTitle} size="small" />
              </_Flex>
            </_Flex>
          </_CardHeader>,
          <_CardBody key="body">{content}</_CardBody>,
        ],
      ],
    };
  },
  // disable horizontal as it requires different layout
  horizontal: () => null,
};

export const Dialog: KnobComponentGenerators<DialogProps> = {
  footer: () => null,
};

export const Divider: KnobComponentGenerators<DividerProps> = {
  // Workaround for `Divider` component that supports size in different way
  size: number,
};

export const Embed: KnobComponentGenerators<EmbedProps> = {
  placeholder: ({ componentInfo, propName }) => ({
    hook: useStringKnob,
    name: propName,
    initialValue:
      'https://fabricweb.azureedge.net/fabric-website/assets/images/2020_MSFT_Icon_Celebration_placeholder.jpg',
  }),
  // Hack until `size` prop will not supported
  variables: () => ({
    hook: () => [{ width: '480px' }],
    name: 'variables',
  }),
};

export const Image: KnobComponentGenerators<ImageProps> = {
  src: ({ propName }) => ({
    hook: useStringKnob,
    name: propName,
    initialValue: faker.image.avatar(),
  }),
};

export const Alert: KnobComponentGenerators<AlertProps> = {
  visible: ({ propName }) => ({
    hook: useBooleanKnob,
    name: propName,
    initialValue: true,
  }),
};

export const Video: KnobComponentGenerators<VideoProps> = {
  poster: ({ componentInfo, propName }) => ({
    hook: useStringKnob,
    name: propName,
    initialValue:
      'https://fabricweb.azureedge.net/fabric-website/assets/images/2020_MSFT_Icon_Celebration_placeholder.jpg',
  }),
  src: ({ propName }) => ({
    hook: useStringKnob,
    name: propName,
    initialValue: 'https://fabricweb.azureedge.net/fabric-website/assets/videos/2020_MSFT_Icon_Celebration.mp4',
  }),
  // Hack until `size` prop will not supported
  variables: () => ({
    hook: () => [{ height: '300px', width: '720px' }],
    name: 'variables',
  }),
};
