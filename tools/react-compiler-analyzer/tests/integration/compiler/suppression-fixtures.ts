export const protectionComponent = `import { useState } from 'react';
export function Component({ value }) {
  const [count] = useState(0);
  return <output>{value + count}</output>;
}
export function OptedIn({ value }) {
  "use memo";
  return <output>{value + 1}</output>;
}
`;

export const suppressionProtectionFixtures = [
  {
    id: 'whole-file-with-import-and-two-candidates',
    source:
      '/* eslint-disable react-hooks/exhaustive-deps -- synthetic reviewed suppression */\n' + protectionComponent,
  },
  {
    id: 'range',
    source:
      '/* eslint-disable react-hooks/rules-of-hooks */\n' +
      protectionComponent +
      '/* eslint-enable react-hooks/rules-of-hooks */\n',
  },
  {
    id: 'next-line',
    source: protectionComponent.replace(
      'export function Component',
      '// eslint-disable-next-line react-hooks/exhaustive-deps -- keep target\nexport function Component',
    ),
  },
  {
    id: 'same-line',
    source: protectionComponent.replace(
      'return <output>{value + count}</output>;',
      'return <output>{value + count}</output>; // eslint-disable-line react-hooks/rules-of-hooks',
    ),
  },
  {
    id: 'all-rules-whole-file',
    source: '/* eslint-disable -- synthetic all-rules suppression */\n' + protectionComponent,
  },
  {
    id: 'all-rules-next-line',
    source: '// eslint-disable-next-line -- synthetic all-rules suppression\n' + protectionComponent,
  },
  {
    id: 'mixed-rules',
    source: '/* eslint-disable no-console, react-hooks/exhaustive-deps */\n' + protectionComponent,
  },
  {
    id: 'client-prologue',
    source: '"use client";\n/* eslint-disable react-hooks/exhaustive-deps */\n' + protectionComponent,
  },
] as const;
