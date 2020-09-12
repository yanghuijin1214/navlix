import React from "react";
import { Link } from "react-router-dom";

class KorQr extends React.Component {
  random = Math.floor(Math.random() * 100);

  state = {
    count: 180,
    adarray: ["qrcode1", "qrcode2", "qrcode3"],
    randomImage: Math.floor(Math.random() * 3),
  };

  timer = setInterval(
    function () {
      this.setState({ count: this.state.count - 1 });
    }.bind(this),
    1000
  );

  componentDidMount() {
    const timer = this.timer;
    if (this.state.count <= 0) {
      clearInterval(timer);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { adarray, randomImage } = this.state;
    return (
      <>
        <div className="qrcodeWrap">
          <h2>QR코드 로그인</h2>
          <p>
            모바일 기기로 QR코드를 활영한 후<br />
            화면에 나타나는 숫자 중<span id="qr_number">[{this.random}]</span>
            을/를 누르세요.
          </p>
          <div className={adarray[randomImage]}></div>
          <p className="qr_left">
            남은 시간&nbsp;
            <span id="qr_time">
              0{Math.floor(this.state.count / 60)}:
              {this.state.count % 60 < 10 ? 0 : null}
              {this.state.count % 60}
            </span>
          </p>
        </div>
        <Link className="qr_exit" to="/login">
          취소
        </Link>
      </>
    );
  }
}

export default KorQr;
