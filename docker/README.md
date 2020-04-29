### Container Directory structure
```
/data - data-dir (path for production)
/node_modules (replaced for production )
/app
  /bin
  /data - data-dir (default path, for development)
  /src
```


### Building
```bash
#TAG=0.1.0

#docker build --no-cache --tag ivannikovdev/bitcoin2mongodb:v$TAG .
docker build --no-cache --tag ivannikovdev/bitcoin2mongodb:latest .
#docker tag ivannikovdev/bitcoin2mongodb:v$TAG ivannikovdev/bitcoin2mongodb:latest
#docker push ivannikovdev/bitcoin2mongodb:v$TAG
docker push ivannikovdev/bitcoin2mongodb:latest
```


### Publishing
```bash
docker push ivannikovdev/bitcoin2mongodb:latest
```
