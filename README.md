# bitcoin2mongodb-node
**bitcoin2mongodb for [NodeJS]**

**Mode**:
- [] full;
- [].

## Launching

### in [Docker]
```bash
cd docker
docker-compose up -d
```


### in local host
**First console window**
```bash
./scripts/bitcoind.sh
```

**Second console window**
```bash
./bin/bitcoin2mongodb
```

**Third console window**
```bash
./scripts/bitcoin-cli.sh getblockchaininfo
#{
#  "chain": "regtest",
#  "blocks": 0,
#  "headers": 0,
#  ...
#}

BTC_ADDRESS_1=$(./scripts/bitcoin-cli.sh getnewaddress "addres_1" "legacy")
echo BTC_ADDRESS_1=$BTC_ADDRESS_1
#BTC_ADDRESS_1=mzepYrzuDJmciy7SFLSzER2krt9wRMeAi5

BTC_ADDRESS_2=$(./scripts/bitcoin-cli.sh getnewaddress "addres_2" "legacy")
echo BTC_ADDRESS_2=$BTC_ADDRESS_2
#BTC_ADDRESS_2=mpXPdXuwTQvfzd8DFUbeKiUrkASobNSfPy

./scripts/bitcoin-cli.sh generatetoaddress 101 $BTC_ADDRESS_1 100
#[
#  "077b33746ea628d2e5f9a3f997580fd5c27668b4e97172f6532784d76e6f8450",
#  "6a74a8afb6f1850bed77acd8a49790702a3889138882c91bddd0593799985807",
#  ...
#]

./scripts/bitcoin-cli.sh sendtoaddress $BTC_ADDRESS_2 10.12345678
#67d22a3643805dbfdcddace6e0cc576367e92288223ac562e975bc201df9f729

./scripts/bitcoin-cli.sh generatetoaddress 1 $BTC_ADDRESS_1 100
#[
#  "43860d7e1353f6ea0b5d44d7eae9c6570e0d5986fa4592f84c3bdbcf86923006"
#]
```


[NodeJS]: https://nodejs.org/ "NodeJS"
[Docker]: https://docker.com/ "Docker"
