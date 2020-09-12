import React from "react";
import { Link } from "react-router-dom";

class KorDisposable extends React.Component {
  render() {
    return (
      <>
        <div className="disposableWrap">
          <h2>일회용 번호 로그인</h2>
          <p>
            네이버앱의 [설정 &gt; 로그인 아이디 관리]에서
            <br />
            '일회용 로그인 번호 받기'를 선택하여 생성된 번호를 입력해 주세요.
          </p>
          <input
            type="text"
            className="disposableInput"
            placeholder="일회용 로그인 번호"
          />
          <button className="disposableLogin">로그인</button>
        </div>
        <Link className="disposable_exit" to="/login">
          취소
        </Link>
      </>
    );
  }
}

export default KorDisposable;
