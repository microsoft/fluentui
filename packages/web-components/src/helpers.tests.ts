import qs from 'qs';

/**
 * Returns a formatted URL for a given Storybook fixture.
 *
 * @param id - the Storybook fixture ID
 * @param args - Story args
 * @returns - the local URL for the Storybook fixture iframe
 */
export function fixtureURL(id: string = 'debug--blank', args?: Record<string, any>): string {
  const params: Record<string, any> = { id };
  if (args) {
    params.args = qs
      .stringify(args, {
        allowDots: true,
        delimiter: ';',
        format: 'RFC1738',
        encode: false,
      })
      .replace(/=/g, ':')
      .replace(/\//g, '--');
  }

  const url = qs.stringify(params, {
    addQueryPrefix: true,
    format: 'RFC1738',
    encode: false,
  });

  return url;
}
