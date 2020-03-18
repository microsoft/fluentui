import * as React from 'react';
import { Button, Popup } from '@fluentui/react-northstar';

const PopupExample = () => <Popup trigger={<Button icon="more" title="Show popup" />} content="Hello from popup!" />;

export default PopupExample;
