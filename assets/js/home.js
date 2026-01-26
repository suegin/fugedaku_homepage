window.addEventListener("load", () => {

    /* ============================
       スプラッシュ画面処理
       ============================ */

    const splash = document.getElementById("splash");
    const content = document.getElementById("content");

    const SPLASH_DURATION = 3000; // 表示時間
    const FADE_DURATION = 1000;   // フェード時間

    let isSplashFinished = false;

    /* スプラッシュ終了処理（共通化） */
    function finishSplash() {
        if (isSplashFinished) return;

        isSplashFinished = true;

        /* フェードアウト開始 */
        splash.classList.add("fade-out");

        /* フェード完了後に非表示 */
        setTimeout(() => {
            splash.style.display = "none";
            content.style.display = "block";
        }, FADE_DURATION);
    }

    /* 時間経過で自動終了 */
    setTimeout(finishSplash, SPLASH_DURATION);

    /* クリックでスキップ */
    splash.addEventListener("click", finishSplash);


    /* ============================
       自動スライダー処理
       ============================ */

    /* スクロール表示領域 */
    const sliderWindow = document.querySelector(".slider-window");

    /* カードが並ぶトラック */
    const sliderTrack = document.querySelector(".slider-track");

    /* ゲームスライダー全体 */
    const gameSlider = document.querySelector(".game-slider");

    /* ---------- 初期化 ---------- */

    /* 元のカード群を保存 */
    const originalCards = Array.from(sliderTrack.querySelectorAll(".game-card"));
    const TOTAL_CARDS = originalCards.length;

    /* インジケーター（ドット）を作成 */
    const indicatorsContainer = document.createElement("div");
    indicatorsContainer.className = "slider-indicators";
    
    for (let i = 0; i < TOTAL_CARDS; i++) {
        const dot = document.createElement("div");
        dot.className = "indicator-dot";
        if (i === 0) dot.classList.add("active"); // 最初のドットをアクティブに
        indicatorsContainer.appendChild(dot);
    }
    
    gameSlider.appendChild(indicatorsContainer);

    const indicators = indicatorsContainer.querySelectorAll(".indicator-dot");

    /* 無限ループ用に3セット分用意 */
    const originalContent = sliderTrack.innerHTML;
    sliderTrack.innerHTML = originalContent + originalContent + originalContent;

    /* 全カードを取得（複製後） */
    const allCards = sliderTrack.querySelectorAll(".game-card");

    /* カード1枚分の移動距離を計算 */
    const CARD_WIDTH = 550; // min-width
    const GAP = 12;
    const CARD_DISTANCE = CARD_WIDTH + GAP;

    /* 現在の実際の位置（複製を含めた絶対位置） */
    let actualPosition = TOTAL_CARDS; // 中央セット（2セット目）の最初から開始

    /* 現在のインデックス（0-4のループ） */
    let currentIndex = 0;

    /* トランジション中フラグ */
    let isTransitioning = false;

    /* ---------- スライド関数 ---------- */
    function updateSlide(position, animate = true) {
        const offset = -(position * CARD_DISTANCE);
        
        if (animate) {
            sliderTrack.style.transition = "transform 0.5s ease-in-out";
            isTransitioning = true;
        } else {
            sliderTrack.style.transition = "none";
            isTransitioning = false;
        }
        
        sliderTrack.style.transform = `translateX(${offset}px)`;
        
        /* インジケーターを更新 */
        indicators.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
        });
    }

    /* ---------- 初期位置設定（game1を中央に） ---------- */
    setTimeout(() => {
        updateSlide(actualPosition, false);
    }, 100);

    /* ---------- 自動スライド ---------- */
    const AUTO_SLIDE_INTERVAL = 3000; // 3秒ごと
    let autoSlideTimer;

    function nextSlide() {
        if (isTransitioning) return;
        
        /* 次のスライドに移動 */
        actualPosition++;
        currentIndex = (currentIndex + 1) % TOTAL_CARDS;
        updateSlide(actualPosition, true);
    }

    function startAutoSlide() {
        autoSlideTimer = setInterval(nextSlide, AUTO_SLIDE_INTERVAL);
    }

    /* 自動スライド開始 */
    setTimeout(() => {
        startAutoSlide();
    }, 500);

    /* ---------- インジケータークリックで手動切替 ---------- */
    indicators.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            if (isTransitioning) return;
            
            /* 自動スライドを一時停止して再開 */
            clearInterval(autoSlideTimer);
            
            /* 目標インデックスまでの最短距離を計算 */
            const diff = index - currentIndex;
            actualPosition += diff;
            currentIndex = index;
            
            updateSlide(actualPosition, true);
            startAutoSlide();
        });
    });

    /* ---------- トランジション終了時の無限ループ処理 ---------- */
    sliderTrack.addEventListener("transitionend", () => {
        isTransitioning = false;
        
        /* 3セット目に入ったら、瞬時に2セット目（中央）に戻す */
        if (actualPosition >= TOTAL_CARDS * 2) {
            actualPosition = actualPosition - TOTAL_CARDS;
            updateSlide(actualPosition, false);
        }
        
        /* 1セット目に入ったら、瞬時に2セット目（中央）に戻す */
        if (actualPosition < TOTAL_CARDS) {
            actualPosition = actualPosition + TOTAL_CARDS;
            updateSlide(actualPosition, false);
        }
    });
});