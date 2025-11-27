window.addEventListener("load", () => {
  const splash = document.getElementById("splash");
  const content = document.getElementById("content");

  // アニメーション時間と合わせる（今回は2秒）
  setTimeout(() => {
    splash.style.display = "none";
    content.style.display = "block";
  }, 2000);
});