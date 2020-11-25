#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"

cd $DIR/..

mkdir -p src/vendor/java-parser

rollup -c rollup.config.js

# prepend definition of the "process" var, as this code expects to be run in the Node environment
printf "var process = undefined\n%s" "$(cat src/vendor/java-parser/java-parser.js)" > src/vendor/java-parser/java-parser.js
