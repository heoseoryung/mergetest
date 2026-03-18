import { createSlice } from '@reduxjs/toolkit';

// ==============================
// ⏳ 로딩 상태 관리 slice
// ==============================
let loading = createSlice({
  // slice 이름
  name: 'loading',

  // 초기 상태: 로딩 여부 (true / false)
  initialState: {
    isLoading: false,
  },

  reducers: {
    // ==============================
    // 🔄 로딩 시작
    // ==============================
    showLoading(state) {
      // API 요청 시작 시 true
      state.isLoading = true;
    },

    // ==============================
    // ✅ 로딩 종료
    // ==============================
    hideLoading(state) {
      // API 요청 끝나면 false
      state.isLoading = false;
    },
  },
});

// action export
export let { showLoading, hideLoading } = loading.actions;

// reducer export (store에 등록용)
export default loading;