머지 리퀘스트 


1. 로컬서버 실행 후, 작업 진행
2. 소스트리 보단 vs코드 - 터미널에서 직접 작업
3. 작업마다 커밋하는 습관
4. ★★★★★ git add . ( yarn.lock 파일은 무조건 불포함. 절대 추가하면 안됨!!) ★★★★★
5. git status (상태 확인, 추가 파일 리스트 확인)
6. git commit -m "메세지 기입" 
   >> 커밋 메세지 형식  =====>>>   [이은혜] 메세지 내용
7. git push origin feature/iconTest
   >> feature/iconTest 브랜치 부분은 상황에 따라 달라질 수 있음
   >> 내 저장소(origin) 브랜치    https://gitlab.apdigit.tech/leh8767/apcp-markup/branches
   >> 업스트림 저장소 브랜치    https://gitlab.apdigit.tech/apcp/apcp-markup

8. 푸시 후, 깃랩 페이지에서 Merge Requests 보내기
   >> Merge Requests 는 Fork 한 상태에서만 보낼 수가 있다.
9. 깃랩 - 내 저장소(leh8767)에서 Merge Requests > "New merge request" 버튼 클릭
10. Source branch (내 저장소)   ||   Target branch(업스트립 저장소)
    >> 서로 동일한 브랜치를 선택한 후 보내기 할 수 있다.
11. 서로 동일한 브랜치를 선택 한 후에 "Compare branches and continue" 버튼 클릭
    >> 하단에 change 탭 확인하기
    >> yarn.lock 파일 유무 확인. 포함되어 있으면 절대 안됨.
12. Assignee 에서 ★★원호님  (@wholee )★★ 선택을 한 후, Merge Request Submit 하면 된다.
13. ★★★★★Merge 버튼 클릭하면 안됨.★★★★★

-------


매주 목요일 출근
> (양식에 맞춰서) 수요일 퇴근 전에 다음주 할일 일정 스케쥴 공유


★★★★★★ yarn.lock -- 절대 올리면 안 됨. ★★★★★★


커밋메시지 형식
[이원호] apcp-css 1.5.0-markupView-66


> 로컬 서버 실행 명령
webpack serve --mode development --progress


* git diff  (깃 오류 확인)

리모트 확인
1. git remote -v
2. 리모트 추가
git remote add upstream https://gitlab.apdigit.tech/apcp/apcp-markup.git



////
1. 작업할 때 항상 제일 먼저 시작 (upstream 업데이트)
git remote update

2. 브랜치 확인
git branch

3. 브랜치 변경 및 정보 가져오기  (feature/iconTest 해당 브랜치를 적용하면 됨)     
git checkout -t upstream/feature/iconTest

4. 내 저장소에 push (feature/iconTest 해당 브랜치 기입)
git push origin feature/iconTest




///
git remote update
git pull upstream feature/iconTest  (해당 브랜치 새로운 정보 가져오기)

git checkout -t upstream/develop   (업스트림의 develop 브랜치 정보 새로 가져오기)
git push origin develop

git checkout feature/iconTest ( 기존 내 iconTest 브랜치로 변경)







----




[ 업무 진행 절차 ]
1. 지라 페이지에서 첨부파일, ppt 문서 다운로드
2. 퍼블 가이드 페이지에서 "/html/display/home.html" 경로 검색, 
   기획안 보고 작업 영역 확인하기
3. 댓글에 디자인 시안 관련 확인 후 해당 URL 열기 (제플린)
4. 기능 관련 css 클래스명은 "is" 붙여서 사용. ex) is-active, is-ellipsis

[ 질문 ]
https://app.zeplin.io/project/60370a73cc449db53b612bfb/screen/61387f38716de2b9698fd77f

위 디자인 가이드, 케이스 3종류

질문1.
로그인이 되어 있고 최근 본 상품이 없을 경우 
이런 상품은 어떠세요? 문구가 보여져야 하는 지 ??
아니면 동일하게 ***님의 취향저격 상품이에요! 문구가 보여져야 하는 지 ?

>> 주석으로 home.html에 표기해야 함.


