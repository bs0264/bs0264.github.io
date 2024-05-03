//import BLOCKS from "./blocks.js";

// DOM
const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector(".game-text");
const scoreDisplay = document.querySelector(".score");
const restartButton = document.querySelector(".game-text > button");
// Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

//variables
let score = 0;
let duration = 500;
let downInterval; //현재 움직이는 블록을 아래로 이동시키는 동작을 제어함
let tempMovingItem; //움직이는 블록의 상태를 임시로 저장하는 객체

const movingItem = {
    type: "", //블록의 종류
    direction: 3, //블록의 방향
    top: 0, //
    left: 0,
}; // 다음 블럭의 타입과 변수의 정보를 가지고 있는 함수 

init() // 게임 초기화 담당 함수

// functions
function init() {
    score = 0; // 점수 초기화
    scoreDisplay.innerText = score; // 점수 표시 갱신
    tempMovingItem = { ...movingItem }; //값만 가져와서 넣음
    for (let i = 0; i < GAME_ROWS; i++) {
        prependNewLine() //함수를 호출하여 게임판에 빈 줄을 추가 = 초기화 (GAME_ROWS 빈줄 추가)
    }
    generateNewBlock() //함수를 호출하여 새로운 블록 생성 = 게임 시작시 새로운 블록을 게임판 상단에 나타냄
}
function prependNewLine() {
    const li = document.createElement("li"); //새로운 줄을 나타냄
    const ul = document.createElement("ul");
    for (let j = 0; j < GAME_COLS; j++) {
        const matrix = document.createElement("li");
        ul.prepend(matrix);
    }
    li.prepend(ul)
    playground.prepend(li); //새로 생성된 줄 요소 <li>를 게임판 `playground`맨 위에 추가함 => 새로운 줄이 게임판의 맨 위에 추가하고 이전에 있던 줄들은 아래로 이동
}

function renderBlocks(moveType = "") { //renderBlock <= 블록 렌더링
    const { type, direction, top, left } = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, "moving");
    })
    BLOCKS[type][direction].some(block => {
        const x = block[0] + left; //블록의 X좌표 `left` = 현재 움직이는 블록의 왼쪽 위치
        const y = block[1] + top; //블록의 Y좌표 `top` = 현재 움직이는 블록의 상단 위치
        
        //const xxx = 조건 ? 참일경우 : 거짓일경우
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null; //`childNodes[0]` = 선택된 항의 첫 번째 열
        //playground.childNodes[y]를 사용하여 게임판의 특정 행(y 좌표)에 해당하는 요소를 가져옵니다. 만약 해당하는 요소가 없다면 (playground.childNodes[y]가 falsy 값인 경우), target 변수에 null을 할당합니다. 이 경우 해당 행에는 블록을 추가할 수 없습니다.
        const isAvailable = checkEmpty(target);
        if (isAvailable) {
            target.classList.add(type, "moving")
        } else {
            tempMovingItem = { ...movingItem } //...는 객체의 분해
            if(moveType === 'retry'){
                clearInterval(downInterval)
                showGameoverText()
            }
            setTimeout(() => {
                renderBlocks('retry');
                if (moveType === "top") { 
                    setizeBlock(); //블록이 최상단에 도달했으므로 함수 호출후 블록 고정 => 새로운 블록 생성
                }
            }, 0)
            return true; //블록 이동 종료
        }

    })
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction; //direction = tempMovingItem

}
function setizeBlock() { // setizeBlock (고정된 블록)
    const movingBlocks = document.querySelectorAll(".moving"); // 현재 움직이는 블록들 선택
    movingBlocks.forEach(moving => { // 선택된 모든 움직이는 블록에 대한 반복문 실행
        moving.classList.remove("moving"); //moving 클래스 제거 (더이상 움직이는 상태 X)
        moving.classList.add("seized"); // 블록이 고정되어 움직이지 않음
    })
    checkMatch() //현재 게임판에서 일치하는 블록들을 확인하고 처리하는 함수
}
function checkMatch(){

    const childNodes = playground.childNodes; //playground 요소의 자식 노드들을 가져와 childNodes에 저장
    childNodes.forEach(child=>{ // 각 요소는 게임판의 한 행을 나타냄
        let matched = true; // 해당 행이 일치
        child.children[0].childNodes.forEach(li=>{ //각 행의 첫번째 열부터 마지막 열까지의 모든 블록에 대한 반복문 실행 . 각 블록은 'li'요소이다.
            if(!li.classList.contains("seized")){
                matched = false; // 해당 행이 일치하지 않음
            }
        })
        if(matched){
            child.remove(); //해당 행 제거
            prependNewLine() //제거된 행 위에 새로운 행 추가
            score++; // 점수 추가
            scoreDisplay.innerText = score; // 점수 화면에 표시
        }
    })

    generateNewBlock()
}
function generateNewBlock() {

    clearInterval(downInterval); //현재 움직이는 블록을 생성하는 interval 초기화 하여 움직임 중지
    downInterval = setInterval(() => {
        moveBlock('top', 1)
    },duration)
    //새로운 블록을 생성하고 아래쪽으로 이동시키는 interval을 설정합니다. moveBlock('top', 1)을 duration 시간 간격으로 반복 실행하여 새로운 블록을 아래쪽으로 이동시킵니다.


    const blockArray = Object.entries(BLOCKS); //BLOCKS 객체를 배열 형태로 변환
    const randomIndex = Math.floor(Math.random() * blockArray.length)
    //랜덤한 숫자를 생성하여 이를 배열의 인덱스로 사용하기 위해 blockArray의 길이에 해당하는 범위 내에서 랜덤한 숫자를 생성합니다.
    movingItem.type = blockArray[randomIndex][0] //랜덤하게 선택된 블록 유형을 'movingItem'객체의 'type'속성에 할당
    movingItem.top = 0; //새로운 블록 초기 위치를 맨위로 설정
    movingItem.left = 3; // 새로운 블록 초기 위치를 가로축 3으로 설정
    movingItem.direction = 0; //새로운 블록의 초기 방향을 0으로 설정
    tempMovingItem = { ...movingItem }; //새로운 블록을 생성 할때마다 'movingItem'객체를 'tempMovingItem' 객체에 복사하여 현재 블록 상태를 저장
    renderBlocks() //새로운 블록의 모양과 위치를 반영하여 표시
}

