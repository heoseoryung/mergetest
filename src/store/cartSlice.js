import { createSlice } from '@reduxjs/toolkit';

// ==============================
// 🛒 장바구니 상태 관리 slice
// ==============================
let cart = createSlice({
  // slice 이름
  name: 'cart',

  // 초기 상태: 장바구니 상품 목록 배열
  initialState: [],

  reducers: {
    // ==============================
    // ➕ 상품 수량 증가
    // ==============================
    increaseCount(state, action) {
      // 예전 방식:
      // state[action.payload].count += 1;
      // → 인덱스로 접근하면 정렬 바뀌었을 때 문제 생길 수 있음

      // payload로 넘어온 상품 id와 같은 상품의 위치 찾기
      let num = state.findIndex((obj) => {
        return obj.id === action.payload;
      });

      console.log(num);

      // 해당 상품 count 1 증가
      state[num].count += 1;
    },

    // ==============================
    // ➖ 상품 수량 감소
    // ==============================
    decreaseCount(state, action) {
      // payload로 넘어온 상품 id와 같은 상품의 위치 찾기
      let num = state.findIndex((obj) => {
        return obj.id === action.payload;
      });

      console.log(num);

      // 해당 상품 count 1 감소
      state[num].count -= 1;
    },

    // ==============================
    // 📦 상품 장바구니에 추가
    // ==============================
    insertItem(state, action) {
      // 이미 장바구니에 같은 상품이 있는지 확인
      let num = state.findIndex((obj) => {
        return obj.id === action.payload.id;
      });

      // 없다면 새 상품 추가
      if (num === -1) {
        state.push(action.payload);
      } else {
        // 이미 있으면 수량만 증가
        state[num].count += action.payload.count;
      }
    },

    // ==============================
    // 🗑 장바구니 상품 삭제
    // ==============================
    deleteItem(state, action) {
      // payload로 넘어온 id와 같은 상품 위치 찾기
      let num = state.findIndex((obj) => {
        return obj.id === action.payload;
      });

      // 해당 위치 상품 삭제
      state.splice(num, 1);
    },

    // ==============================
    // ✅ 개별 상품 체크 상태 변경
    // ==============================
    checkedChange(state, action) {
      // payload로 넘어온 id와 같은 상품 위치 찾기
      let num = state.findIndex((obj) => {
        return obj.id === action.payload;
      });

      // checked true ↔ false 토글
      state[num].checked = !state[num].checked;
    },

    // ==============================
    // ✅ 전체 상품 체크
    // ==============================
    allCheckedTrue(state, action) {
      state.forEach((obj) => {
        obj.checked = true;
      });
    },

    // ==============================
    // ❌ 전체 상품 체크 해제
    // ==============================
    allCheckedFalse(state, action) {
      state.forEach((obj) => {
        obj.checked = false;
      });
    }
  },
});

// action 함수 export
export let {
  increaseCount,
  decreaseCount,
  insertItem,
  deleteItem,
  checkedChange,
  allCheckedTrue,
  allCheckedFalse
} = cart.actions;

// reducer export
export default cart;