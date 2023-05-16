# yarn-berry-work
<details>
  <summary>1. 모노레포 설정하기</summary>
  <div markdown="1">

### nvm 설치 
- vscode nvm intergration 익스텐션
- .nvmrc 
  - 특정 플젝에 사용되는 버젼기술, nvm을 통해 플젝마다 상이한 node version을 빠르게 전환
  - 사용하고자하는 노드버젼을 작성
  - 기술된 노드버젼 사용 : `nvm use`
  - 해당 노드버젼이 없을 경우 : `nvm install`설치 후 자동 사용 적용


### yarn berry 버젼 변경
- the most recent stable berry (>=2.0.0) release
  - `yarn set version berry`
  - `yarn set version stable`
  
  
### yarn workspace 패키지 생성
`yarn init -w`

### root package.json
```json
{
  "name": "yarn-berry-work",
  "packageManager": "yarn@3.5.1",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "devDependencies": {
    "typescript": "^5.0.4"
  }
}            
```
- workspaces 
  - apps : 각각의 작업, 서비스
  - packages : 패키지 모듈로 사용할 소스
  
### workspace 상태갱신
- apps에 서비스 설치하기
- apps 하단의 package.json 이름 수정
  - 공통성있게 맞추기 위함 : ex_ @fe/web, @fe/native
- root 에서 `yarn`
  - root `.pnp.cjs`파일에서 app에서 설정한 이름과 동일하게 갱신되는지 확인
- root에서 서비스 실행하기
  - `yarn workspace @fe/web run dev`
  
  
  
### 공통패키지 생성하기
- packages하위 lib 프로젝트 생성 (+typescript설치, tsconfig 설정)
- package.json 생성
  `yarn init`
  동일하게 name 변경 : ex_@fe/lib
- root이동 > 동일하게 `yarn`실행 .pnp.cjs 업데이트


```json
{
  "name": "@fe/lib",
  "version": "1.0.0",
  "private": true,
  "main": "./src/index.ts",
  "depdndencies": {
    "typescript": "^5.0.4"
  }
}
```


### apps에서 packages 의존하기

- apps의 서비스에 packages 모듈 의존성을 주입한다.
- root단계에서 실행
  `yarn workspace @fe/web add @fe/lib`
- apps 서비스별 package.json의 dependencies에 @fe/lib 가 추가된 것을 확인할 수 있다.

---

### yarn berry의 특징

- nodemodules를 사용하지 않고, .yarn폴더에 의존성들을 .zip포맷으로 압축저장한다.
- .pnp.cjs 단일 파일에 의존성 트리정보를 저장한다.
- zero installs: .yarn 폴더에 오프라인 캐시 zip파일들을 확인할 수 있다.
매번 node_modules를 갱신하기 위해 yarn install을 실행하거나 개발자간 node_modules가 달라지지 않았는가 확인할 필요가 없다.

-> 때문에 IDE가 의존성, 타입정보를 node_modules가 아닌 .yarn을 바라보도록 알려주어야 한다. 
- `ZipFS` 익스텐션 설치 : zip파일로 설치된 종속성을 읽어올 수 있도록.

- 예로 typescript가 반영되지 않음을 확인할 수 있다.
  - `yarn add -D typescript`
  - `yarn dlx @yarnpkg/sdks vscode`
  - typeScript버전을 사용하도록 허용한다 
    (명령팔레트 cmd+shift+P - select typescript version - use workspace version)
  - .vscode - extensions.json에 zipFS설치를 권장하도록 명시한다.

  ```json
  {
    "recommendations": ["arcanis.vscode-zipfs"]
  }
  ```
  
  - 참고링크 yarnpkg (각 편집기의 설정을 모아둔 목록): https://yarnpkg.com/getting-started/editor-sdks

  </div>
</details>


<details>
<summary>2. prettier, lint, tsconfig 설정 공통화</summary>
<div markdown="2">

### root에서 eslint, prettier 설치
  ```
  yarn add prettier eslint eslint-config-prettier eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-import-resolver-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser -D

  yarn dlx @yarnpkg/sdks
```

  - eslint-config-prettier - 불필요하거나 prettier와 충돌되는 규칙을 제외시킴
  
