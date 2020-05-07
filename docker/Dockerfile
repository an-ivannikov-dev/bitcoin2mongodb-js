FROM node:lts

ENV VERSION=${VERSION:-v0.1.0}
    DATA_DIR=/data \
    ENV=production \
    NODE_ENV=production \
    PATH=/app/bin:${PATH}

LABEL name="ivannikovdev/bitcoin2mongodb" version="$VERSION" \
    description="bitcoin2mongodb" \
    maintainer="Aleksandr Ivannikov <dev@an-ivannikov.com>" \
    url="https://github.com/an-ivannikov-dev/bitcoin2mongodb-node"

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production --silent && mv node_modules ../
COPY . .
RUN rm -R docker && mkdir /data

VOLUME ["/data"]

CMD ["bitcoin2mongodb"]
