# export template="import * as React from 'react'\nimport { TeamsSvgIconSpec } from '../types'\n\nexport default (\n  SVG\n) as TeamsSvgIconSpec\n"
export template="import * as React from 'react'\nimport { TeamsSvgIconSpec } from '../types'\n\nexport default {\nicon:({classes}) => (\n  SVG\n),\nstyles:{},\n} as TeamsSvgIconSpec"

mkdir SVGs
mkdir SVGs/non-standard
mkdir OptimizedSVGs

for svg in $(ls *.html); do
  # CREATE NEW FILES FOR .svg AND .tsx VERSIONS
  SvgFileName=${svg/\.html/.svg}
  echo "New .svg file name will be: $SvgFileName"
  TsxFileName=${svg/\.html/.tsx}
  echo "New .tsx file name will be: $TsxFileName"

  # RUN SVG THROUGH SVGO TO OPTIMIZE
  svgo $svg -o $SvgFileName --pretty --indent=2 --enable={removeXMLNS,removeDoctype,removeTitle,removeUnusedNS,removeUselessDefs,removeComments,removeEditorsNSData}
  echo "SVGO just optimized the SVG and saved to $SvgFileName"

  # TURN SVG INTO TSX FORMAT
  echo -e "${template/SVG/$(cat $SvgFileName)}" > $TsxFileName;
  echo "Created $TsxFileName for templatized new SVG"

  # REPLACE STANDARD VIEWBOX WITH NEW VIEWBOX
  sed -i 's/viewBox=\"0 0 32 32\"/viewBox=\"8 8 16 16\"/g' $TsxFileName
  echo "Replaced the viewBox for $TsxFileName"

  # REPLACE SVG CLASS WTIH CLASSNAME & REPLACE OTHER CLASSES NOT USED WITH ''
  sed -i -E 's/(<svg.*)class=\"([^"]*)\"/\1className={classes.svg}/' $TsxFileName
  sed -i -E 's/\s*icons-default-fill\s*//g' $TsxFileName

  # REPLACE FILLED/UNFILLED CLASSES
  sed -i 's/class=\"icons-unfilled\"/className={cx(teamsIconClassNames.outline, classes.outlinePart)}/g' $TsxFileName
  sed -i 's/class=\"icons-filled\"/className={cx(teamsIconClassNames.filled, classes.filledPart)}/g' $TsxFileName
  echo "Replace unfilled/filled classes with tsx appropriate className"

  # REPLACE DEFAULT FILL CLASS WTIH ''
  sed -i -E 's/\s*class=\"\s*\"//g' $TsxFileName

  # ADD FOCUSABLE IF NOT THERE
  if grep "focusable=\"false\"" $TsxFileName; then
    echo "Found focusable=false in $TsxFileName"
  else
    echo "No focusable=false found. Adding to $TsxFileName"
    sed -i -E 's/(<svg)\s(.*>)/\1 focusable=\"false\" \2/' $TsxFileName
  fi

  # ADD ROLE IF NOT THERE
  if grep "role=\"presentation\"" $TsxFileName; then
    echo "Found role=presentation in $TsxFileName"
  else
    echo "No role=presentation found. Adding to $TsxFileName"
    sed -i -E 's/(<svg)\s(.*>)/\1 role=\"presentation\" \2/' $TsxFileName
  fi

  # MOVE TSX FILE TO NEW FOLDER
  if grep "viewBox=\"0 0 32 32\"" $SvgFileName; then
    echo "found in $SvgFileName"
    mv $TsxFileName ./SVGs;
  else
    echo "not found in $SvgFileName"
    mv $TsxFileName ./SVGs/non-standard;
  fi

  # MOVE SVG FILE TO NEW FOLDER
  mv $SvgFileName ./OptimizedSVGs
  echo "Moved $SvgFileName to OptimizedSVGs folder"
done
