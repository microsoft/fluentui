import * as React from 'react';
import type { EventData, EventHandler } from '@fluentui/react-utilities';

export type TagAppearance = 'filled' | 'outline' | 'brand';
export type TagShape = 'rounded' | 'circular';
export type TagSize = 'extra-small' | 'small' | 'medium';

export type TagValue = string;

export type TagDismissData<Value = TagValue> = {
  value: Value;
};

export type TagSelectData<Value = TagValue> = EventData<'click', React.MouseEvent<HTMLButtonElement>> & {
  value: Value;
  selectedValues?: Value[];
};

export type TagDismissEvent = React.MouseEvent | React.KeyboardEvent;

export type TagDismissHandler<Value = TagValue> = (e: TagDismissEvent, data: TagDismissData<Value>) => void;

export type TagSelectHandler<Value = TagValue> = EventHandler<TagSelectData<Value>>;
