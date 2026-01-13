window.addEventListener("load", () => {
    const splash = document.getElementById("splash");
    const content = document.getElementById("content");
    const splashDuration = 3000;
    const fadeDuration = 1000;

    let isFinished = false;

    function finishSplash() {
        if (isFinished) return;
        isFinished = true;
        splash.classList.add("fade-out");
        setTimeout(() => {
            splash.style.display = "none";
            content.style.display = "block";
        }, fadeDuration);
    }

    setTimeout(() => {
        finishSplash();
    }, splashDuration);

    splash.addEventListener("click", () => {
        finishSplash();
    })


    /* ============================
       横スクロールスライダー処理
       ============================ */

    /* 横スクロールを受け付ける表示領域 */
    const sliderWindow = document.querySelector(".slider-window");

    /* 実際にカードが並んでいる中身 */
    const sliderTrack = document.querySelector(".slider-track");

    /* ホイール1回あたりのスクロール倍率 */
    const SCROLL_SPEED = 1.5;

    /* 元の中身を保存 */
    const originalContent = sliderTrack.innerHTML;

    /* 中身をもう1セット後ろに追加 */
    sliderTrack.innerHTML += originalContent;

    /* 1セット分の横幅を格納する変数 */
    let singleSetWidth = 0;

    /* 全体幅の半分 = 1セット分 */
    singleSetWidth = sliderTrack.scrollWidth / 2;

    /* 開始位置を中央付近にする
       → 左右どちらにもスクロールできる */
    sliderWindow.scrollLeft = singleSetWidth / 2;

    /* game1を中央に初期配置 */
    const gameCards = sliderTrack.querySelectorAll(".game-card");
    const cardsPerSet = gameCards.length / 2;
    const firstGameCard = gameCards[cardsPerSet]

    const cardCenterPosition =
        firstGameCard.offsetLeft
        - (sliderWindow.clientWidth / 2)
        + (firstGameCard.offsetWidth / 2);

    sliderWindow.scrollLeft = cardCenterPosition;

    /* スクロール量を均一にする */
    const CARD_DISTANCE =
    gameCards[1].offsetLeft - gameCards[0].offsetLeft;

    let currentIndex = cardsPerSet;

    sliderWindow.addEventListener("wheel", (event) => {
        event.preventDefault();
        const direction = Math.sign(event.deltaY);
        currentIndex += direction;
        /* 縦ホイール量を横移動量に変換 */
        sliderWindow.scrollLeft += currentIndex * CARD_SCROLL_DISTANCE;

         /* 左端に行きすぎたら右側へ瞬間移動 */
        if (currentIndex < cardsPerSet * 0.5) {
            currentIndex += cardsPerSet;
            sliderWindow.scrollLeft =
            currentIndex * CARD_DISTANCE;
        }

        /* 右に行きすぎたら戻す */
        if (currentIndex > cardsPerSet * 1.5) {
            currentIndex -= cardsPerSet;
            sliderWindow.scrollLeft =
            currentIndex * CARD_DISTANCE;
        }
    }, { passive: false });
});