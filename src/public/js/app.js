const socket = new WebSocket(`ws://${window.location.host}`); // 웹 클라이언트(브라우저)에서 WebSocket 서버에 연결할 때 사용

// 웹소켓 연결이 성공해서 열렸을 때 실행되는 함수
socket.addEventListener("open", () => {
    console.log("Connected to Server ⭕️"); 
});

// 서버로부터 메시지를 받았을 때 실행되는 함수
socket.addEventListener("message", (message) => {
    console.log("New message: ", message.data);
})

// 서버와의 연결이 끊겼을 때 실행되는 함수
socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❌"); 
});

// 10초(10000밀리초)후에 실행되는 코드
setTimeout(() => {
    socket.send("hello from the browser"); // 서버에게 "hello from the browser" 메시지를 보냄
}, 10000);