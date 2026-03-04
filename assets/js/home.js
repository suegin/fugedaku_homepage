window.addEventListener("load", () => {

    /* ============================
       カーソル
       ============================ */
    const cursor = document.getElementById("cursor");
    document.addEventListener("mousemove", e => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top  = e.clientY + "px";
    });
    document.querySelectorAll("a, button").forEach(el => {
        el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
    });

    /* ============================
       スプラッシュ画面処理
       ============================ */
    const splash  = document.getElementById("splash");
    const content = document.getElementById("content");

    const SPLASH_DURATION = 3000;
    const FADE_DURATION   = 800;
    let isSplashFinished  = false;

    function finishSplash() {
        if (isSplashFinished) return;
        isSplashFinished = true;
        splash.classList.add("fade-out");
        setTimeout(() => {
            splash.style.display  = "none";
            content.style.display = "block";
        }, FADE_DURATION);
    }

    if (sessionStorage.getItem("splashShown")) {
        /* 2回目以降：スプラッシュをスキップ */
        splash.style.display  = "none";
        content.style.display = "block";
        isSplashFinished = true;
    } else {
        /* 初回のみ演出を流してフラグを保存 */
        sessionStorage.setItem("splashShown", "true");
        setTimeout(finishSplash, SPLASH_DURATION);
        splash.addEventListener("click", finishSplash);
    }

    /* ============================
       ゲームスライダー（3枚同時表示・無限ループ）
       ============================ */
    const track    = document.getElementById("sliderTrack");
    const dotsWrap = document.getElementById("sliderDots");

    if (!track || !dotsWrap) return;

    const TOTAL    = track.querySelectorAll(".game-card").length;
    const origHTML = track.innerHTML;

    /* 3セット複製して無限ループを実現 */
    track.innerHTML = origHTML + origHTML + origHTML;

    /* カード幅 = ビューポート幅 ÷ 3 */
    function cardWidth() {
        return window.innerWidth / 3;
    }

    let pos        = TOTAL; /* 中央セット（2セット目）から開始 */
    let currentIdx = 0;
    let animating  = false;

    /* インジケータードット生成 */
    for (let i = 0; i < TOTAL; i++) {
        const dot = document.createElement("div");
        dot.className = "indicator-dot" + (i === 0 ? " active" : "");
        dot.addEventListener("click", () => jumpTo(i));
        dotsWrap.appendChild(dot);
    }
    const dots = dotsWrap.querySelectorAll(".indicator-dot");

    function updateDots() {
        dots.forEach((d, i) => d.classList.toggle("active", i === currentIdx));
    }

    function slide(p, animate = true) {
        track.style.transition = animate
            ? "transform .6s cubic-bezier(.4,0,.2,1)"
            : "none";
        track.style.transform  = `translateX(${-(p * cardWidth())}px)`;
        animating = animate;
        updateDots();
    }

    function jumpTo(idx) {
        if (animating) return;
        clearInterval(autoTimer);
        const diff = idx - currentIdx;
        pos       += diff;
        currentIdx = idx;
        slide(pos);
        restartTimer();
    }

    /* トランジション終了時：端に達したら瞬時に中央セットへ戻す */
    track.addEventListener("transitionend", () => {
        animating = false;
        if (pos >= TOTAL * 2) { pos -= TOTAL; slide(pos, false); }
        if (pos <  TOTAL)     { pos += TOTAL; slide(pos, false); }
    });

    /* リサイズ時に位置を再計算 */
    window.addEventListener("resize", () => slide(pos, false));

    /* 初期位置を設定（アニメーションなし） */
    setTimeout(() => slide(pos, false), 80);

    /* 自動スライド */
    const AUTO_INTERVAL = 3500;
    let autoTimer;

    function restartTimer() {
        clearInterval(autoTimer);
        autoTimer = setInterval(() => {
            if (animating) return;
            pos++;
            currentIdx = (currentIdx + 1) % TOTAL;
            slide(pos);
        }, AUTO_INTERVAL);
    }

    restartTimer();
});
