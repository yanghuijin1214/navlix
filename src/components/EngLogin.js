import React from "react";
import { Link } from "react-router-dom";
import ModalModal from "./ModalModal";
class EngLogin extends React.Component {
  state = {
    success: false,
    article: null,
  };

  render() {
    return (
      <>
        <form
          className="inputForm"
          onSubmit={(e) => {
            e.preventDefault();
            const LS_signUp = JSON.parse(localStorage.getItem("signUp"));
            if (LS_signUp) {
              const idFilter = LS_signUp.filter(
                (account) => account.id === e.target.id.value
              );
              const pwFilter = LS_signUp.filter(
                (account) => account.pw === e.target.pw.value
              );
              if (
                idFilter.length !== 0 &&
                idFilter[0].pw === e.target.pw.value
              ) {
                this.setState({ article: e.target.id.value, success: true });
              } else if (
                pwFilter.length !== 0 &&
                idFilter.length === 0 &&
                pwFilter[0].pw === e.target.pw.value
              ) {
                alert("Wrong ID.");
              } else if (
                idFilter.length !== 0 &&
                idFilter[0].pw !== e.target.pw.value
              ) {
                alert("Wrong Password.");
              } else {
                alert("Wrong Password and ID.");
              }
            } else {
              alert("Please Sign up!");
            }
          }}
        >
          <input name="id" type="text" className="input" placeholder="ID" />
          <input
            name="pw"
            type="password"
            className="input"
            placeholder="PASSWORD"
          />
          <input type="submit" className="loginBtn" value="LOGIN" />
        </form>
        <div className="statewrap">
          <button name="로그인 상태 유지" className="login_stay">
            <i
              className="far fa-check-circle"
              onClick={
                ("click",
                (e) => {
                  if (e.target.className === "far fa-check-circle") {
                    e.target.className = "fas fa-check-circle";
                  } else {
                    e.target.className = "far fa-check-circle";
                  }
                })
              }
            ></i>
            Stay Signed In
          </button>
          <label className="ipSecurity">
            IP Security
            <input type="checkbox" name="IP" id="" />
          </label>
        </div>

        {this.state.success ? <ModalModal id={this.state.article} /> : null}

        <hr className="line" />
        <h2 className="easyLogin">Easier sign in</h2>
        <div className="easyWay">
          <ul className="easyWayBtns">
            <li className="qrCode">
              <Link to="/login/engqr">QR code</Link>
            </li>
            <li className="disposable">
              <Link to="/login/engdisposable">Disposable number</Link>
            </li>
          </ul>
          <ul className="findAccount">
            <li>
              <a href="/">Find ID</a>
            </li>
            <li>
              <a href="/">Find password</a>
            </li>
            <li>
              <Link to="/login/signup">Sign up</Link>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default EngLogin;
