# [Ryoon-note(notion-like app)](https://ryoon-with-nomnom-googlemap.vercel.app/)
(Next.js 13 Notion like app)
A end-to-end fullstack notion clone, all with proper notion-style editor, cover images, nested documents, publishing documents to public, real-time database and more

Ryoon-note로 글을 작성하고 Publish해보세요.
저도 제가 작성한 글을 [이 링크](https://seryoon-note-app.vercel.app/preview/3n251s3kyh03ff9h3sdr8y749kdy2dg){:target="_blank"}에 남겨둡니다.📝

![main](/public/main_screenshot.png)
![screenshot1](/public/note2_screenshot.png)
![screenshot2](/public/note1_screenshot.png)
![screenshot3](/public/note3_screenshot.png)



## 제작과정

- 기술스택 - Next.js 13, Clerk, Zustand, Convex, EdgeStore, Tailwind CSS, Typescript, BlockNote
- 제작기간 - 일주일

이 Ryoon-note(notion-like app)는 [Fullstack Notion Clone: Next.js 13, React, Convex, Tailwind](https://youtu.be/0OaDyjB9Ib8)유튜브강의를 참고하여 TypeScript로 작성한 웹앱입니다.

해당 강의를 들으면서 처음 Zustand,Convex, EdgeStore등을 알게 됐는데 꽤나 흥미로워서 몰입하여 작업한 기억이 납니다.
강의가 8시간 짜리이고, 중간 중간 왜 위치에서 왜 그런 방식으로 쓰였는지가 생략된 것들에 대하여 곱씹어보고 또 새로이 알게된 기술들에 대하여 연마하며 작업하다보니 꽤 작업기간이 길어졌지만 그만큼 배우는 재미가 커서 재밌게 작업했습니다.

## Key Features
유튜브 강의에 나와있는 피쳐들은 아래와 같은데요,
- Real-time database  🔗 
- Notion-style editor 📝 
- Light and Dark mode 🌓
- Infinite children documents 🌲
- Trash can & soft delete 🗑️
- Authentication 🔐 
- File upload
- File deletion
- File replacement
Icons for each document (changes in real-time) 🌠
Expandable sidebar ➡️🔀⬅️
Full mobile responsiveness 📱
Publish your note to the web 🌐
Fully collapsable sidebar ↕️
Landing page 🛬
Cover image of each document 🖼️
Recover deleted files 🔄📄

개인적으로는 노션이 제공하는 커버이미지업로드, emoji-picker-react를 사용한 아이콘지정, 페이지의 제목이 바뀜과 동시에 목록에서의 제목도 바뀌게 하는 것, Publish&Share기능, 말그대로 Infinite 자식 도큐먼트, 이제는 대부분의 앱에서 제공중인 다크모드와 서치기능등이 기억나고... 진짜 노션같은 늘어나고 접히며 줄어드는 leftSideBar를 만드는 과정도 흥미로웠습니다. 

또 Convex로 하는 CRUD작업이 너무 재밌었어요. 뭐 기본적인 것만 했으니 심화로 들어가진 않았지만 역시나 백엔드했던 가닥(?)이 조금 있다보니 프론트엔드로 넘어와서 새로운 기술들을 접하고 비즈니스와 모델레이에 대한 작업을 할 때마다 문법이 익숙하지 않아서 그렇지 작업자체는 참 재밌습니다.

 또 이번에 [BlockNote](https://www.blocknotejs.org/) 라이브러리는 처음알게 됐는데(처음알게된 라이브러리가 참 많네요. 클론코딩할 때 제가 모르던 이런 새로운 기술들을 접할 수 있어서 또 재밌어서 더 하게 되는 거 같아요)참 감탄하며 작업했습니다. 덕분에 조상격인 Prosemirror와 TipTap도 알게되고... 올해에 [LiveBlocks](https://liveblocks.io/)를 처음 접하고 사내 프로젝트에서 테스트해 볼때도 신선한 충격을 받았었는데 이번에도 그런 좋은 충격을 받았습니다. 새삼 오픈소스 라이브러리 작업자들에 언제나 그렇지만 또 감사하고 경이로움을 느낍니다. 또 저도언젠가는 그런 Receiver만이 아닌 창작자이자 Giver가 되길 바라기도 하구요.  

## 커스텀해서 사용하고 싶으시다면?
- .env파일을 작성후 아래의 variable에 대한 값을 지정해주시면 되며, 저의 경우 배포는 vercel을 이용하였습니다.
- 로컬에서 테스트할시와 운영서버에 적용할시에 작성할 .env파일은 각각 다릅니다.
```
로컬/개발서버용 .env
CONVEX_DEPLOYMENT=
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=클러크
EDGE_STORE_ACCESS_KEY=
EDGE_STORE_SECRET_KEY=
```
```
Production 운영서버용 .env
CI = false //https://stackoverflow.com/questions/66840942/vercel-deployment-error-command-npm-run-build-exited-with-1 이 글을 참고하세요
CONVEX_DEPLOY_KEY= 운영배포용 키의 변수명이 다른점을 유의하세요
NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
EDGE_STORE_ACCESS_KEY=
EDGE_STORE_SECRET_KEY=
```
- Clerk와 Convex 연동 관련하여 auth.config.js 파일의 생성 및 수정이 필요합니다. 자세한 사항은 [이 링크](https://docs.convex.dev/auth/clerk)를 참조하시면 됩니다. 또한 이 링크도 참조하세요 [Integrate Convex with Clerk
](https://clerk.com/docs/integrations/databases/convex)
