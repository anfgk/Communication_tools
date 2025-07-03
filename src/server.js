import http from "http"; // http 모듈 불러오기
import express from "express"; // express 불러오기
import WebSocket from "ws"; // WebSocket 불러오기
// socket은 연결된 어떤 사람
// socket은 서버와 브라우저 사이의 연결
// 연결된 브라우저와의 contact(연락)
// socket를 어딘가에 저장해야함

const app = express(); // 앱 만들기
// 👉🏻 express()는 웹 서버 만들기 위한 기본 뼈대
// 👉🏻 웹 서버 역할을 하는 Express 애플리케이션 객체

app.set("view engine", "pug"); // pug를 템플릿 엔진으로 사용
// 엔진: HTML을 자동으로 만들어주는 도구
app.set("views", __dirname + "/views"); // 템플릿 파일들이 있는 폴더 설정
app.use("/public", express.static(__dirname + "/public")); // 정적 파일(css, 이미지 등) 제공
app.get("/", (_, res) => res.render("home")); // 홈(/)에 오면 home.pug 보여주기
app.get("/*", (_, res) => res.redirect("/")); // 어떤 주소로 들어와도 홈 페이지로 보내기

const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleListening); // 3000번 포트에서 서버 실행

const server = http.createServer(app); // 서버 만들기
const wss = new WebSocket.Server({ server }); // http 서버,WebSocket 서버 같이 구동

// WebSocket 연결이 새로 생겼을 때 실행되는 콜백 함수
function handleConnection(socket) {
    console.log(socket);
}

wss.on("connection", handleConnection); 
// WebSocket 서버(wss)가 클라이언트와 연결될 때마다 handleConnection 함수를 호출하겠다는 의미

server.listen(3000, handleListen); // 3000번 포트에서 서버 실행