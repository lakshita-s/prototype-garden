// const button = document.getElementById("enter-btn");
// const closedGate = document.getElementById("closed-gate");
// const openGate = document.getElementById("open-gate");

// button.addEventListener("click", () => {
//   closedGate.hidden = true;
//   openGate.hidden = false;
//   button.hidden = true; // optional: remove the button after entering
// });

// Any element with data-hide / data-show hides/shows those ids on click
function setHidden(ids, value) {
  (ids || "").split(" ").filter(Boolean).forEach((id) => {
    document.getElementById(id).hidden = value;
  });
}

document.querySelectorAll("[data-hide], [data-show]").forEach((el) => {
  el.addEventListener("click", () => {
    setHidden(el.dataset.hide, true);
    setHidden(el.dataset.show, false);
  });
});

// Videos: click to play, reveal #continue-btn when all have ended
const videos = document.querySelectorAll("video");
let finished = 0;

videos.forEach((video) => {
  video.addEventListener("click", () => video.play(), { once: true });
  video.addEventListener("ended", () => {
    finished++;
    if (finished === videos.length) {
      document.getElementById("continue-btn").hidden = false;
    }
  });
});

const video = document.getElementById("two");
video.playbackRate = 0.5; // 0.5 is half speed (slow motion)

