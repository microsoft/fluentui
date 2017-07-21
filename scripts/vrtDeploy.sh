#!/bin/bash


for f in packages/office-ui-fabric-react/visualtests/baseline/*; do
  b=$(basename $f)
  echo "Uploading $f as $b"
	curl --ftp-create-dirs -T $f -u $FTP_USER:$FTP_PASSWORD ftp://waws-prod-bay-049.ftp.azurewebsites.windows.net/site/wwwroot/mgodbolt/vrt/$TRAVIS_PULL_REQUEST/$b
done