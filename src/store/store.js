import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 로컬스토리지 엔진

// 슬라이스 리듀서 임포트
import cart from './cartSlice.js';
import user from './userSlice.js';
import loading from './loadingSlice.js';
import like from './likeSlice.js';
import orders from './adminOrdersSlice.js';
import products from './adminProductsSlice.js';

// Persist 환경 설정
const persistConfig = {
  key: 'root',               // 저장 데이터의 기본 키
  storage: storage,          // 저장소 종류 (LocalStorage)
  whitelist: ['cart', 'user', 'like'], // 새로고침해도 유지할 데이터 목록
  blacklist: ['loading', 'orders', 'products'], // 유지하지 않을 데이터 목록
};

// 모든 리듀서 하나로 통합
const reducer = combineReducers({
  cart: cart.reducer,        // 장바구니 상태 관리
  user: user.reducer,        // 로그인 유저 정보 관리
  loading: loading.reducer,  // 전역 로딩 스피너 상태
  like: like.reducer,        // 찜한 상품 목록
  orders: orders.reducer,    // 관리자 전용: 주문 내역
  products: products.reducer, // 관리자 전용: 상품 관리
});

// 통합 리듀서에 Persist 적용
const persistedReducer = persistReducer(persistConfig, reducer);

// 스토어 생성 및 내보내기
const store = configureStore({
  reducer: persistedReducer, // 영속성 설정이 적용된 리듀서 등록
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Persist 사용 시 발생하는 직렬화 경고 무시
    }),
});

export default store;







import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 브라우저의 LocalStorage 사용

// 각 기능별 Slice(리듀서) 불러오기
import cart from './cartSlice.js';
import user from './userSlice.js';
import loading from './loadingSlice.js';
import like from './likeSlice.js';
import orders from './adminOrdersSlice.js';
import products from './adminProductsSlice.js';

/**
 * [Redux-Persist 설정]
 * 브라우저를 새로고침해도 상태(state)가 초기화되지 않도록 LocalStorage에 저장하는 설정
 */
const persistConfig = {
  key: 'root',      // 저장소에 기록되는 데이터의 key 이름
  storage: storage, // 사용할 저장소 종류 (여기서는 LocalStorage)
  
  // 새로고침해도 유지하고 싶은 리듀서 이름들 (장바구니, 유저정보, 찜목록 등)
  whitelist: ['cart', 'user', 'like'], 
  
  // 새로고침하면 초기화되어야 하는 리듀서 이름들 (로딩 상태, 관리자 주문/상품 목록 등)
  // 사실 whitelist에 없는 것들은 자동으로 제외되지만, 명시적으로 관리할 때 작성함
  blacklist: ['loading', 'orders', 'products'], 
};

/**
 * [Root Reducer 구성]
 * 여러 개의 슬라이스 리듀서들을 하나로 합치는 과정
 * 쿠팡 같은 큰 프로젝트는 관리할 상태가 많으므로 이 과정이 필수임
 */
const reducer = combineReducers({
  cart: cart.reducer,         // 장바구니 상태
  user: user.reducer,         // 사용자 로그인 및 프로필 정보
  loading: loading.reducer,   // 앱 전역 로딩 상태 (API 호출 시 사용)
  like: like.reducer,         // 상품 찜하기(관심상품) 목록
  orders: orders.reducer,     // [관리자] 주문 관리 상태
  products: products.reducer, // [관리자] 상품 관리 상태
});

// 위에서 만든 전체 리듀서에 Persist 설정 적용
const persistedReducer = persistReducer(persistConfig, reducer);

/**
 * [Redux Store 생성]
 * 애플리케이션의 모든 상태를 담는 중앙 저장소
 */
const store = configureStore({
  // 저장된(Persisted) 리듀서를 메인 리듀서로 등록
  reducer: persistedReducer,

  // Redux-Persist 사용 시 직렬화(non-serializable) 관련 에러 방지를 위한 미들웨어 설정
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // persist 액션 객체에 함수 등이 포함될 수 있어 검사를 끔
    }),
});

/**
 * [설계 팁]
 * 1. 모든 데이터를 Redux에 넣으면 성능이 저하될 수 있음.
 * 2. 컴포넌트 내부에서만 쓰이는 단순한 상태(UI 열림/닫힘 등)는 useState() 권장.
 * 3. 서버 데이터(상품 목록 등)는 React Query 같은 라이브러리 사용을 고려해볼 것.
 */

export default store;