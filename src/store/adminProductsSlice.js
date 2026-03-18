import { createSlice } from '@reduxjs/toolkit';

// ==============================
// 🛍 상품 상태 관리 slice
// ==============================
let products = createSlice({
  // slice 이름
  name: 'products',

  // 초기 상태값
  initialState: {
    data: [],       // 상품 리스트 데이터
    page: 0,        // 현재 페이지 번호
    isUpdate: false // 상품 데이터 갱신 여부
  },

  reducers: {

    // ==============================
    // 📦 상품 데이터 전체 업데이트
    // ==============================
    setProductsStore(state, action) {
      // 기존 state에 payload 덮어쓰기
      // ex) data, page, isUpdate 등 업데이트
      return Object.assign(state, action.payload);
    },

    // ==============================
    // ♻ 상품 상태 초기화
    // ==============================
    initProductsStore() {
      // 초기 상태로 리셋
      return {
        data: [],
        page: 0
      };
    },

    // ==============================
    // 🔄 상품 갱신 여부 변경
    // ==============================
    isProductsUpdate(state, action) {
      // true / false 값으로 변경
      state.isUpdate = action.payload;
    },
  },
});

// action 함수 export
export const {
  setProductsStore,
  initProductsStore,
  isProductsUpdate
} = products.actions;

// reducer export (store에 등록용)
export default products;