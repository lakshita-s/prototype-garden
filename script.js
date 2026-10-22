// Click any element with data-hide / data-show to hide/show those ids
function setHidden(ids, value) {
  (ids || "")
    .split(" ")
    .filter(Boolean)
    .forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.hidden = value;
    });
}

document.querySelectorAll("[data-hide], [data-show]").forEach((el) => {
  el.addEventListener("click", () => {
    setHidden(el.dataset.hide, true);
    setHidden(el.dataset.show, false);
  });
});

// Video groups: click each video to play it. When every video in the
// group has ended, hide/show the ids in data-end-hide / data-end-show
// and play the audio in data-end-audio (if set).
document.querySelectorAll("[data-end-hide], [data-end-show]").forEach((group) => {
  const videos = group.querySelectorAll("video");
  let finished = 0;

  videos.forEach((video) => {
    video.addEventListener("click", () => video.play(), { once: true });

    video.addEventListener("ended", () => {
      finished++;
      if (finished === videos.length) {
        // short pause so the last frame is seen before switching
        setTimeout(() => {
          setHidden(group.dataset.endHide, true);
          setHidden(group.dataset.endShow, false);

          const audio = document.getElementById(group.dataset.endAudio);
          if (audio) audio.play();
        }, 600);
      }
    });
  });
});

// Slow motion for the drill video (only runs if it exists on the page)
const drillVideo = document.getElementById("two");
if (drillVideo) drillVideo.playbackRate = 0.5; // 0.5 = half speed