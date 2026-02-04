/* ============================
   ゲームデータ定義
   ============================ */

const gamesData = {
    1: {
        id: 1,
        title: "GAME TITLE 1",
        image: "assets/img/game1.png",
        description: "ゲーム説明",
        genre: "ジャンル",
        release: "2026年1月",
        size: "???MB",
        downloadPath: "assets/downloads/game1.zip"
    },
    2: {
        id: 2,
        title: "GAME TITLE 2",
        image: "assets/img/game2.png",
        description: "ゲーム説明",
        genre: "ジャンル",
        release: "2026年1月",
        size: "???MB",
        downloadPath: "assets/downloads/game2.zip"
    },
    3: {
        id: 3,
        title: "GAME TITLE 3",
        image: "assets/img/game3.png",
        description: "ゲーム説明",
        genre: "ジャンル",
        release: "2026年1月",
        size: "???MB",
        downloadPath: "assets/downloads/game3.zip"
    },
    4: {
        id: 4,
        title: "GAME TITLE 4",
        image: "assets/img/game4.png",
        description: "ゲーム説明",
        genre: "ジャンル",
        release: "2026年1月",
        size: "???MB",
        downloadPath: "assets/downloads/game4.zip"
    },
    5: {
        id: 5,
        title: "GAME TITLE 5",
        image: "assets/img/game5.png",
        description: "ゲーム説明",
        genre: "ジャンル",
        release: "2026年1月",
        size: "???MB",
        downloadPath: "assets/downloads/game5.zip"
    },
    6:{
        id: 6,
        title: "GAME TITLE 6",
        image: "assets/img/game6.png",
        description: "ゲーム説明",
        genre: "ジャンル",
        release: "2026年1月",
        size: "???MB",
        downloadPath: "assets/downloads/game6.zip"
    },
    7:{
        id: 7,
        title: "GAME TITLE 7",
        image: "assets/img/game7.png",
        description: "ゲーム説明",
        genre: "ジャンル",
        release: "2026年1月",
        size: "???MB",
        downloadPath: "assets/downloads/game7.zip"
    },
    8:{
        id: 8,
        title: "GAME TITLE 8",
        image: "assets/img/game8.png",
        description: "ゲーム説明",
        genre: "ジャンル",
        release: "2026年1月",
        size: "???MB",
        downloadPath: "assets/downloads/game8.zip"
    }
};

// ヘルパー関数
function getAllGames() {
    return Object.values(gamesData);
}

function getGameById(id) {
    return gamesData[id] || null;
}

window.addEventListener("load", () => {
    /* ============================
       URLパラメータからゲームIDを取得
       ============================ */
    
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('game');

    /* ============================
       DOM要素の取得
       ============================ */
    
    const gameSplash = document.getElementById('game-splash');
    const closeButton = document.getElementById('close-splash');
    const mainContent = document.getElementById('main-content');
    const gamesGrid = document.getElementById('games-grid');

    /* ============================
       スプラッシュ画面の処理
       ============================ */
    
    function showGameSplash(game) {
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
        downloadButton.download = game.downloadPath.split('/').pop();
        
        /* ダウンロードボタンのクリックイベント */
        downloadButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            /* ファイルの存在を確認 */
            fetch(game.downloadPath, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        /* ファイルが存在する場合はダウンロード */
                        window.location.href = game.downloadPath;
                    } else {
                        /* ファイルが存在しない場合はアラート表示 */
                        alert('申し訳ございません。現在このゲームのダウンロードファイルは準備中です。\n\nファイルを配置する場所:\n' + game.downloadPath);
                    }
                })
                .catch(error => {
                    alert('申し訳ございません。現在このゲームのダウンロードファイルは準備中です。\n\nファイルを配置する場所:\n' + game.downloadPath);
                });
        });

        /* スプラッシュを表示 */
        gameSplash.style.display = 'flex';
        mainContent.style.display = 'none';
    }

    function hideGameSplash() {
        /* フェードアウトアニメーション */
        gameSplash.classList.add('fade-out');

        /* アニメーション終了後に非表示 */
        setTimeout(() => {
            gameSplash.style.display = 'none';
            mainContent.style.display = 'block';
            
            /* ゲーム一覧がまだ生成されていない場合は生成 */
            if (gamesGrid.children.length === 0) {
                console.log('スプラッシュ閉じる → ゲーム一覧を生成');
                renderGamesList();
            }
        }, 500);
    }

    /* ============================
       ゲーム一覧の生成
       ============================ */
    
    function renderGamesList() {
        const games = getAllGames();
        
        console.log('ゲーム一覧を生成中...', games);
        console.log('gamesGrid要素:', gamesGrid);
        
        if (!gamesGrid) {
            console.error('gamesGrid要素が見つかりません');
            return;
        }
        
        games.forEach(game => {
            const card = document.createElement('a');
            card.className = 'game-list-card';
            card.href = `?game=${game.id}`;
            
            card.innerHTML = `
                <img src="${game.image}" alt="${game.title}">
                <div class="game-card-content">
                    <h3 class="game-card-title">${game.title}</h3>
                    <span class="game-card-genre">${game.genre}</span>
                    <p class="game-card-description">${game.description}</p>
                    <div class="game-card-meta">
                        <span>${game.release}</span>
                        <span>${game.size}</span>
                    </div>
                </div>
            `;
            
            gamesGrid.appendChild(card);
        });
        
        console.log('ゲームカード生成完了');
    }

    /* ============================
       初期化処理
       ============================ */
    
    console.log('ページ読み込み完了');
    console.log('gameId:', gameId);
    
    if (gameId && getGameById(gameId)) {
        /* ゲームIDが指定されている場合: スプラッシュを表示 */
        console.log('スプラッシュモード');
        const game = getGameById(gameId);
        showGameSplash(game);
    } else {
        /* ゲームIDがない場合: 一覧を表示 */
        console.log('一覧モード');
        gameSplash.style.display = 'none';
        mainContent.style.display = 'block';
        renderGamesList();
    }

    /* ============================
       閉じるボタンの処理
       ============================ */
    
    closeButton.addEventListener('click', () => {
        hideGameSplash();
    });

    /* ============================
       背景クリックで閉じる
       ============================ */
    
    gameSplash.addEventListener('click', (e) => {
        if (e.target === gameSplash) {
            hideGameSplash();
        }
    });
});
