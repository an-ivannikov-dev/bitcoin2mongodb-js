#!/usr/bin/env bash
set -eo pipefail

mkdir -p data/logs
mkdir -p data/bitcoin
bitcoind \
  -datadir=data/bitcoin \
  -conf=../../scripts/bitcoin.conf \
  $* 
#  &> >(tee &> >(echo `basename "$0 $*"`>>data/logs/bitcoind.sh.log) >>data/logs/bitcoind.sh.log)
