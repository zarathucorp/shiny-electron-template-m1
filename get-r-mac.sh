# Copyright (c) 2018 Dirk Schumacher, Noam Ross, Rich FitzJohn
# Copyright (c) 2023-2024 Jinhwan Kim. All rights reserved.

#!/usr/bin/env bash
set -e

# Download and extract the main Mac Resources directory
# Updated as Sonoma / m1
mkdir -p r-mac
curl -o r-mac/latest_r.pkg \
https://cloud.r-project.org/bin/macosx/big-sur-arm64/base/R-4.3.2-arm64.pkg

# For Old version see below directory and change appropriately
# https://cloud.r-project.org/bin/macosx/big-sur-arm64/base/<...>
#
# Example: For R 4.3.1 Version, use below for line 11.
# https://cloud.r-project.org/bin/macosx/big-sur-arm64/base/R-4.3.1-arm64.pkg
#

cd r-mac
xar -xf latest_r.pkg
rm -r Resources tcltk.pkg texinfo.pkg Distribution latest_r.pkg
# cat R-app.pkg/Payload | gunzip -dc | cpio -i
cat R-fw.pkg/Payload | gunzip -dc | cpio -i
mv R.framework/Versions/Current/Resources/* .
rm -r R-fw.pkg R.framework

# Patch the main R script
sed -i.bak '/^R_HOME_DIR=/d' bin/R
sed -i.bak 's;/Library/Frameworks/R.framework/Resources;${R_HOME};g' \
bin/R
chmod +x bin/R
rm -f bin/R.bak

# Remove unneccessary files
rm -r doc tests
rm -r lib/*.dSYM
