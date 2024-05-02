// Canvas와 2D context 생성
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

//플레이어 이미지 삽입
const playerImg = new Image();
playerImg.src = "./img/player.png";

//적 이미지 삽입
const enemyImg = new Image();
enemyImg.src = "./img/enemy.png"

//회복아이템 이미지 삽입
const RecoveryItemImg = new Image();
RecoveryItemImg.src = "./img/heal.png"

//체력 게이지 이미지 삽입
const heartImage = new Image();
heartImage.src = './img/Heart.png';

// 게임 상태 초기화
const game = {
    level: 1,
    enemySpeed: 2,
    enemySpawnRate: 0.015,
    score: 0,
    playerHealth: {
        maxHealth: 3,
        currentHealth: 3
    }
};

// 플레이어 설정
const player = {
    x: canvas.width / 2,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    speed: 25,
    lives: 3 // 플레이어 생명
};

//플레이어 위치에 이미지 위치시키기
function drawPlayer() {
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
};

// 총알, 적, 회복 아이템 배열
const bullets = [];
const enemies = [];
const recoveryItems = [];

// 총알 생성 함수
function createBullet() {
    bullets.push({
        x: player.x + player.width / 2,
        y: player.y,
        width: 2,
        height: 15,
        speed: 20
    });
};

// 적 생성 함수
function createEnemy() {
    const enemyWidth = 50;
    const enemyHeight = 50;
    const enemySpeed = 2;
    const enemyX = Math.random() * (canvas.width - enemyWidth);
    const enemyY = -enemyHeight;
    enemies.push({ x: enemyX, y: enemyY, width: enemyWidth, height: enemyHeight, speed: enemySpeed });
};

//적 이미지 위치시키기
function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height);
    });
};

// 회복 아이템 생성 함수
function createRecoveryItem() {
    const itemWidth = 30;
    const itemHeight = 30;
    const itemX = Math.random() * (canvas.width - itemWidth);
    const itemY = -itemHeight;
    recoveryItems.push({ x: itemX, y: itemY, width: itemWidth, height: itemHeight });
};

//회복 아이템 위치시키기
function drawRecoveryItem() {
    recoveryItems.forEach(item => {
        ctx.drawImage(RecoveryItemImg, item.x, item.y, item.width, item.height);
    });
};

// 총알 이동 함수
function moveBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= bullet.speed;

        // 총알이 화면 밖으로 나가면 제거
        if (bullet.y < 0) {
            bullets.splice(index, 1);
        };
    });
};

// 적 이동 함수
function moveEnemies() {
    enemies.forEach((enemy, index) => {
        enemy.y += enemy.speed;
        // 적이 화면 밖으로 나가면 제거
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
        };
    });
};

// 아이템 이동 함수
function moveItems() {
    recoveryItems.forEach((item, index) => {
        item.y += 2; // 아이템 이동 속도
        // 아이템이 화면 밖으로 나가면 제거
        if (item.y > canvas.height) {
            recoveryItems.splice(index, 1);
        }
    });
}

// 충돌 감지 함수
function checkCollisions() {
    // 적과 총알 간의 충돌 감지
    for (let i = 0; i < enemies.length; i++) {
        for (let j = 0; j < bullets.length; j++) {
            if (bullets[j].x < enemies[i].x + enemies[i].width &&
                bullets[j].x + bullets[j].width > enemies[i].x &&
                bullets[j].y < enemies[i].y + enemies[i].height &&
                bullets[j].y + bullets[j].height > enemies[i].y) {
                // 총알과 적이 충돌한 경우 적을 제거하고 총알을 제거하고 점수를 증가시킴
                bullets.splice(j, 1);
                enemies.splice(i, 1);
                increaseScore();
                break;
            };
        };
    };

    // 플레이어와 적 간의 충돌 감지
    for (let i = 0; i < enemies.length; i++) {
        if (player.x < enemies[i].x + enemies[i].width &&
            player.x + player.width > enemies[i].x &&
            player.y < enemies[i].y + enemies[i].height &&
            player.y + player.height > enemies[i].y) {
            // 플레이어와 적이 충돌한 경우 플레이어의 생명을 감소시키고 적을 제거
            // 여기서는 간단히 플레이어의 생명을 1 감소시킵니다.
            enemies.splice(i, 1);
            decreasePlayerHealth(); // 플레이어 체력 감소
            console.log('Player hit!');
        };
    };
};

