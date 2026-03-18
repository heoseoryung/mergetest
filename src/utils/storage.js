// 브라우저의 localStorage 객체를 가져와서 storage 변수에 저장
const storage = window.localStorage;

// ==============================
// 📦 데이터 가져오기 (GET)
// ==============================
const getItem = (key) => {
  try {
    // localStorage에서 key로 값을 꺼냄 (문자열 상태)
    const item = storage.getItem(key);

    // 값이 있으면 JSON.parse로 객체로 변환해서 반환
    // 없으면 null 반환
    return item ? JSON.parse(item) : null;

  } catch (e) {
    // JSON.parse 실패 (데이터 깨짐 등)
    // 해당 데이터 삭제해서 문제 방지
    storage.removeItem(key);

    // null 반환
    return null;
  }
};

// ==============================
// 📦 데이터 저장하기 (SET)
// ==============================
const setItem = (key, item) => {
  // 객체를 문자열(JSON)로 변환해서 저장
  storage.setItem(key, JSON.stringify(item));
};

// ==============================
// 📦 데이터 삭제하기 (REMOVE)
// ==============================
const removeItem = (key) => {
  // 해당 key 데이터 삭제
  storage.removeItem(key);
};

// 함수들을 외부에서 사용할 수 있도록 export
export { getItem, setItem, removeItem };
