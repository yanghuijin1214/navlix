import React from "react";
import { Link } from "react-router-dom";

function ModalModal({ id }) {
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-title"></div>
        <p id="login_success">로그인 완료!</p>
        <p>환영합니다 {id}님!</p>
        <div className="close-wrapper">
          <Link id="close" to="/movie/home">
            닫기
          </Link>
        </div>
      </div>
    </div>
  );
}
export default ModalModal;
