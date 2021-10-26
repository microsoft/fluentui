import * as React from 'react';
import { Label } from '../index'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-beta

export const Required = () => (
  <>
    <Label required>Required label</Label>
    <Label required="***">Required label</Label>
  </>
);
