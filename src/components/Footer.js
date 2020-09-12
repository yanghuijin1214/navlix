import React from "react";
import logo from "../logo.png";

function Footer({ lang }) {
  return (
    <footer className="footer">
      {lang === "Kor" ? (
        <ul>
          <li>
            <a herf="/">이용약관</a>
          </li>
          <li>
            <a herf="/">
              <b>개인정보처리방침</b>
            </a>
          </li>
          <li>
            <a herf="/">책임의 한계와 법적고지</a>
          </li>
          <li>
            <a herf="/">회원정보 고객센터</a>
          </li>
        </ul>
      ) : null}

      <small>
        <img src={logo} alt="naver" />
        <address>
          Copyright &copy;{" "}
          <b>
            <span>Naver</span> Corp.
          </b>{" "}
          All Right Reserved.
        </address>
      </small>
    </footer>
  );
}

export default Footer;
