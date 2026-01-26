window.addEventListener("load", () => {
    /* ============================
       ゲームデータ定義
       ============================ */
    
    const gamesData = {
        1: {
            title: "GAME TITLE 1",
            image: "assets/img/game1.png",
            description: "ゲーム説明",
            genre: "？？？",
            release: "2025年1月",
            size: "？？？MB",
            downloadPath: "assets/downloads/game1.zip"
        },
        2: {
            title: "GAME TITLE 2",
            image: "assets/img/game2.png",
            description: "ゲーム説明",
            genre: "？？？",
            release: "2025年1月",
            size: "？？？MB",
            downloadPath: "assets/downloads/game2.zip"
        },
        3: {
            title: "GAME TITLE 3",
            image: "assets/img/game3.png",
            description: "ゲーム説明",
            genre: "？？？",
            release: "2025年1月",
            size: "？？？MB",
            downloadPath: "assets/downloads/game3.zip"
        },
        4: {
            title: "GAME TITLE 4",
            image: "assets/img/game4.png",
            description: "ゲーム説明",
            genre: "？？？",
            release: "2025年1月",
            size: "？？？MB",
            downloadPath: "assets/downloads/game4.zip"
        },
        5: {
            title: "GAME TITLE 5",
            image: "assets/img/game5.png",
            description: "ゲーム説明",
            genre: "？？？",
            release: "2025年1月",
            size: "？？？MB",
            downloadPath: "assets/downloads/game5.zip"
        }
    };

    /* ============================
       URLパラメータからゲームIDを取得
       ============================ */
    
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game');

    /* ============================
       スプラッシュ画面の処理
       ============================ */
    
    const gameSplash = document.getElementById('game-splash');
    const closeButton = document.getElementById('close-splash');
    const mainContent = document.getElementById('main-content');

    /* ゲームIDが指定されている場合 */
    if (gameId && gamesData[gameId]) {
        const game = gamesData[gameId];

        /* ゲーム情報を表示 */
        document.getElementById('game-image').src = game.image;
        document.getElementById('game-title').textContent = game.title;
        document.getElementById('game-description').textContent = game.description;
        document.getElementById('game-genre').textContent = game.genre;
        document.getElementById('game-release').textContent = game.release;
        document.getElementById('game-size').textContent = game.size;
        
        /* ダウンロードボタンの設定 */
        const downloadButton = document.getElementById('download-button');
        downloadButton.href = game.downloadPath;
        downloadButton.download = game.downloadPath.split('/').pop(); // ファイル名を設定

        /* スプラッシュを表示 */
        gameSplash.style.display = 'flex';
    } else {
        /* ゲームIDがない場合はスプラッシュを非表示 */
        gameSplash.style.display = 'none';
        mainContent.style.display = 'block';
    }

    /* ============================
       閉じるボタンの処理
       ============================ */
    
    closeButton.addEventListener('click', () => {
        /* フェードアウトアニメーション */
        gameSplash.classList.add('fade-out');

        /* アニメーション終了後に非表示 */
        setTimeout(() => {
            gameSplash.style.display = 'none';
            mainContent.style.display = 'block';
        }, 500);
    });

    /* ============================
       背景クリックで閉じる（オプション）
       ============================ */
    
    gameSplash.addEventListener('click', (e) => {
        /* 背景部分をクリックした場合のみ閉じる */
        if (e.target === gameSplash) {
            closeButton.click();
        }
    });
});
