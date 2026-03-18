import Button from '../common/Button'; // 공통 버튼 컴포넌트 import
import style from './infoList.module.scss'; // CSS 모듈 스타일 import

// ==============================
// 🧾 입력 폼 컴포넌트
// ==============================
export const InfoList = ({ label, input, button }) => {

  // input 객체에서 필요한 값 구조 분해 할당
  const {
    name,         // input name
    value,        // 입력값
    type,         // input 타입 (text, password 등)
    required,     // 필수 여부
    onChange,     // 값 변경 함수
    placeholder,  // placeholder 텍스트
    checkInput    // 유효성 검사 결과
  } = input;

  // ==============================
  // ❌ 에러 상태 판단
  // ==============================
  const isError =
    value?.length !== 0 &&        // 값이 있고
    checkInput &&                // 검사 객체 존재하고
    checkInput.isConfirm === false; // 유효성 실패

  return (
    <section className={style.inputList}>

      {/* ==============================
          📌 라벨 영역
      ============================== */}
      <section className={style.inputList_label}>
        {label}
        {/* 필수 입력이면 * 표시 */}
        {required && <span className={style.required}>*</span>}
      </section>

      {/* ==============================
          ✏️ 입력창 영역
      ============================== */}
      <section className={style.inputList_input}>
        <input
          name={name}                  // input name
          value={value}                // 입력값
          type={type ?? 'text'}        // type 없으면 text 기본값
          onChange={onChange}          // 입력 변경 이벤트
          placeholder={placeholder}   // 안내 텍스트
          className={isError ? `${style.inputError}` : null} // 에러 시 스타일 적용
        />

        {/* 에러 메시지 표시 */}
        {isError && (
          <span className={style.errorMsg}>
            {checkInput.errorMessage}
          </span>
        )}
      </section>

      {/* ==============================
          🔘 버튼 영역
      ============================== */}
      <section className={style.inputList_button}>
        {/* button이 있을 때만 렌더링 */}
        {button && (
          <Button
            name={button.name}
            onClick={button.onClick}
          />
        )}
      </section>

    </section>
  );
};

const  increaseCartCount = 