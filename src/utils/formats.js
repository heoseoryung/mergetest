// ==============================
// 📅 날짜 포맷 함수
// ==============================
const formatDate = (target) => {
  // 전달받은 값을 Date 객체로 변환
  const date = new Date(target);

  // 연도 (문자열로 변환 + 최소 2자리 맞춤)
  const year = String(date.getFullYear()).padStart(2, 0);

  // 월 (0부터 시작하므로 +1)
  const month = String(date.getMonth() + 1).padStart(2, 0);

  // 일
  const today = String(date.getDate()).padStart(2, 0);

  // 시간
  const hour = String(date.getHours()).padStart(2, 0);

  // 분
  const min = String(date.getMinutes()).padStart(2, 0);

  // 최종 포맷: 2026.03.17 | 14:05
  return `${year}.${month}.${today} | ${hour}:${min}`;
};

// ==============================
// 💰 가격 포맷 함수
// ==============================
const formatPrice = (target) => {
  // 값이 존재할 때만 실행 (null, undefined 방지)
  if (target) {
    // 숫자를 한국 형식으로 변환 (천 단위 콤마)
    // 예: 10000 → 10,000
    let result = target.toLocaleString('ko-KR');

    return result;
  }
};

// ==============================
// 📦 외부에서 사용할 수 있도록 export
// ==============================
export { formatDate, formatPrice };