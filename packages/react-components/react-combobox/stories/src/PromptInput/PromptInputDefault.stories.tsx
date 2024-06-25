import * as React from 'react';
import { PromptInput, PromptInputProps, Option } from '@fluentui/react-combobox';
import { CopilotProvider } from '@fluentui-copilot/react-copilot';
import { Button } from '@fluentui/react-button';
import { Divider } from '@fluentui/react-divider';
import { Image } from '@fluentui/react-image';
import { Add20Regular, Attach20Regular } from '@fluentui/react-icons';

const media = (
  <Image
    alt="DOCX file type"
    height={20}
    src="https://res-2-sdf.cdn.office.net/files/fabric-cdn-prod_20240411.001/assets/brand-icons/product/svg/copilot_24x1.svg"
    width={20}
  />
);

const options = ['Cat', 'Dog', 'Ferret', 'Fish', 'Hamster', 'Snake'];
export const Default = (props: Partial<PromptInputProps>) => (
  <CopilotProvider style={{ maxWidth: '300px' }}>
    <PromptInput
      placeholderValue="adlkjfalskdfjalskdjfalksdjfalksjdflaksjdflaksjdflaksjdflaksjdflaskdjfalsdkjfalskdfj"
      defaultValue="adlkjfalskdfjalskdjfalksdjfalksjdflaksjdflaksjdflaksjdflaksjdflaskdjfalsdkjfalskdfj"
      media={media}
      actions={
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <Button size="small" aria-label="attach" appearance="transparent" icon={<Add20Regular />} />
          <Button size="small" aria-label="attach" appearance="transparent" icon={<Attach20Regular />} />
          <Divider style={{ margin: '0 4px' }} vertical />
        </span>
      }
    >
      {options.map(option => (
        <Option key={option} disabled={option === 'Ferret'}>
          {option}
        </Option>
      ))}
    </PromptInput>
  </CopilotProvider>
);