### vscode eslint, prettier 익스텐션 설치
  - eslint와 prettier를 설치하고 나면 .vscode/extensions.json에 추천 익스텐션 추가됨 확인할 수 있다. 
  - `esbenp.prettier-vscode`와 `dbaeumer.vscode-eslint` 설치 하기

### rc 설정 및 settings.json 설정하기
  - .prettierrc
  - .eslintrc.js
  - .vscode/settings.json
 
 ```json
    {
  "search.exclude": {
    "**/.yarn": true,
    "**/.pnp.*": true
  },
  "typescript.tsdk": ".yarn/sdks/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "eslint.nodePath": ".yarn/sdks",
  "prettier.prettierPath": ".yarn/sdks/prettier/index.js",

  // 기본 포맷터 prettier로 사용
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  // 파일 저장시 formatter 실행
  "editor.formatOnSave": true,
  "editor.rulers": [120],
  // lint 설정
  "eslint.packageManager": "yarn",
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
}
```

- eslint적용이 안된다면?
  - ⌨️ command + shift + p
  - ESLint: Restart EsLint Server 선택
  
### root에 설정한 rule들이 적용되도록 설정
- 각각의 앱에 적용되어있던 .eslintrc.json 파일이 있다면 삭제해준다.
- 🥨 공통 rule을 기반으로 사용하면서 각 앱 내 rule을 추가하여 적용하고 싶다면?

### tsconfig 설정 공유하기
- root에서 tsconfig.base.json을 생성하여 규칙을 정의
- apps 및 packages의 tsconfig.json에서 root의 tsconfig.base.json을 확장받는다.

ex) apps/fe/tsconfig.json
```json

{
  "$schema": "https://json.schemastore.org/tsconfig",
  *** "extends": "../../tsconfig.base.json", ***
  "compilerOptions": {
    "baseUrl": "./src",
    "target": "esnext",
    "lib": ["dom", "dom.iterable", "esnext"],
    "module": "esnext",
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./*"]
    }
  },
  "exclude": ["**/node_modules", "**/.*/"],
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    "**/*.mts",
    "**/*.js",
    "**/*.cjs",
    "**/*.mjs",
    "**/*.jsx",
    "**/*.json"
  ]
}
```

  </div>
</details>

<details>
  <summary>3. react UI library 생성 및 적용</summary>
  <div markdown='3'>

  ### packages에서 ui폴더 생성
  - `yarn init` > package.json 생성
  - package.json name 변경 (@fe/ui)
  - root이동하여 `yarn` 실행 > .pnp.cjs에서 app name이 변경되었는지 확인
    
  ### @fe/ui에 react 환경 설치
  ```
    yarn workspace @fe/ui add typescript react react-dom @types/node @types/react @types/react-dom -D
  ```
    
  - tsconfig.json 설정
  - UI컴포넌트 만들기
    - src/Button.tsx
    - src/index.ts (Button 컴포넌트를 export한다)
  - package.json의 main 경로 설정해주기
  ```json
  {
    "name": "@fe/ui",
    "packageManager": "yarn@3.5.1",
    "main": "src/index.ts", -> *ui 모듈을 import해오는 경로 설정
    "devDependencies": {
      "@types/node": "^18.16.3",
      "@types/react": "^18.2.4",
      "@types/react-dom": "^18.2.3",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "typescript": "^5.0.4"
    },
    "scripts": {
      "typecheck": "tsc --project ./tsconfig.json --noEmit"
    }
  }
```
    
