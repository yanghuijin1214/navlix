import React from "react";
import { Link } from "react-router-dom";

class EngQr extends React.Component {
  random = Math.floor(Math.random() * 100);

  state = {
    count: 180,
    adarray: ["qrcode1", "qrcode2", "qrcode3"],
    randomImage: Math.floor(Math.random() * 3),
  };

  componentDidMount() {
    let timer = setInterval(
      function () {
        this.setState({ count: this.state.count - 1 });
        if (this.state.count <= 0) {
          clearInterval(timer);
        }
      }.bind(this),
      1000
    );
  }

  render() {
    const { adarray, randomImage } = this.state;
    return (
      <>
        <div className="qrcodeWrap">
          <h2>Sign in with QR code</h2>
          <p>
            After shooting a QR code with a mobile device, <br />
            Press <span id="qr_number">[{this.random}]</span>among the numbers
            on the pc screen.
            <br />
            You will be signed into the PC with your account.
          </p>
          <div className={adarray[randomImage]}></div>
          <p className="qr_left">
            Valid Time
            <span id="qr_time">
              0{Math.floor(this.state.count / 60)}:
              {this.state.count % 60 < 10 ? 0 : null}
              {this.state.count % 60}
            </span>
          </p>
        </div>
        <Link className="qr_exit" to="/login">
          Cancel
        </Link>
      </>
    );
  }
}

export default EngQr;
