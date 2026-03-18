// axios 라이브러리 import (HTTP 요청 보내는 도구)
import axios from "axios";

// ==============================
// 🌐 API 요청 공통 함수
// ==============================
export const request = ({
  method = "GET",   // 요청 방식 (기본값: GET)
  url = "",         // API 주소 (엔드포인트)
  reqData = {},     // 요청 데이터 (body)
}) => {

  // 요청 시작 시 마우스 커서를 로딩 상태로 변경
  document.body.style.cursor = "wait";

  // localStorage에 저장된 토큰 가져오기
  // 문자열 → 객체로 변환
  const accessToken = JSON.parse(localStorage.getItem("token"));

  // axios 요청 실행
  return axios({
    headers: {
      // 요청 데이터 타입
      "content-type": "application/json",

      // 환경변수에 저장된 API 키
      apikey: process.env.REACT_APP_API_KEY,

      // 환경변수에 저장된 사용자 이름
      username: process.env.REACT_APP_USER_NAME,

      // 인증 토큰 (있을 경우에만 추가)
      // Bearer 토큰 방식 사용
      Authorization: accessToken
        ? `Bearer ${accessToken}`
        : undefined,
    },

    // HTTP 요청 방식 (GET, POST, PUT, DELETE 등)
    method,

    // 기본 URL + 전달받은 url 합쳐서 요청
    url: process.env.REACT_APP_BASE_URL + url,

    // 요청 body 데이터 (POST, PUT에서 사용)
    data: reqData,
  })

    // ==============================
    // ✅ 요청 성공 시
    // ==============================
    .then((res) => {
      // 커서를 다시 기본 상태로 변경
      document.body.style.cursor = "default";

      // 응답 데이터 반환
      return res;
    })

    // ==============================
    // ❌ 요청 실패 시
    // ==============================
    .catch((err) => {
      // 에러 로그 출력
      console.log(err);

      // 커서를 다시 기본 상태로 변경
      document.body.style.cursor = "default";

      // 서버에서 내려준 에러 응답 반환
      return err.response;
    });
};

//받는 토큰마다 다름 큰구조는 똑같음 코드 