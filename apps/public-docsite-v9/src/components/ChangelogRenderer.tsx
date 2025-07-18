import * as React from 'react';

interface ChangelogRendererProps {
  changelog: string;
}

interface ParsedVersion {
  version: string;
  url: string;
  date: string;
  content: string;
  isFeature: boolean;
}

interface FeatureRelease {
  version: string;
  url: string;
  date: string;
  content: string;
  patches: ParsedVersion[];
  features: string[];
  bugFixes: string[];
}

export const ChangelogRenderer: React.FC<ChangelogRendererProps> = ({ changelog }) => {
  const parseChangelog = (content: string): FeatureRelease[] => {
    const lines = content.split('\n');
    const versions: ParsedVersion[] = [];
    let currentVersion: ParsedVersion | null = null;
    let currentContent: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Match version headers like "## [9.67.0](https://github.com/microsoft/fluentui/tree/@fluentui/react-components_v9.67.0)"
      const versionMatch = line.match(/^## \[(\d+\.\d+\.\d+)\]\((.*?)\)$/);

      if (versionMatch) {
        // Save previous version if exists
        if (currentVersion) {
          currentVersion.content = currentContent.join('\n');
          versions.push(currentVersion);
        }

        const [, version, url] = versionMatch;
        const versionParts = version.split('.').map(Number);
        const [, , patch] = versionParts;
        const isFeature = patch === 0; // Feature releases are x.y.0

        currentVersion = {
          version,
          url,
          date: '',
          content: '',
          isFeature,
        };
        currentContent = [];

        // Look for date in the next few lines
        for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
          const nextLine = lines[j];
          const dateMatch = nextLine.match(/^([A-Z][a-z]{2}, \d{1,2} [A-Z][a-z]{2} \d{4})/);
          if (dateMatch) {
            currentVersion.date = dateMatch[1];
            break;
          }
        }
      } else if (currentVersion) {
        // Collect all content until we hit the next version
        currentContent.push(line);
      }
    }

    // Don't forget the last version
    if (currentVersion) {
      currentVersion.content = currentContent.join('\n');
      versions.push(currentVersion);
    }

    return groupIntoFeatureReleases(versions);
  };

  const groupIntoFeatureReleases = (versions: ParsedVersion[]): FeatureRelease[] => {
    const featureReleases: FeatureRelease[] = [];

    // Create a map to group versions by major.minor
    const versionGroups = new Map<string, ParsedVersion[]>();

    for (const version of versions) {
      const [major, minor] = version.version.split('.');
      const majorMinor = `${major}.${minor}`;

      if (!versionGroups.has(majorMinor)) {
        versionGroups.set(majorMinor, []);
      }
      versionGroups.get(majorMinor)!.push(version);
    }

    // Convert groups to feature releases
    for (const versionGroup of versionGroups.values()) {
      // Find the feature release (x.y.0) in this group
      const featureVersion = versionGroup.find(v => v.isFeature);

      if (featureVersion) {
        // Get all patch versions (excluding the feature version itself)
        const patches = versionGroup.filter(v => !v.isFeature);

        const featureRelease: FeatureRelease = {
          ...featureVersion,
          patches,
          features: extractFeatures(featureVersion.content),
          bugFixes: [], // Will be populated after features are extracted
        };

        // Extract bug fixes and filter out duplicates with features
        featureRelease.bugFixes = extractBugFixes(featureVersion.content, featureRelease.features);

        featureReleases.push(featureRelease);
      }
    }

    // Sort by version in descending order (newest first)
    featureReleases.sort((a, b) => {
      const aVersion = a.version.split('.').map(Number);
      const bVersion = b.version.split('.').map(Number);

      for (let i = 0; i < 3; i++) {
        if (aVersion[i] !== bVersion[i]) {
          return bVersion[i] - aVersion[i];
        }
      }
      return 0;
    });

    return featureReleases;
  };

  const extractFeatures = (content: string): string[] => {
    const features = new Map<string, { fullDescription: string; packages: string[] }>(); // Map of clean description -> {fullDescription, packages}
    const lines = content.split('\n');
    let inMinorChanges = false;
    let currentPackage = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.trim() === '### Minor changes') {
        inMinorChanges = true;
        continue;
      }
      if (line.startsWith('### ') && line.trim() !== '### Minor changes') {
        inMinorChanges = false;
        continue;
      }

      if (inMinorChanges) {
        // Capture package name
        const packageMatch = line.match(/^- `(@fluentui\/[^`]+)`$/);
        if (packageMatch) {
          currentPackage = packageMatch[1];
          continue;
        }

        // Check if this is a feature description
        const featureMatch = line.match(/^\s+- (.+)$/);
        if (featureMatch) {
          const description = featureMatch[1];
          // Extract just the feature description without PR links and attribution
          const cleanDescription = description.replace(/\s*\([^)]*\)\s*by\s+[^\s]+@[^\s]+/, '').trim();
          if (cleanDescription && currentPackage) {
            if (features.has(cleanDescription)) {
              // Add to existing packages list
              features.get(cleanDescription)!.packages.push(currentPackage);
            } else {
              // First occurrence
              features.set(cleanDescription, {
                fullDescription: cleanDescription,
                packages: [currentPackage],
              });
            }
          }
        }
      }
    }

    // Convert to final format: show package scope only if there's a single package
    return Array.from(features.values()).map(({ fullDescription, packages }) => {
      if (packages.length === 1) {
        return `<strong>${packages[0]}:</strong> ${fullDescription}`;
      } else {
        return fullDescription; // Multiple packages, show clean description
      }
    });
  };

  const extractBugFixes = (content: string, existingFeatures: string[]): string[] => {
    const bugFixes = new Map<string, { fullDescription: string; packages: string[] }>(); // Map of clean description -> {fullDescription, packages}
    const lines = content.split('\n');
    let inPatches = false;
    let currentPackage = '';

    // Create a set of existing feature descriptions (clean versions) for faster lookup
    const existingFeatureDescriptions = new Set(
      existingFeatures.map(feature => {
        // Extract clean description from feature (remove package prefix if present)
        const match = feature.match(/^<strong>@fluentui\/[^:]+:<\/strong>\s*(.+)$/);
        return match ? match[1] : feature;
      }),
    );

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.trim() === '### Patches') {
        inPatches = true;
        continue;
      }
      if (line.startsWith('### ') && line.trim() !== '### Patches') {
        inPatches = false;
        continue;
      }

      if (inPatches) {
        // Capture package name
        const packageMatch = line.match(/^- `(@fluentui\/[^`]+)`$/);
        if (packageMatch) {
          currentPackage = packageMatch[1];
          continue;
        }

        // Check if this is a bug fix description
        const bugFixMatch = line.match(/^\s+- (.+)$/);
        if (bugFixMatch) {
          const description = bugFixMatch[1];
          // Extract just the bug fix description without PR links and attribution
          const cleanDescription = description.replace(/\s*\([^)]*\)\s*by\s+[^\s]+@[^\s]+/, '').trim();

          // Only add if it's not empty, not already in features, and not already in bugFixes
          if (cleanDescription && currentPackage && !existingFeatureDescriptions.has(cleanDescription)) {
            if (bugFixes.has(cleanDescription)) {
              // Add to existing packages list
              bugFixes.get(cleanDescription)!.packages.push(currentPackage);
            } else {
              // First occurrence
              bugFixes.set(cleanDescription, {
                fullDescription: cleanDescription,
                packages: [currentPackage],
              });
            }
          }
        }
      }
    }

    // Convert to final format: show package scope only if there's a single package
    return Array.from(bugFixes.values()).map(({ fullDescription, packages }) => {
      if (packages.length === 1) {
        return `<strong>${packages[0]}:</strong> ${fullDescription}`;
      } else {
        return fullDescription; // Multiple packages, show clean description
      }
    });
  };

  const releases = parseChangelog(changelog);

  /* eslint-disable no-console */
  // Debug: log the number of releases found
  console.log(`Found ${releases.length} feature releases`);
  console.log(
    'Feature versions:',
    releases.map(r => r.version),
  );
  /* eslint-enable no-console */

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      {releases.map(release => (
        <div
          key={release.version}
          style={{ marginBottom: '48px', borderBottom: '1px solid #e1e4e8', paddingBottom: '24px' }}
        >
          {/* Feature version as H2 */}
          <h2
            id={`v${release.version}`}
            style={{
              fontSize: '24px',
              fontWeight: 600,
              marginBottom: '8px',
              color: '#24292f',
            }}
          >
            <a
              href={release.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#0969da',
                textDecoration: 'none',
              }}
            >
              v{release.version}
            </a>
          </h2>

          <p
            style={{
              color: '#656d76',
              marginBottom: '24px',
              fontSize: '14px',
            }}
          >
            {release.date}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: release.bugFixes.length > 0 ? '1fr 1fr' : '1fr',
              gap: '24px',
              marginTop: '24px',
            }}
          >
            {/* Features section */}
            <div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  marginBottom: '12px',
                  color: '#24292f',
                }}
              >
                Features
              </h3>
              {release.features.length > 0 ? (
                <ul
                  style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    fontSize: '14px',
                    lineHeight: '1.5',
                  }}
                >
                  {release.features.slice(0, 8).map((feature: string, index: number) => (
                    <li
                      key={index}
                      style={{
                        marginBottom: '8px',
                        paddingLeft: '16px',
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: '0',
                          color: '#0969da',
                          fontWeight: 'bold',
                        }}
                      >
                        •
                      </span>
                      <span dangerouslySetInnerHTML={{ __html: feature }} />
                    </li>
                  ))}
                  {release.features.length > 8 && (
                    <li style={{ paddingLeft: '16px' }}>
                      <details>
                        <summary
                          style={{
                            cursor: 'pointer',
                            color: '#656d76',
                            fontSize: '14px',
                            fontStyle: 'italic',
                            display: 'list-item',
                            listStylePosition: 'outside',
                          }}
                        >
                          ... and {release.features.length - 8} more features
                        </summary>
                        <ul
                          style={{
                            listStyle: 'none',
                            margin: '8px 0 0 0',
                            padding: 0,
                            fontSize: '14px',
                            lineHeight: '1.5',
                          }}
                        >
                          {release.features.slice(8).map((feature: string, index: number) => (
                            <li
                              key={index + 8}
                              style={{
                                marginBottom: '8px',
                                paddingLeft: '16px',
                                position: 'relative',
                              }}
                            >
                              <span
                                style={{
                                  position: 'absolute',
                                  left: '0',
                                  color: '#0969da',
                                  fontWeight: 'bold',
                                }}
                              >
                                •
                              </span>
                              <span dangerouslySetInnerHTML={{ __html: feature }} />
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  )}
                </ul>
              ) : (
                <p
                  style={{
                    color: '#656d76',
                    fontSize: '14px',
                    fontStyle: 'italic',
                  }}
                >
                  This section will be manually maintained with key features.
                </p>
              )}
            </div>

            {/* Bug fixes section - only render if there are bug fixes */}
            {release.bugFixes.length > 0 && (
              <div>
                <h3
                  style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    marginBottom: '12px',
                    color: '#24292f',
                  }}
                >
                  Bug Fixes
                </h3>
                <ul
                  style={{
                    listStyle: 'none',
                    margin: 0,
                    padding: 0,
                    fontSize: '14px',
                    lineHeight: '1.5',
                  }}
                >
                  {release.bugFixes.slice(0, 8).map((bugFix: string, index: number) => (
                    <li
                      key={index}
                      style={{
                        marginBottom: '8px',
                        paddingLeft: '16px',
                        position: 'relative',
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: '0',
                          color: '#d1242f',
                          fontWeight: 'bold',
                        }}
                      >
                        •
                      </span>
                      <span dangerouslySetInnerHTML={{ __html: bugFix }} />
                    </li>
                  ))}
                  {release.bugFixes.length > 8 && (
                    <li style={{ paddingLeft: '16px' }}>
                      <details>
                        <summary
                          style={{
                            cursor: 'pointer',
                            color: '#656d76',
                            fontSize: '14px',
                            fontStyle: 'italic',
                            display: 'list-item',
                            listStylePosition: 'outside',
                          }}
                        >
                          ... and {release.bugFixes.length - 8} more bug fixes
                        </summary>
                        <ul
                          style={{
                            listStyle: 'none',
                            margin: '8px 0 0 0',
                            padding: 0,
                            fontSize: '14px',
                            lineHeight: '1.5',
                          }}
                        >
                          {release.bugFixes.slice(8).map((bugFix: string, index: number) => (
                            <li
                              key={index + 8}
                              style={{
                                marginBottom: '8px',
                                paddingLeft: '16px',
                                position: 'relative',
                              }}
                            >
                              <span
                                style={{
                                  position: 'absolute',
                                  left: '0',
                                  color: '#d1242f',
                                  fontWeight: 'bold',
                                }}
                              >
                                •
                              </span>
                              <span dangerouslySetInnerHTML={{ __html: bugFix }} />
                            </li>
                          ))}
                        </ul>
                      </details>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Patch versions list */}
          {release.patches.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <p style={{ marginBottom: '8px', fontSize: '14px', color: '#656d76' }}>Patch versions:</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {release.patches.map((patch, index) => (
                  <details key={patch.version} style={{ marginRight: '8px' }}>
                    <summary
                      style={{
                        cursor: 'pointer',
                        color: '#0969da',
                        fontSize: '14px',
                        display: 'list-item',
                        listStylePosition: 'outside',
                        paddingLeft: '4px',
                      }}
                    >
                      {patch.version}
                    </summary>
                    <div
                      style={{
                        marginTop: '8px',
                        padding: '12px',
                        backgroundColor: '#f6f8fa',
                        border: '1px solid #e1e4e8',
                        borderRadius: '6px',
                        fontSize: '12px',
                        lineHeight: '1.4',
                        fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
                        whiteSpace: 'pre-wrap',
                        maxHeight: '300px',
                        overflowY: 'auto',
                      }}
                    >
                      {patch.content}
                      <div style={{ marginTop: '8px', fontSize: '12px', color: '#656d76' }}>
                        <a
                          href={patch.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#0969da', textDecoration: 'none', marginRight: '8px' }}
                        >
                          GitHub Release
                        </a>
                        <a
                          href={`https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-components/CHANGELOG.md#${patch.version.replace(
                            /\./g,
                            '',
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#0969da', textDecoration: 'none' }}
                        >
                          Changelog
                        </a>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