### @fe/app에서 @fe/ui 모듈을 사용할 수 있도록 적용하기
root에서 실행
```
yarn workspace @fe/app add @fe/ui  
```
apps/fe-app의 packages.json dependencies에 @fe/ui가 추가되는 것을 확인

    
### typescript transpilation
모듈로 import해온 컴포넌트의 타입들이 브라우저에서 읽혀지지 않아서 오류가 생긴다.
브라우저가 타입스크립트를 해석할 수 있도록 javascript로 transpilation이 필요하다.
nextConfig에서 설정할 수 있다. (built-in module transpilation :https://nextjs.org/blog/next-13-1#built-in-module-transpilation-stable)
    
```js
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@fe/ui'], //*<-사용하고자 하는 패키지를 등록해준다.
}

module.exports = nextConfig

```
  </div>
</details>
  
  
<details>
  <summary>4. type검사하기</summary>
  <div markdown='4'>
    
패키지 라이브러리에서의 타입변환이 발생했다면,
이 패키지를 사용하고 있는 곳에서 타입에러가 생기지 않을지 확인이 필요하다.
    
### 각 앱에서 타입체크하기
- 앱의 package.json에서 script 추가
 ```json
 "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --project ./tsconfig.json --noEmit" //<-추가
  }, 
```
                                                                 
- 커맨드실행하기
```
yarn workspace @fe/web typecheck
```
      
                                                                 
### global하게 typecheck하기

앱을 실행시키지않더라도 타입을 확인할 수 있는 방법이다
- root의 package.json에 script작성
                                                                 
```json
  "scripts": {
    "g:typecheck": "yarn workspaces foreach -pv run typecheck"
  },
```
                                                                 
  - `g`:global하게 typecheck실행
  - `yarn workspaces foreach`
     - p : parallel  병행으로
     - v : 출력라인에 작업공간이름을 붙임
     - 기타 옵션값 확인 : https://yarnpkg.com/cli/workspaces/foreach
- root에서 명령어실행
```
yarn g:typecheck
```
 </div>
</details>
  
<details>
<summary>5. github actions 배포</summary>
<div markdown='5'>
  
### workflow
  - github내 이벤트 발생에 대해 하나 이상의 작업을 실행시키는 자동화된 프로세스

  
### github/actions/yarn-install yml 생성
```yml
#공통설정 (apps workflows에서 공통으로 사용하게 된다)
  
name: 'Monorepo install (yarn)'
description: 'Run yarn install'

runs:
  using: 'composite'
  
  # step - 만들어진 action을 실행하거나 shell script를 실행하는 곳
  steps:
    - name: Expose yarn config as "$GITHUB_OUTPUT"
      id: yarn-config
      shell: bash
      run: |
        echo "CACHE_FOLDER=$(yarn config get cacheFolder)" >> $GITHUB_OUTPUT

  # 지정한 path에 지정 key값으로 cache가 되어있는지 확인한다.
    - name: Restore yarn cache
      uses: actions/cache@v3
      id: yarn-download-cache
      with:
        path: ${{ steps.yarn-config.outputs.CACHE_FOLDER }}
        key: yarn-download-cache-${{ hashFiles('yarn.lock') }}
        restore-keys: |
          yarn-download-cache-
  
    - name: Restore yarn install state
      id: yarn-install-state-cache
      uses: actions/cache@v3
      with:
        path: .yarn/ci-cache/
        key: ${{ runner.os }}-yarn-install-state-cache-${{ hashFiles('yarn.lock', '.yarnrc.yml') }}

  # 확인 후 yarn.lock에서 상태변경이 있는 경우에 yarn install을 실행하도록 한다. 
    - name: Install dependencies
      shell: bash
      run: |
        yarn install --immutable --inline-builds
      env:
        YARN_ENABLE_GLOBAL_CACHE: 'false'
        YARN_INSTALL_STATE_PATH: .yarn/ci-cache/install-state.gz # Very small speedup when lock does not change

```
  
  
### github/workflows/fe yml 생성
  
```yml
name: CI-FE-app

// *on: workflow를 동작하게하는 trigger
// change-check 브랜치의 'apps/fe/**' 경로에서 수정이 발생하여 push되었을 경우 workflow가 동작한다.
  
on:
  push:
    branches:
      - change-check
    paths:
      - 'apps/fe/**'

jobs:
  test:
    // 리눅스 환경에서 실행하는 경우
    runs-on: ubuntu-latest 
    strategy:
      matrix:
        node-version: [16.x]
  
    steps:
      // 리눅스환경에 checkout한 후 action을 실행한다. (uses) 
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          //  strategy에서 만들어 놓은 변수를 사용할수도 있고
          //  GitHub설정의 Secrets에 저장해둔 변수를 ${{ secrets.XXX }}라는 값으로 사용할 수 있다.
  
      - name: 📥 Monorepo install
        uses: ./.github/actions/yarn-install

      - name: Build web-app
        working-directory: apps/fe
        run: |
          yarn build
```
</div>
</details>