// 운영업무 작업이 들어오면
1. 해당 운영업무 브랜치로 작업을 진행해야 함.
2. git remote update
3. git checkout -t upstream/feature/APM-10766  (APM-10766, 해당 브랜치 생성해주신다고함)
4. git push origin feature/APM-10766                (내 서버에 해당 브랜치 정보 push)

5. 기존 브랜치가 있으면  "git checkout 해당브랜치" 로 이동 후 작업 시작.

// 작업 완료 후 ( 수정했을 때도 동일한 방식으로 진행)
1. origin (내 계정)에 push 
   git add .
   git commit -m "APM-10766 홈 메인 개인화 추천 영역 수정"
                        "지라번호 지라제목- 인지되게 적용"
   git push origin feature/live-section  (해당 브랜치 feature/live-section)

   >> 작업(기능) 건마다 커밋보내기.
 

2. 버전, 가이드 파일 수정 후 내 계정에 push
   >> 작업(기능)이 모두 완료되면 버전, 가이드 보내기

   2-1. 버전 
         파일 경로 : npm/apcp-css/package.json 
         vs코드에서 "version" 명만 수정
         "version": "1.6.6-stg1",
         >> 수정했을 경우,  "version": "1.6.6-stg2", 
              뒤에 숫자만 1씩 증가하면 된다.
    
         끝 자리, 6-stg1   (stg 테스트 서버)
                     6(버전에 따라 수정)

   2-2. index에 내용 남기기
   <p>2022-01-12 APM-10766 홈 메인 개인화 추천 영역 수정</p>
         날짜          지라번호      메세지

   2-3. (배포해줄 때)
   git add .
   git commit -m "[이은혜] apcp-1.6.6-stg1"
                         [이름]   
   git push origin feature/live-section 

 
3. 머지 리퀘스트 (upstream에 해당 브랜치로 머지리퀘스트)
   >> 작업(기능) 건 커밋과 버전 커밋을 보내면 된다.


4. (머지리퀘스트 완료되면) git remote update

5. 젠킨슨
   https://jenkins.amorepacific.com/view/APCP_APmall_Markup/
 
   PRD - 마지막 최종 배포용
   STG - 테스트 배포   /  -UPLOAD_S3 이미지용

   5-1. STG-APCP-MARKUP 선택
   5-2. Build with Parameters
   5-3. git 브랜치 - 해당 브랜치 선택
   5-4. build 버튼 클릭
  
6. 마크업도 개발 서버에 배포.
   (다른 사람이 작업했을 때) git remote update (항시 작업전에 업데이트하기)
   (다른 사람이 작업했을 때) git push origin feature/markupView

   git checkout feature/markupView
   git remote update
   git merge feature/live-section (병합할 브랜치를 써준다)
   >> 병합하면 수정건이 나오는데, package.json 파일에서 
         version": "0markupView-" 로 선택.
 
   git add .
   git commit -m "merge feature/live-section" (해당 브랜치명을 메세지에 남겨준다)
   git push origin feature/markupView

패키지 버전 뒤에 숫자 올려서 
add .
커밋 마크업 68
puh 마크업뷰

머지리퀘스트 업스트림.

dev 마크업뷰


7. 지라에 댓글 남기기
   유성민 님   @유성민님 링크

   해당 작업을 추가했습니다. 
   아래의 가이드 및 버전 확인 부탁드립니다.
   주석으로 로그인시, 비로그인시 에 따라 텍스트가 달라지는 내용을 적어뒀습니다.
   주석 확인 부탁드립니다.

  Guide : http://apne2-dspdev-apmall7-markup-web.s3-website.ap-northeast-2.amazonaws.com/html/display/home.html
  (작업한 URL 남기기)
  
  version : apcp-css@1.6.6-stg1

  버전에 남긴 메시지는 젠킨슨 올리고 나서
  Build History 부분에서 올린 #번호 앞 체크박스 클릭하면 로그 확인 가능함.
  Full Log 클릭해서
  + npm publish --tag stg
  npm notice 
  npm notice 📦  apcp-css@1.6.6-stg1   << 여기 부분 남기면 된다.

