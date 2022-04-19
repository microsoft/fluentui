import * as React from 'react';
import { Button, Tooltip, Text } from '@fluentui/react-northstar';

const TooltipExampleRtl = () => (
  <Tooltip
    pointing
    position="before"
    trigger={<Button content="ا يجلبه إلينا الأس" />}
    content={
      <>
        <Text as="div">English text!</Text>
        <Text as="div">
          ينا الألم. في بعض الأحيان ونظراً للالتزامات التي يفرضها علينا الواجب والعمل سنتنازل غالباً ونرفض الشعور
        </Text>
      </>
    }
  />
);

export default TooltipExampleRtl;