function checkEmpty(target) {
    if (!target || target.classList.contains("seized")) {
        return false;
    }
    return true;
    //주어진 target이 비어있는지 확인하는 함수
    //1. !target : 대상이 존재하지 않는 경우(범위를 벗어난 경우)
    // target.classList.contains("seized") : 대상이 존재하지만 이미 seized 클래스를 가지고 있는 경우
    //2. return false : 대상이 비어있지 않으면 false를 반환하여 해당 위치가 비어있지 않음을 알림
    //3. return true : 대상이 비어있으면 true를 반환하여 해당 위치가 비어있음을 알림 
}
function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount; //'tempMovingItem' 객체에 'moveType'속성 'amount' 만큼 더함
    renderBlocks(moveType) //움직인 후에 렌더링 함수 호술
}
function changeDirection() {
    const direction = tempMovingItem.direction; //현재 움직이는 블록의 방향 정보를 가지고 옴
    direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
    //현재 방향이 3인경우 0으로 되돌아감 , 그렇지 않으면 1을 더해줌
    renderBlocks();
}
function dropBlock(){
    clearInterval(downInterval); //현재 움직이는 블록을 떨어뜨리는(interval로 움직이는) 동작을 정지하기 위해 이전에 설정한 interval을 초기화
    downInterval = setInterval(() =>{ 
        moveBlock("top" , 1)
    },10) //10밀리초마다 실행하는 새로운 interval 설정 = (블록이 떨어지는 속도 조절)
}
function showGameoverText(){
    gameText.style.display = "flex";
}

// event handling
document.addEventListener("keydown", e => {
    switch (e.keyCode) {
        case 39: // 39 = 오른쪽 화살표 키
            moveBlock("left", 1); // left 속성에 + 1 만큼 더함
            break; 
        case 37: // 37 = 왼쪽 화살표 키
            moveBlock("left", -1)
            break;
        case 40: // 40 = 아래쪽 화살표 키
            moveBlock("top", 1);
            break;
        case 38: // 38 = 위쪽 화살표 키
            changeDirection();
            break;
        case 32: // 32 = 스페이스바
            dropBlock();
            break;
        default: // 아무것도 하지 않았을때 실행되는 코드 블록
            break; 
    }
    // console.log(e)
})

restartButton.addEventListener("click", ()=>{
    playground.innerHTML = "";
    gameText.style.display = "none";
    init() //게임 초기화 담당 변수
})