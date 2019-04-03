// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { sum } from './placeholder';

describe('placholder', () => {
  it('adds two numbers', () => {
    expect(sum(1, 2)).toEqual(3);
  });
});
