### 「Web用語ナビゲータアプリケーションの設計・開発」
このブランチ(main-js)は機能開発モデルとしてJavascriptのみでコーディングされたもので、TypeScriptとの比較学習用に保管しています。<br>
本番開発はMainブランチのTypeScript版を使う様にしてください。

#### 第１フェーズ(機能面開発モデル）


- 仕様・機能概要
- 本納品物および実装方法 
---
### 仕様・機能概要

 1. [完了]FHIR仕様のCodeSystemリソース（JSONファイル）のファイルの選択
> Webサーバ上の特定のパスで指定されるフォルダ内の格納されている複数のFHIR仕様のCodeSystemリソース（JSONファイル）のファイル名を一覧表示し、そこからひとつのファイルを選択する。

 2. [完了]FHIR仕様のCodeSystemリソース（JSONファイル）の読み込み
 > FHIR仕様のCodeSystemリソース（JSONファイル）をオンメモリーで内部に展開する。ファイルの最大サイズの目安は４０MB程度を想定、同時にはひとつのCodeSystemリソースを対象とする。
メモリー上での構造は、以降の作業がスムーズに実行できる構造とする。なお、必要であれば、ローカルデータベースファイル（[SQLite](https://www.sqlite.org/index.html)）やインデックス構造情報を併用しても構わない。RDBサーバを別途構築して利用する方式をとらないこと。

3. [完了]コンセプトツリー・ナビゲーション
> Web画面の左側をコンセプトツリー・ナビゲーションエリアとし、CodeSystemリソースのコンセプト階層を、ツリー構造で表示して、階層構造をブラウズできるものとする。表示方法の参考として、[ICD-11 for Mortality and Morbidity Statistics](https://icd.who.int/browse11/l-m/en#/http%3a%2f%2fid.who.int%2ficd%2fentity%2f944754984)や[IPS terminology Browser](https://ips-browser.snomedtools.org/?perspective=full&conceptId1=404684003&edition=MAIN/2023-07-31&release=&languages=en)のツリー表示を参考にすること。

4. [完了]コンセプト検索によるポイント選択（階層からの特定のコンセプトの選択）
> コンセプトツリー・ナビゲーションエリアの上部に検索文字列ウインドウを設置し、そこに入力した文字列から、コンセプトツリーをツリー階層文字列（展開していない階層文字列を含む）から部分一致検索し、該当するヒット候補を別ウインドウでリスト表示し、そこからポイント箇所を選択して、ポイント選択できる。

5. [完了]コンセプト属性検索によるポイント選択（階層からの特定のコンセプトの選択）
前項目での検索ウインドウとは別に、属性検索文字列ウインドウを呼び出し、そこに入力した文字列から、（コンセプトツリー・ナビゲーションエリアに表示されることのない）個々のコンセプト属性を部分一致検索し、該当するヒット候補を別ウインドウでリスト表示し、そこからポイント箇所を選択して、ポイント選択できる。該当するヒット候補を別ウインドウでリスト表示し、そこからポイント箇所を選択して、ポイント選択できる。

6. [完了]画面の右側をコンセプト属性表示エリアとし、このエリアに選択コンセプトの属性を表示する。表示する属性は以下のものとする。　　
参考：https://hl7.org/fhir/R4/codesystem.html

#### 開発条件
> 本アプリケーション開発では以下の要件を満たすこと。
・Webアプリケーションは、JavaScriptかTypeScriptを使用して、インタラクティブに動作するものとし、複数の利用者が同時に利用しても、利用者間での干渉がないように開発するものとする。
・Webアプリケーションの運用にあたって、利用料が発生するライブラリを原則として利用しないこと。
・WebサーバはLinux系OS上での、DockerまたはPodmanコンテナアプリケーションとして稼働させることができるものとして開発する。
・開発は受注者が用意する開発環境、ハードウエアで行うものとする。ただし、テストするLinux系OS環境は発注者がクラウドサービス上のものを提供するので、納品物がそのサーバ環境で動作するように整備すること。

##### 会議体での協議要件
> 発注者との開発検討会議を週１回、日程調整の上で対面またはZOOMにより開催し、設計開発に関する検討・協議を行うこと。

#### 作業期間
> 受託日から2024年3月29日

#### 納品物
> 開発したソフトウエアシステム　一式（ソースプログラムコード、実行形式プログラム、稼働に必要な各種設定ファイルを含む）

#### 完成度について
> 作業期間が短いことから、仕様のうち、1）2）3）6）が提供されたサンプルのCodeSystemファイルについて、大まかに動作すればよい。
4）5）の検索機能はフェーズ2で開発することでも構わない。ただし、これらの検索が高速に実現できるように、2）のメモリー展開構造（またはローカルデータベースファイルやインデックス構造）を設計しておくこと。
以下についてはフェーズ2の納品時に納品するものとしてフェーズ2で発注する。
・要件定義書、設計書、詳細設計書などの文書データ
・Webアプリケーション操作説明書データ
・コンテナ構築のためのyamlファイルなど環境設定ファイル。

### 納期
> 2024年3月29日：完了日時2024年3月29日

### 発注者
> 非営利共益法人　[健康医療情報標準流通基盤技術研究組合] 

---
### 本納品物および実装方法 

#### Docker仮想コンテナでのビルド方法
Docker仮想コンテナ上にプロジェクトをビルドします。
この仮想コンテナにはNode.js実行環境（[Docker Node image](https://hub.docker.com/_/node/)）が必要です。
以下のコマンドで確認して入ってない場合はインストールしてください。
 ```bash
> node -v
v20.11.0
※本説明ではこのバージョンですが、v18以後であれば動作すると思われます
```

利用するにはあらかじめ[Docker](https://www.docker.com/)利用環境がインストールされている必要があります。  

Linuxでは、「docker-comporse（ハイフン繋がり）」コマンドを「docker comporse（スペース区切り）」と読み替える必要がある場合があります。

1. リポジトリのクローンを取得
```bash
> git clone https://github.com/msis-net/Web-Terminology-Navigation.git
```

2. プロジェクトのDockerコンテナの作成と起動
```bash
> cd .\Web-Terminology-Navigation\
(Linux/mac)$ docker compose up --build -d
(Win)$ docker-compose up --build -d
```

3. 作成したDocker仮想コンテナのIDを確認しコンテナに入る
```bash
コンテナIDを確認
> docker ps -a
CONTAINER ID   IMAGE                             COMMAND                   CREATED         STATUS         PORTS                    NAMES
807fcaf84d83   web-terminology-navigation-hook   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:5678->5678/tcp   web-terminology-navigation-hook-1
...

コンテナIDを使ってコンテナに入る
CONTAINER IDを使う場合
> docker exec -it 807fcaf84d83 bash
または
NAMESを使う場合
> docker exec -it web-terminology-navigation-hook-1 bash

コンテナに入るとプロンプトは下記の様な状態になります。
root@807fcaf84d83:/app#
```
4. （コンテナ内での作業）Next.jsのインストールとベースプロジェクトのビルド
```bash
依存パッケージをインストールします.
> npm ci
完了までしばらく待機します。

サンプルファイルを解凍します。
c# unzip /app/public/tmpdata.zip 
Archive:  tmpdata.zip
  inflating: tmpdata/CodeSystem-hl7-v3-ActCode-cs.json
  inflating: tmpdata/CodeSystem-jp-jfagy-food-allergen-cs.json
  inflating: tmpdata/CodeSystem-us-loinc-BIG.json
  inflating: tmpdata/CodeSystem-us-loinc-cs.json
  inflating: tmpdata/CodeSystem-us-loinc-MIN.json
  inflating: tmpdata/comment_20xx.csv  
  inflating: tmpdata/tensu_20xx.csv
  inflating: tmpdata/test.json
※これらは動作確認でテスト用につかうサンプルデータファイルです。容量が大きいものもあるので圧縮しています。

```

5. サーバー起動テストを行います。(コンテナ内)
```bash
> app@0.0.1 dev
> astro dev

▶ Astro collects anonymous usage data.
  This information helps us improve Astro.
  Run "astro telemetry disable" to opt-out.
  https://astro.build/telemetry

19:21:49 [vite] Forced re-optimization of dependencies

 astro  v4.4.13 ready in 15183 ms

┃ Local    http://localhost:5678/
┃ Network  http://172.25.0.2:5678/

19:21:49 watching for file changes...

- このような表示が出たら起動できています。
- http://localhost:5678へ接続してページが表示される事を確認
- 確認できたら「ctrl」+「C」でサーバーを一旦停止してください。
- サーバを停止できたら「exit」コマンドでコンテナから出ます。
root@807fcaf84d83:/app# exit

```

6. Docker仮想コンテナ起動時に同時に開始するように設定(コンテナ外)

```bash
コンテナから出る
root@807fcaf84d83:/app# exit

- docker-compose.ymlの内容を一部修正
#command: /bin/sh -c 'npm run dev'
↓
command: /bin/sh -c 'npm run dev' 
これでDockerの起動と同時にサーバーも起動するようになります。
```
7. 起動確認：仮想コンテナをデーモンモード(-d)で起動(コンテナ外)
```bash
先に６で変更した内容を更新して動作確認まで行います。
-一旦dockerコンテナを停止します。
> docker-compose up --build
web-terminology-navigation-hook-1  | 
web-terminology-navigation-hook-1  | > app@0.0.1 dev
web-terminology-navigation-hook-1  | > astro dev
web-terminology-navigation-hook-1  |
web-terminology-navigation-hook-1  | 
web-terminology-navigation-hook-1  |  astro  v4.4.13 ready in 12943 ms
web-terminology-navigation-hook-1  |
web-terminology-navigation-hook-1  | ┃ Local    http://localhost:5678/
web-terminology-navigation-hook-1  | ┃ Network  http://172.25.0.2:5678/
web-terminology-navigation-hook-1  |
web-terminology-navigation-hook-1  | 19:36:26 watching for file changes...
web-terminology-navigation-hook-1  | 19:36:39 [200] / 18ms

-この様な表示になったらDockerの設定によってサーバは起動しています。ブラウザで確認してください。
-「Ctl」+「C」で一旦dockerコンテナを停止します。
- 次に下記のコマンドでDockerコンテナを起動します。
> docker-compose up -d
[+] Building 0.0s (0/0)
[+] Running 1/1
 ✔ Container web-terminology-navigation-hook-1 Started                                                                                             
 - http://localhost:5678/へ接続してページが表示される事を確認
 ※起動後は接続できるようになるまで、しばらく待つ必要があります。

```


8. 以後の管理
```bash
以後はDockerコンテナ下記の要領で取り扱います。
起動：docker-compose start
停止：docker-compose stop
再起動：docker-compose restart
注意；ocker-compose down (これを実行するとコンテナが削除されます。２の手順からやり直す必要があります。)
```
