import { FLUENT_CDN_BASE_URL } from './cdn';

it('generates the CDN default from the published JSON metadata', () => {
  const metadata = jest.requireActual('@fluentui/react-icons-file-type/metadata.json');
  expect(FLUENT_CDN_BASE_URL).toBe(metadata.cdnBaseUrl);
});
