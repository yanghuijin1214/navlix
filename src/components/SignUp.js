import React from "react";
import { Link } from "react-router-dom";

class SignUp extends React.Component {
  render() {
    return (
      <div>
        <form
          id="textarea"
          action=""
          method="post"
          onSubmit={(e) => {
            const signUp = "signUp";
            const signUpList = [];
            const LS_item = JSON.parse(localStorage.getItem(signUp));

            if (LS_item !== null) {
              signUpList.push(...LS_item);
            }

            if (signUpList.find((object) => object.id === e.target.id.value)) {
              e.preventDefault();
              alert("이미 존재하는 id 입니다!");
              e.target.id.value = "";
              e.target.pw.value = "";
            } else {
              const signUpObject = {
                id: e.target.id.value,
                pw: e.target.pw.value,
              };
              signUpList.push(signUpObject);
              localStorage.setItem(signUp, JSON.stringify(signUpList));
              alert("회원가입에 성공하셨습니다. 로그인해주세요.");
            }
          }}
        >
          <input name="id" type="text" placeholder="아이디" className="input" />
          <input
            name="pw"
            type="password"
            placeholder="비밀번호"
            className="input"
          />
          <input type="submit" className="loginBtn" value="회원가입" />
          <div>
            <Link to="/login" className="backToHome">
              취소
            </Link>
          </div>
          <ul>{this.liList}</ul>
        </form>
      </div>
    );
  }
}

export default SignUp;
