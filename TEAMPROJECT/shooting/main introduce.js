// Canvas와 2D context 생성
const canvas = document.getElementById('gameCanvas'); //캔버스 변수선언
const ctx = canvas.getContext('2d'); // 캔버스에 2d 그리기 컨텍스트 설정 / 캔버스에 모양, 텍스트 및 이미지를 그릴 수 있도록 그리기 컨텍스트를 초기화

// 게임 상태 초기화
const game = {
    level: 1, //게임의 레벨
    enemySpeed: 2, // 적의 이동 속도
    enemySpawnRate: 0.02, // 적 스폰까지 걸리는 시간
    score: 0, //점수
    playerHealth: { 
        maxHealth: 3, //최대체력 3
        currentHealth: 3 //현재체력 3
    }
};

// 비행기 설정
const player = {
    x: canvas.width / 2, //가운데 위치 시키기
    y: canvas.height - 50, //아래 위치 시키기
    width: 100, //넓이
    height: 50, //높이
    speed: 50, //이동속도
    lives: 3 // 플레이어 생명
};

// 총알, 적 배열
const bullets = [];
const enemies = [];

// 총알 생성 함수
function createBullet() {
    bullets.push({
        x: player.x + player.width / 2,
        y: player.y,
        width: 2,
        height: 10,
        speed: 30
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

// 플레이어 체력 감소 함수
function decreasePlayerHealth() {
    game.playerHealth.currentHealth--; // 현재 체력을 1 감소시킴
};

// 적 제거 시 점수 증가 함수
function increaseScore() {
    game.score += 10; // 점수 10점 증가
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

    // 비행기 그리기
    ctx.fillStyle = '#00f';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // 적 그리기
    ctx.fillStyle = '#f00';
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });

    // 총알 그리기
    ctx.fillStyle = '#0f0';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });

    // 충돌 감지
    checkCollisions();

    // 게임 결과 확인
    checkGameResult();

    // 적 생성
    if (Math.random() < game.enemySpawnRate) {
        createEnemy();
    };

    // 적 이동  
    moveEnemies();

    // 총알 이동
    moveBullets();

    // 적 속도와 생성 속도를 레벨에 따라 증가
    game.enemySpeed += 0.005;
    game.enemySpawnRate += 0.000005;

    // 점수 표시
    ctx.fillStyle = '#fff';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + game.score, 10, 30);

    // 플레이어 체력 표시
    ctx.fillStyle = '#f00';
    ctx.font = '20px Arial';
    ctx.fillText('Health: ' + game.playerHealth.currentHealth, canvas.width - 120, 30);


    requestAnimationFrame(gameLoop);
}

// 게임 시작
gameLoop();

// 키보드 이벤트 리스너
window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowLeft':
            if (player.x > 0) {
                player.x -= player.speed;
            };
            break;
        case 'ArrowRight':
            if (player.x < canvas.width - player.width) {
                player.x += player.speed;
            };
            break;
        case 'ArrowDown':
            if (player.y < canvas.height - player.height) {
                player.y += player.speed;
            };
            break;
        case 'ArrowUp':
            if (player.y > 0) {
                player.y -= player.speed;
            };
            break;
        case 'ArrowUp, ArrowLeft':
            if (player.y > 0, player.x > 0) {
                player.y -= player.speed;
                player.x -= player.speed;
            };
            break;
        case ' ':
            createBullet();
            break;

    };
});