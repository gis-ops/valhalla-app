#!/bin/bash

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

VALHALLA_OSM=${1:-https:valhalla1.openstreetmap.de}

# Add assignment
echo "window._env_ = {" >> ./env-config.js

echo "SKIP_PREFLIGHT_CHECK: true," >> ./env-config.js
echo "ROOT_ELEMENT: \"erw-root\"," >> ./env-config.js
echo "VALHALLA_OSM: \"${VALHALLA_OSM}\"" >> ./env-config.js

echo "}" >> ./env-config.js