// 플레이어와 아이템 간의 충돌 감지 함수
function checkItemCollisions() {
    for (let i = 0; i < recoveryItems.length; i++) {
        if (player.x < recoveryItems[i].x + recoveryItems[i].width &&
            player.x + player.width > recoveryItems[i].x &&
            player.y < recoveryItems[i].y + recoveryItems[i].height &&
            player.y + player.height > recoveryItems[i].y) {
            // 플레이어와 아이템이 충돌한 경우 플레이어의 체력 회복하고 아이템 제거
            recoveryItems.splice(i, 1);
            increasePlayerHealth(); // 플레이어 체력 회복
            console.log('Player recovered!');
        }
    }
}

// 플레이어 체력 증가 함수
function increasePlayerHealth() {
    game.playerHealth.currentHealth++; // 현재 체력을 1 증가시킴
    // 최대 체력을 초과하지 않도록 제한
    if (game.playerHealth.currentHealth > game.playerHealth.maxHealth) {
        game.playerHealth.currentHealth = game.playerHealth.maxHealth;
    }
}

// 플레이어 체력 감소 함수
function decreasePlayerHealth() {
    game.playerHealth.currentHealth--; // 현재 체력을 1 감소시킴
};

// 적 제거 시 점수 증가 함수
function increaseScore() {
    game.score += 10; // 점수 10점 증가
};

// 플레이어 체력 표시 함수
function drawPlayerHealth() {
    const heartSize = 50; // 하트 크기
    const heartPadding = 5; // 하트 간격
    const heartStartX = canvas.width - (game.playerHealth.maxHealth * (heartSize + heartPadding)); // 시작 위치 계산

    for (let i = 0; i < game.playerHealth.maxHealth; i++) {
        const heartX = heartStartX + i * (heartSize + heartPadding); // 각 하트의 x 좌표
        const heartY = 10; // y 좌표
        // 플레이어의 현재 체력보다 작은 인덱스의 하트만 채워진 상태로 그리기
        if (i < game.playerHealth.currentHealth) {
            ctx.drawImage(heartImage, heartX, heartY, heartSize, heartSize);
        };
    };
};

// 게임 결과 확인 함수
function checkGameResult() {
    if (game.playerHealth.currentHealth <= 0) {
        console.log('Game over! Score: ' + game.score);
        // 게임 오버 처리를 원하는 대로 추가하세요.
        // 여기서는 간단히 새로고침하도록 구현합니다.
        window.location.reload();
    };
};



// 게임 루프
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //플레이어 그리기
    drawPlayer();

    // 적 그리기
    drawEnemies()

    // 총알 그리기
    ctx.fillStyle = '#fff';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    // 아이템 그리기
    drawRecoveryItem()

    // 충돌 감지
    checkCollisions();

    // 아이템과 플레이어 간의 충돌 감지
    checkItemCollisions();

    // 게임 결과 확인
    checkGameResult();

    // 적 생성
    if (Math.random() < game.enemySpawnRate) {
        createEnemy();
    }

    // 아이템 생성
    if (Math.random() < 0.003) { // 적당한 확률로 아이템 생성
        createRecoveryItem();
    }

    // 적 이동
    moveEnemies();

    // 총알 이동
    moveBullets();

    // 아이템 이동
    moveItems();

    // 적 속도와 생성 속도를 레벨에 따라 증가
    game.enemySpeed += 0.001;
    game.enemySpawnRate += 0.000005;

    // 점수 표시
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + game.score, 10, 30);

    //플레이어 체력 표시
    drawPlayerHealth()


    //다음 프레임 요청
    requestAnimationFrame(gameLoop);
};

// 키보드 이벤트 리스너
window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowLeft':
            if (player.x > 0) {
                player.x -= player.speed;
            }
            break;
        case 'ArrowRight':
            if (player.x < canvas.width - player.width) {
                player.x += player.speed;
            }
            break;
        case 'ArrowDown':
            if (player.y < canvas.height - player.height) {
                player.y += player.speed;
            }
            break;
        case 'ArrowUp':
            if (player.y > 0) {
                player.y -= player.speed;
            }
            break;
        case ' ':
            createBullet();
            break;

    };
});

// 게임 시작
gameLoop();