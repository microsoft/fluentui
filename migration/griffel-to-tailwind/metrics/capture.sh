#!/usr/bin/env bash
# Metrics capture — run identically for baseline and after legs (DECISIONS.md D10).
# Usage: bash migration/griffel-to-tailwind/metrics/capture.sh <outdir-name>
#   e.g. capture.sh baseline   -> migration/griffel-to-tailwind/metrics/baseline/
# MUST run from repo root with a clean, fully-committed working tree.
# Do NOT run yarn install, other builds, or heavy processes concurrently — timings skew.
set -uo pipefail

LEG="${1:?usage: capture.sh <outdir-name>}"
ROOT="$(pwd)"
OUT="$ROOT/migration/griffel-to-tailwind/metrics/$LEG"
mkdir -p "$OUT"

log() { echo "[capture] $*"; }

# ── environment fingerprint ────────────────────────────────────────────────────
{
  echo "date: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  echo "commit: $(git rev-parse HEAD)"
  echo "branch: $(git rev-parse --abbrev-ref HEAD)"
  echo "node: $(node --version)"
  echo "yarn: $(yarn --version)"
  echo "os: $(uname -a)"
  echo "cpus: $(node -p 'os.cpus().length' 2>/dev/null || echo '?')"
} > "$OUT/env.txt"
log "env recorded"

# ── build time: full vNext build, cold (skip nx cache) ────────────────────────
log "building tag:vNext (cold)..."
START=$(date +%s)
yarn nx run-many -t build --projects=tag:vNext --skip-nx-cache --parallel=3 \
  > "$OUT/build-vnext.log" 2>&1
BUILD_EXIT=$?
END=$(date +%s)
{
  echo "elapsed_seconds: $((END - START))"
  echo "exit_code: $BUILD_EXIT"
  echo "parallel: 3"
  echo "command: nx run-many -t build --projects=tag:vNext --skip-nx-cache --parallel=3"
} > "$OUT/build-time.txt"
log "vNext build: $((END - START))s exit=$BUILD_EXIT"

# Griffel AOT footprint in the build log (62 pkgs / 277 files at baseline; 0 after)
grep -o 'Processing griffel AOT with babel: [0-9]* files' "$OUT/build-vnext.log" \
  | sort | uniq -c > "$OUT/griffel-aot.txt" || true
AOT_PKGS=$(wc -l < "$OUT/griffel-aot.txt" | tr -d ' ')
log "griffel AOT packages in log: $AOT_PKGS"

# ── build output size: shipped lib/ JS + emitted CSS across react-components ──
node -e "
const fs=require('fs'),path=require('path');
const base='packages/react-components';
const out={perPackage:{},totals:{libJsBytes:0,stylesJsBytes:0,stylesRawJsBytes:0,cssBytes:0,files:0}};
for(const pkg of fs.readdirSync(base)){
  for(const sub of ['library','']){
    const lib=path.join(base,pkg,sub,'lib');
    if(!fs.existsSync(lib))continue;
    const p={libJsBytes:0,stylesJsBytes:0,stylesRawJsBytes:0,cssBytes:0,files:0};
    const walk=d=>{for(const e of fs.readdirSync(d,{withFileTypes:true})){
      const f=path.join(d,e.name);
      if(e.isDirectory()){walk(f);continue}
      const sz=fs.statSync(f).size;
      if(e.name.endsWith('.js')){p.libJsBytes+=sz;p.files++;
        if(e.name.endsWith('.styles.raw.js'))p.stylesRawJsBytes+=sz;
        else if(e.name.endsWith('.styles.js'))p.stylesJsBytes+=sz;}
      if(e.name.endsWith('.css'))p.cssBytes+=sz;
    }};
    walk(lib);
    // dist/styles.css (post-migration shipping artifact)
    const distCss=path.join(base,pkg,sub,'dist','styles.css');
    if(fs.existsSync(distCss))p.cssBytes+=fs.statSync(distCss).size;
    out.perPackage[pkg]=p;
    for(const k of Object.keys(out.totals))out.totals[k]+=p[k];
    break;
  }
}
fs.writeFileSync(process.argv[1],JSON.stringify(out,null,2));
console.log('lib JS total:',out.totals.libJsBytes,'styles.js:',out.totals.stylesJsBytes,'styles.raw.js:',out.totals.stylesRawJsBytes,'css:',out.totals.cssBytes);
" "$OUT/lib-sizes.json"
log "lib sizes recorded"

# ── bundle size (monosize) for tracked packages ───────────────────────────────
# Primary metric: combined JS+CSS min+gzip (never subtract gzips — D10).
for PKG in react-divider react-badge react-button react-components; do
  log "monosize: $PKG..."
  yarn nx run "$PKG:bundle-size" --skip-nx-cache >> "$OUT/monosize.log" 2>&1
  for CAND in "packages/react-components/$PKG/library/dist/bundle-size/monosize.json" \
              "packages/react-components/$PKG/dist/bundle-size/monosize.json"; do
    if [ -f "$CAND" ]; then cp "$CAND" "$OUT/monosize-$PKG.json"; break; fi
  done
done
log "monosize done"

# ── npm install size (packed tarball) ─────────────────────────────────────────
for PKG in react-divider react-badge react-button; do
  ( cd "packages/react-components/$PKG/library" && \
    npm pack --dry-run --json 2>/dev/null | node -e "
      let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{
        try{const j=JSON.parse(d)[0];console.log(JSON.stringify({name:j.name,files:j.entryCount,packedBytes:j.size,unpackedBytes:j.unpackedSize},null,2))}catch(e){console.log('{}')}
      })" > "$OUT/npm-pack-$PKG.json" )
done
log "npm pack sizes done"

# ── storybook client bundle: VR storybook static build (cold) ─────────────────
log "building vr-tests storybook (cold)..."
START=$(date +%s)
yarn nx run vr-tests-react-components:build-storybook --skip-nx-cache \
  > "$OUT/storybook-build.log" 2>&1
SB_EXIT=$?
END=$(date +%s)
SB_DIR="apps/vr-tests-react-components/dist/storybook"
SB_BYTES=$(node -p "const fs=require('fs'),p=require('path');let t=0;const w=d=>{for(const e of fs.readdirSync(d,{withFileTypes:true})){const f=p.join(d,e.name);e.isDirectory()?w(f):t+=fs.statSync(f).size}};try{w('$SB_DIR');t}catch(e){-1}")
{
  echo "elapsed_seconds: $((END - START))"
  echo "exit_code: $SB_EXIT"
  echo "dist_bytes: $SB_BYTES"
  echo "command: nx run vr-tests-react-components:build-storybook --skip-nx-cache"
} > "$OUT/storybook-build.txt"
log "storybook build: $((END - START))s exit=$SB_EXIT bytes=$SB_BYTES"

log "ALL DONE -> $OUT"
