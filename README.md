# yarn-berry-work

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
- packages하위 lib 프로젝트 생성,
- package.json 생성
  `yarn init`
  동일하게 name 변경 : ex_@fe/lib
- root이동 > 동일하게 `yarn`실행 .pnp.cjs 업데이트
(+typescript설치, tsconfig 설정)


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
- 때문에 IDE가 의존성, 타입정보를 node_modules가 아닌 .yarn을 바라보도록 알려주어야 한다. 
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

