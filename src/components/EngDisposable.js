import React from "react";
import { Link } from "react-router-dom";

class EngDisposable extends React.Component {
  render() {
    return (
      <>
        <div className="disposableWrap">
          <h2>Sign in with disposable number</h2>
          <p>
            Please select 'Get a disposable sign-in number' and enter
            <br />
            the generated number from [Settings &gt; Login ID Management]
            <br />
            on Naver App
          </p>
          <input
            type="text"
            className="disposableInput"
            placeholder="Disposable sign-in number"
          />
          <button className="disposableLogin">Sign in</button>
        </div>
        <Link className="disposable_exit" to="/login">
          Cancel
        </Link>
      </>
    );
  }
}
export default EngDisposable;
