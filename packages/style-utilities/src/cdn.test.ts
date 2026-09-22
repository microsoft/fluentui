import { FLUENT_CDN_BASE_URL } from './cdn';

it('generates the CDN default from the metadata fixture', () => {
  const metadata = jest.requireActual(
    '../../react-file-type-icons/scripts/fixtures/react-icons-file-type/metadata.json',
  );
  expect(FLUENT_CDN_BASE_URL).toBe(metadata.cdnBaseUrl);
});
