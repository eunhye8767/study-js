import "./scroll-timeline.js";

const progress = document.querySelector(".progress");

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
          target: document.body,
          edge: "start",

          // 1 = 0 지점으로 왔을 때 시작
          // 0.5 = 반 이상 지나갔을 때 시작
          threshold: 1,
        },
        {
          target: document.body,
          edge: "end",
          threshold: 1,
        },
      ],
    }),
  }
);
