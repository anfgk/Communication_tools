const messageList = document.querySelector("ul"); // ul 태그 선택
const nickForm = document.querySelector("#nick"); // form 태그 선택
const messageForm = document.querySelector("#message"); // form 태그 선택
const socket = new WebSocket(`ws://${window.location.host}`); // 웹 클라이언트(브라우저)에서 WebSocket 서버에 연결할 때 사용

// 메시지 형식 만들기
function makeMessage(type, payload) {
    const msg = {type, payload}; // 메시지 형식 만들기
    return JSON.stringify(msg); // 메시지 형식을 JSON 형식으로 변환
}

// 웹소켓 연결이 성공해서 열렸을 때 실행되는 함수
// socket.addEventListener("open", () => {
//     console.log("Connected to Server ⭕️"); 
// });

// 웹소켓 연결이 성공해서 열렸을 때 실행되는 함수
function handleOpen() {
    console.log("Connected to Server ⭕️"); 
}

// 웹소켓 연결이 성공해서 열렸을 때 실행되는 함수 호출
 socket.addEventListener("open", handleOpen)

// 서버로부터 메시지를 받았을 때 실행되는 함수
socket.addEventListener("message", (message) => {
    const li = document.createElement("li"); // li 태그 생성
    li.innerText = message.data; // li 태그에 메시지 추가
    messageList.append(li); // li 태그를 messageList에 추가
})

// 서버와의 연결이 끊겼을 때 실행되는 함수
socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❌"); 
});

// 10초(10000밀리초)후에 실행되는 코드
// setTimeout(() => {
//     socket.send("hello from the browser"); // 서버에게 "hello from the browser" 메시지를 보냄
// }, 10000);


// 메시지 전송 함수
function handleSubmit(event) {
    event.preventDefault(); // 기본 동작 방지
    const input = messageForm.querySelector("input"); // input 태그 선택
    // socket.send(input.value); // 서버에게 메시지 보내기
    socket.send(makeMessage("new_message", input.value)); // 서버에게 메시지 보내기
    input.value = ""; // 보낸 메시지를 콘솔에 출력
}

// 닉네임 전송 함수
function handleNickSubmit(event) {
    event.preventDefault(); // 기본 동작 방지
    const input = nickForm.querySelector("input"); // input 태그 선택
    // socket.send(input.value); // 서버에게 메시지 보내기
    socket.send(makeMessage("nickname", input.value)); // 서버에게 메시지 보내기
}

messageForm.addEventListener("submit", handleSubmit) // form 태그에서 submit 이벤트가 발생했을 때 handleSubmit 함수를 실행
nickForm.addEventListener("submit", handleNickSubmit) // form 태그에서 submit 이벤트가 발생했을 때 handleNickSubmit 함수를 실행