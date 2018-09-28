# Mcdonald's system

マクドナルド風の呼び出しシステム．

## Installation

1. [Node.js](https://nodejs.org/ja/)をインストール
2. [Git](https://git-scm.com/)をインストール
3. 次のコマンドでPATHが通っていることを確認

	```
	node -v  
	npm -v  
	git --version  
	```

1. 任意のディレクトリに移り，次のコマンドでクローンを作成（ダウンロード）

	```
	git clone https://ssssota@bitbucket.org/ssssota/mcdonals_system.git
	```

5. ディレクトリを移りNPMで必要モジュールをダウンロード

	```
	npm i
	```

## Usage

1. Node.jsで起動

	```
	node index
	```

2. [localhost:8000](http://localhost:8000/)にアクセス
3. Receiptで受付番号と人数を登録
4. Requestで呼出に追加
5. Displayは操作できず表示のみ