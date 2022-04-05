import { Octokit } from '@octokit/rest';
import { repoDetails, github } from './init';
import { IRelease } from './types';

/**
 * Gets all releases from github.
 * @param tags - If provided, only get the releases for these tags (it's okay if a tag
 * doesn't have a release yet). Otherwise get all the releases.
 */
export async function getReleases(tags?: string[]): Promise<Map<string, IRelease>> {
  const releases = new Map<string, IRelease>();

  if (tags) {
    // Only get a subset of releases
    console.log('Getting releases for tags:');
    console.log(tags.map(tag => `  ${tag}\n`).join(''));

    for (const tag of tags) {
      try {
        const release = (await github.repos.getReleaseByTag({ ...repoDetails, tag })).data;
        releases.set(release.tag_name, { id: release.id, tagName: release.tag_name });
      } catch (err) {
        if (err.status === 404) {
          // This tag probably isn't released yet, which is fine in this context
          console.warn('Tag not yet released: ' + tag);
        } else {
          throw new Error(`Could not get release for tag ${tag} from github.\n${err}`);
        }
      }
    }
  } else {
    // Get all the releases
    console.log('Getting all releases...');
    try {
      const res: Octokit.ReposListReleasesResponseItem[] = await github.paginate(
        github.repos.listReleases.endpoint.merge(repoDetails),
      );

      res.forEach(release => {
        releases.set(release.tag_name, { id: release.id, tagName: release.tag_name });
      });
    } catch (err) {
      throw new Error('Could not get releases from github.\n' + err);
    }
  }

  console.log(`Found ${releases.size}${tags ? ' recent' : ''} releases on github.\n`);

  return releases;
}
