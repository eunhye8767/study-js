import "./scroll-timeline.js";

const progress = document.querySelector(".progress");
const scrollBox = document.querySelector(".scroll-box");

progress.animate(
  [
    {
      transform: "scaleX(0)",
    },
    {
      transform: "scaleX(1)",
    },
  ],
  {
    timeline: new ScrollTimeline({
      scrollOffsets: [
        {
          // progress는 페이지의 처음부터 마지막까지에 영향을 받기 때문에 document.body
          // target = 해당 애니메이션이 받는 영역
          // target: document.body,

          // target을 scroll-box로 하게 되면 브라우저 내 시작점에 왔을 때
          target: scrollBox,
          edge: "start",

          // 1 = 0 지점으로 왔을 때 시작
          // 0.5 = 반 이상 지나갔을 때 시작
          threshold: 1,
        },
        {
          // target: document.body,

          // target을 scroll-box로 하게 되면 브라우저 내 마지막점에 왔을 때
          target: scrollBox,
          edge: "end",
          threshold: 1,
        },
      ],
    }),
  }
);
