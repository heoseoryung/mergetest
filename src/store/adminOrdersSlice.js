// Redux Toolkit에서 createSlice import
import { createSlice } from '@reduxjs/toolkit';

// ==============================
// 🗂 주문(order) 상태 관리 slice 생성
// ==============================
let orders = createSlice({
  // slice 이름 (Redux DevTools에서 보임)
  name: 'orders',

  // 초기 상태값
  initialState: {
    data: [],       // 주문 리스트 데이터
    page: 0,        // 현재 페이지 번호 (페이징용)
    isUpdate: false // 업데이트 여부 (재요청 트리거용)
  },

  // ==============================
  // 상태 변경 함수들 (reducers)
  // ==============================
  reducers: {

    // 📦 주문 데이터 전체 업데이트
    setOrdersStore(state, action) {
      // 기존 state에 새로운 데이터 덮어쓰기
      // action.payload에 들어온 값으로 상태 갱신
      return Object.assign(state, action.payload);
    },

    // 🔄 주문 상태 초기화
    initOrderStore() {
      // 상태를 초기값으로 리셋
      return {
        data: [],
        page: 0
      };
    },

    // 🔔 업데이트 여부 변경
    isOrderUpdate(state, action) {
      // isUpdate 값을 true/false로 변경
      state.isUpdate = action.payload;
    },
  },
});

// ==============================
// 📤 action 함수 export
// ==============================
// 컴포넌트에서 dispatch로 사용
export const { setOrdersStore, initOrderStore, isOrderUpdate } = orders.actions;

// ==============================
// 📤 reducer export
// ==============================
// store에 등록할 때 사용
export default orders;