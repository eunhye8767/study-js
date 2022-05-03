(() => {

  // window.pageYOffset 대신 쓸 변수
  let yOffset = 0;

  // 현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이값의 합
  let prevScrollHeight = 0;

  // 현재 활성화된(눈 앞에 보고있는) 씬(scroll-section)
  let currentScene = 0;

  // 새로운 scene이 시작된 순간 true
  let enterNewScene = false;

  // 모든 애니메이션에 대한 정보를 담을 배열 생성
  const sceneInfo = [
    // section 4개
    {
      // 0
      type: 'sticky', // sticky 와 normall 로 타입 설정
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
        
        canvas: document.querySelector('#video-canvas-0'),
        context: document.querySelector('#video-canvas-0').getContext('2d'),
        videoImages: [],  // 프레임별 이미지를 배열에 담을 예정
      },
      values: {
        videoImageCount: 300,     // 이미지 갯수
        imageSequence: [0, 299],  // 이미지 순서
        canvas_opacity: [1, 0, { start: 0.9, end: 1 }],
        // start와 end 숫자의 구간이 움직이는 애니메이션 구간 (전체구간을 1로 기준으로 했을 때 비율)
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
        messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
        messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
        messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
        messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
        messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
        messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
        messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
        messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }],
      }
    },
    {
      // 1
      type: 'normal',
      // heightNum: 5, type normal에서는 필요없음
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
        content: document.querySelector('#scroll-section-1 .description')
      }
    },
    {
      // 2
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
        messageA: document.querySelector('#scroll-section-2 .a'),
        messageB: document.querySelector('#scroll-section-2 .b'),
        messageC: document.querySelector('#scroll-section-2 .c'),
        pinB: document.querySelector('#scroll-section-2 .b .pin'),
        pinC: document.querySelector('#scroll-section-2 .c .pin'),

        canvas: document.querySelector('#video-canvas-1'),
        context: document.querySelector('#video-canvas-1').getContext('2d'),
        videoImages: [],  // 프레임별 이미지를 배열에 담을 예정
      },
      values: {
        videoImageCount: 960,     // 이미지 갯수
        imageSequence: [0, 959],  // 이미지 순서
        canvas_opacity_in: [0, 1, { start: 0, end: 0.1 }],
        canvas_opacity_out: [1, 0, { start: 0.95, end: 1 }],

        messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
        messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
        messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
        messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
        messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
        messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
        messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
        messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
        messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
        messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
        messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
        messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
        pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
        pinC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }]
      }
    },
    {
      // 3
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
        canvasCaption: document.querySelector('.canvas-caption'),
        canvas: document.querySelector('.image-blend-canvas'),
        context: document.querySelector('.image-blend-canvas').getContext('2d'),
        imagesPath: [
          './images/blend-image-1.jpg',
          './images/blend-image-2.jpg',
        ],
        images: [],
      },
      values: {
        rect1X: [0, 0, {start: 0, end: 0}],
        rect2X: [0, 0, {start: 0, end: 0}],
        rectStartY: 0,
      }
    },
  ];

  // 캔버스에 그려질 이미지를 세팅
  function setCanvasImages() {
    let imgElem;
    for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++ ) {
      // new Image() == document.createElement('img') 로 해도 무방하다 
      // 이미지 객체 생성
      imgElem = new Image();

      // 영상을 초당 프레임별 이미지 생성한 경로 지정
      // 6726번부터 시작하여 6726 이미지 이름 적용 
      // i는 0부터 시작 (fot let i=0)
      imgElem.src = `./video/001/IMG_${6726 + i}.JPG`;
      sceneInfo[0].objs.videoImages.push(imgElem);
    }
    
    let imgElem2;
    for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++ ) {
      imgElem2 = new Image();

      imgElem2.src = `./video/002/IMG_${7027 + i}.JPG`;
      sceneInfo[2].objs.videoImages.push(imgElem2);
    }

    let imgElem3;
    for (let i=0; i < sceneInfo[3].objs.imagesPath.length; i++) {
      imgElem3 = new Image();

      imgElem3.src = sceneInfo[3].objs.imagesPath[i];
      sceneInfo[3].objs.images.push(imgElem3);
    }
    // console.log(sceneInfo[3].objs.images);
  }
  setCanvasImages();
  
  function setLayout() {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      if ( sceneInfo[i].type === 'sticky' ) {
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      } else if ( sceneInfo[i].type === 'normal' ) {
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
      }
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    yOffset = window.pageYOffset;
    // 새로고침(로딩) 시, body에 해당 섹션 아이디값 적용
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++ ) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute('id',`show-secene-${currentScene}`);
    
    /*
      1. 브라우저 창 크기 - 세로 사이즈를 기준으로 100% 기준에 맞춰 
         transform - scale 조절을 해준다
      2. scale에 들어갈 비율 값을 구해줘야 한다
      3. window.innerHeight 을 이용해 비율을 구한다
      4. canvas의 height 값 1080
      5. scale 값만 조절이 된다. 정렬을 상단, 왼쪽에 딱 붙을 수 있게 css로 조절한다.
     */
    const heightRatio = window.innerHeight / 1080;
    sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
  }
  
  // values는 sceneInfo의 values에 적용한 값 0, 1 이다.
  function calcValues(values, currentYOffset) {
    let rv;
    // 현재 씬(스크롤 섹션)에서 스크롤된 범위를 비율로 구하기
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if ( values.length ===3 ) {
      // 구체적으로 start 와 end 시점이 있는 경우
      // values 3번째에 start와 end 객체가 있어서 length을 3으로 설정
      // start ~ end 사이에 애니메이션 실행
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;

      if ( currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd ) {
        rv = (currentYOffset - partScrollStart ) / partScrollHeight * (values[1] - values[0]) + values[0];
      } else if ( currentYOffset < partScrollStart ) {
        rv = values[0];
      } else if ( currentYOffset > partScrollEnd ) {
        rv = values[1];
      }
    } else {
      /*
        values 값이 [ 200, 900 ] 일 때,
        900 - 200 을 빼주면 700. rv의 길이는 0 ~700까지 비율로 보여지게 된다
        하지만 values 는 900 까지 있으므로
        values[0] = 200을 한 번 더해주어 900 으로 만들어준다.
       */
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }

    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;

    /*
      현재 스크롤 위치값에서 이전 섹션들의 합친 높이값을 빼주면 
      현재 화면에서 얼마만큼의 높이만큼 움직였는 지 알 수 있다
     */ 
    const currentYOffset = yOffset - prevScrollHeight;

    // 현재 씬의 scrollHeight
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    // yOffset(전체 문서에서 현재 위치값 == pageYOffset) / 현재 씬의 scrollHeight
    const scrollRatio = currentYOffset / scrollHeight; 
    
    // console.log(currentScene, currentYOffset);
    // console.log(currentScene);

    switch (currentScene) {
      case 0:
        // console.log('0 play');
        /*
          일회성으로 사용되기 때문에 
          사용할 적에 적용하는게 좋을 것 같아서
          변수 처리가 아닌 직접 연산으로 적용
          const messageA_opacity_in = calcValues(values.messageA_opacity_in, currentYOffset);
          const messageA_opacity_out = calcValues(values.messageA_opacity_out, currentYOffset);
          const messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYOffset);
          const messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYOffset);
         */
        // console.log(messageA_opacity_in);

        let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
        // 이미지 시퀀스가 0부터 299까지 보여지는 지 확인, 테스트
        // console.log(sequence);
        objs.context.drawImage(objs.videoImages[sequence], 0, 0);

        // 캔버스의 opacity 값은 1번만 실행하면 된다
        objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset)

        if ( scrollRatio <= 0.22 ) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }
        // console.log(messageA_opacity_in);

        if (scrollRatio <= 0.42) {
          // in
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.62) {
          // in
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.82) {
          // in
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
          objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
        }

        break;
      case 2:
        // console.log('2 play');

        let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
        objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

        if (scrollRatio <= 0.5) {
          // in
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);
        } else {
          // out
          objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);
        }

        if (scrollRatio <= 0.32) {
          // in
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
        } else {
          // out
          objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
          objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
        }

        if (scrollRatio <= 0.67) {
          // in
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        } else {
          // out
          objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
          objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
          objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
        }

        if (scrollRatio <= 0.93) {
          // in
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        } else {
          // out
          objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
          objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
          objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
        }

        // 캔버스 그리기 코드 시작 (case 3코드 복사) <!--
        // currentScene 3에서 쓰는 캔버스를 미리 그려주기 시작
        if ( scrollRatio > 0.9 ) {
          const objs = sceneInfo[3].objs;
          const values = sceneInfo[3].values;

          const widthRatio = window.innerWidth / objs.canvas.width;
          const heightRatio = window.innerHeight / objs.canvas.height;
          let canvasScaleRatio;

          if ( widthRatio <= heightRatio) {
            // 캔버스보다 브라우저 창이 홀쭉한 경우
            canvasScaleRatio = heightRatio;
            // console.log('heightRatio로 결정');
          } else {
            // 캔버스보다 브라우저 창이 납작한 경우
            canvasScaleRatio = widthRatio;
          }
          
          objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
          objs.context.fillStyle = 'white';
          objs.context.drawImage(objs.images[0], 0, 0);

          const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
          const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;

          const whiteRectWidth = recalculatedInnerWidth * 0.15;
          values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
          values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
          values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
          values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

          // 좌우 흰색 박스 그리기
          // objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
          // objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
          objs.context.fillRect(
            parseInt(values.rect1X[0]),
            0,
            parseInt(whiteRectWidth),
            objs.canvas.height
          );
          objs.context.fillRect(
            parseInt(values.rect2X[0]),
            0,
            parseInt(whiteRectWidth),
            objs.canvas.height
          );
        }
        // -->
        break;
      case 3:
        // console.log('3 play');
        let step = 0;

        // 가로/세로 모두 꽉 차게 하기 위해 여기서 세팅(계산 필요)
        const widthRatio = window.innerWidth / objs.canvas.width;
        const heightRatio = window.innerHeight / objs.canvas.height;
        let canvasScaleRatio;

        // console.log(widthRatio, heightRatio);
        if ( widthRatio <= heightRatio) {
          // 캔버스보다 브라우저 창이 홀쭉한 경우
          canvasScaleRatio = heightRatio;
          // console.log('heightRatio로 결정');
        } else {
          // 캔버스보다 브라우저 창이 납작한 경우
          canvasScaleRatio = widthRatio;
          // console.log('widthRatio로 결정');
        }
        
        objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
        objs.context.fillStyle = 'white';
        objs.context.drawImage(objs.images[0], 0, 0);

        // 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
        /*
           const recalculatedInnerWidth = window.innerWidth / canvasScaleRatio;
           - innerWidth 는 스크롤바 크기까지 포함한 크기
           - 정확한 크기를 측정할 땐 스크롤바 크기를 제외해야 한다
           - 브라우저 내 가로 크기만(스크롤바 크기 제외)을 지정할 땐 
             window.innerWidth 대신 document.body.offsetWidth 를 사용
         */ 
        const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;
        const recalculatedInnerHeight = window.innerHeight / canvasScaleRatio;
        // console.log(recalculatedInnerWidth, recalculatedInnerHeight);

        if (!values.rectStartY) {
          // values.rectStartY = objs.canvas.getBoundingClientRect().top;
          /*
             offsetTop - Y 위치값, 상단 0 으로부터 얼마만큼 떨어져 있는 지?
             getBoundingClientRect 경우, 화면 뷰포트 상단 기준이었다면
             offsetTop은 전체 화면 상단 기준이기 떄문에 
             기준점은 정확하지만 그 거리가 길기때문에 
             현재 섹션 이전의 섹션 총 합계 만큼을 빼주면 된다.
             
             하지만, 지금은 하고자하는 값을 구할 수가 있는데
             3번 섹션이 시작될 때 맨 위에서 캔버스가 시작되는 지 알 수 있다.
             offsetTop 경우 기준을 css로 바꿀 수가 있는데
             전체를 감싸주는 3번 섹션의 position 값을 relative (부모) 로 두고
             캔버스는 자식요소이기 때문에 해당 위치의 값을 구할 수 있다.
             >> 3번 섹션 상단이 화면 뷰포트 상단에 닿을 경우 애니메이션이 시작되기 때문에 가능한 부분.

             offsetTop 값은 트랜스폼 으로 변형된 값의 기준이 아닌
             실제 크기의 값을 기준으로 추출한다
             따라서 objs.canvas.offsetTop 만 적용하는 것이 아니라
             canvas가 늘어나거나 줄어든 비율도 적용해줘야 한다.
           */ 
          // values.rectStartY = objs.canvas.offsetTop;
          values.rectStartY = objs.canvas.offsetTop + (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
          console.log(values.rectStartY);

          values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight;
          values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight;
          values.rect1X[2].end = values.rectStartY / scrollHeight;
          values.rect2X[2].end = values.rectStartY / scrollHeight;
          // console.log(values.rectStartY);
        }

        const whiteRectWidth = recalculatedInnerWidth * 0.15;
        values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) / 2;
        values.rect1X[1] = values.rect1X[0] - whiteRectWidth;
        values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
        values.rect2X[1] = values.rect2X[0] + whiteRectWidth;

        // 좌우 흰색 박스 그리기
        // fillRect 로 직사각형 그리기
        // objs.context.fillRect(values.rect1X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
        // objs.context.fillRect(values.rect2X[0], 0, parseInt(whiteRectWidth), objs.canvas.height);
        objs.context.fillRect(
          parseInt(calcValues(values.rect1X, currentYOffset)),
          0,
          parseInt(whiteRectWidth),
          objs.canvas.height
        );
        objs.context.fillRect(
          parseInt(calcValues(values.rect2X, currentYOffset)),
          0,
          parseInt(whiteRectWidth),
          objs.canvas.height
        );
        
        /*
          if (캔버스가 브라우저 상단에 닿지 않았다면) {
            step = 1;
          } else {
            setp = 2;
          }

          values.rect1X[2].end
          캔버스(화이트 박스)가 끝나는 지점
         */ 
        if ( scrollRatio < values.rect1X[2].end ) {
          step = 1;
          // console.log('캔버스 닿기 전');
          objs.canvas.classList.remove('sticky');
        } else {
          step = 2;
          // console.log('캔버스 닿기 후');

          //이미지 블렌드
          objs.canvas.classList.add('sticky');
          objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;
        }

        break;
    }
  }

  function scrollLoop() {
    
    enterNewScene = false;

    // 스크롤 할 때마다 값을 초기화
    prevScrollHeight = 0;

    for (let i = 0; i < currentScene; i++) {
      // prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute('id',`show-secene-${currentScene}`);
    }

    if (yOffset < prevScrollHeight) {

      enterNewScene = true;

      // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지(모바일 & iOS)
      // 마이너스로 바뀌는 상황 대비하여 0일 때는 return (스크롤 내리면서 새로고침될 때)
      if (currentScene === 0) return;
      currentScene--;
      document.body.setAttribute('id',`show-secene-${currentScene}`);
    }

    // scene이 바뀌는 순간 return
    // scene 바뀔 때 이상한 값이 생성되는 것을 방지
    if ( enterNewScene ) return;
    playAnimation();
    // console.log(currentScene, [yOffset], prevScrollHeight, [sceneInfo[currentScene].scrollHeight]);
  }

  // scroll 일 때 몇 번째 section인지 
  // scroll은 복잡하게 할 예정, 따라서 익명의 함수를 적용한다 () => {}
  window.addEventListener('scroll',() => {
    // window.pageYOffset == 현재 스크롤한 위치값을 알 수 있다
    yOffset = window.pageYOffset;
    scrollLoop();
  })

  // 문서가 로드되면 실행
  /*
     load 와 DOMContentLoaded 의 차이
     - load = 이미지 등 컨텐츠 자료까지 로드가 완료된 후 실행
     - DOMContentLoaded = html 돔 구조만 로드가 완료된 후 실행
       >> 이미지 등 컨텐츠 자료 로드되지 않아도 실행
       >> load 에 비해 로딩 속도가 빠른 장점
   */ 
  // window.addEventListener('DOMContentLoaded', setLayout);
  window.addEventListener('load', () => {
    setLayout();
    sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
  });

  // 창 크기가 바뀌면 setcion height 값이 바뀜
  window.addEventListener('resize', setLayout);

})();