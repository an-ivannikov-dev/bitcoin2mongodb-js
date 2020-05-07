#!/usr/bin/env bash
set -eo pipefail

mkdir -p data/logs
mkdir -p data/bitcoin
bitcoin-cli \
  -datadir=data/bitcoin \
  -conf=../../scripts/bitcoin.conf \
  $* 
#  &> >(tee &> >(echo `basename "$0 $*"`>>data/logs/bitcoin-cli.sh.log) >>data/logs/bitcoin-cli.sh.log)
