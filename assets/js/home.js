window.addEventListener("load", () => {
    const splash = document.getElementById("splash");
    const content = document.getElementById("content");
    const splashDuration = 3000;
    const fadeDuration = 1000;

    setTimeout(() => {
      splash.classList.add("fade-out");
          setTimeout(() => {
              splash.style.display = "none";
              content.style.display = "block";
          }, fadeDuration);
    }, splashDuration)
});