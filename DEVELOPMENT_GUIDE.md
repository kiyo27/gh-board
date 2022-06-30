# 開発用 Document

アプリを起動する

```
node bin/gh-board.js --up
```

イメージを更新する

```
export CR_PAT=<access token>
echo $CR_PAT | docker login ghcr.io -u kiyo27 --password-stdin
docker build -t gh-board:0.1.1-beta .
docker tag gh-board:0.1.1-beta ghcr.io/kiyo27/gh-board:latest
docker push ghcr.io/kiyo27/gh-board:latest
```
