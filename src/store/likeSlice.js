import { createSlice } from '@reduxjs/toolkit';

// ==============================
// ❤️ 좋아요(찜) 상태 관리 slice
// ==============================
let like = createSlice({
  // slice 이름
  name: 'like',

  // 초기 상태: 좋아요한 상품 리스트
  initialState: [],

  reducers: {

    // ==============================
    // ❤️ 좋아요 추가
    // ==============================
    insertLike(state, action) {
      // 같은 상품이 이미 있는지 확인
      let num = state.findIndex((el) => {
        return el.id === action.payload.id;
      });

      // 없으면 새로 추가
      if (num === -1) {
        state.push(action.payload);
      } else {
        // 이미 있으면 count 증가 (⚠ 사실 좋아요는 보통 필요 없음)
        state[num].count += action.payload.count;
      }
    },

    // ==============================
    // ❌ 좋아요 삭제
    // ==============================
    deleteLike(state, action) {
      // id로 해당 상품 위치 찾기
      let num = state.findIndex((el) => {
        return el.id === action.payload;
      });

      // 해당 상품 삭제
      state.splice(num, 1);
    },
  },
});

// action export
export let { insertLike, deleteLike } = like.actions;

// reducer export
export default like;