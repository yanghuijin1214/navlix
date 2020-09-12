import React from "react";
import { Link } from "react-router-dom";

class EngSignUp extends React.Component {
  render() {
    return (
      <div>
        <form
          id="textarea"
          action="https://yanghuijin1214.github.io/navlix/"
          onSubmit={(e) => {
            const signUp = "signUp";
            const signUpList = [];
            const LS_item = JSON.parse(localStorage.getItem(signUp));

            if (LS_item !== null) {
              signUpList.push(...LS_item);
            }

            if (signUpList.find((object) => object.id === e.target.id.value)) {
              e.preventDefault();
              alert("ID already exists");
              e.target.id.value = "";
              e.target.pw.value = "";
            } else {
              const signUpObject = {
                id: e.target.id.value,
                pw: e.target.pw.value,
              };
              signUpList.push(signUpObject);
              localStorage.setItem(signUp, JSON.stringify(signUpList));
              alert("SignUp Success! Please Login.");
            }
          }}
        >
          <input name="id" type="text" placeholder="ID" className="input" />
          <input
            name="pw"
            type="password"
            placeholder="Password"
            className="input"
          />
          <input type="submit" className="loginBtn" value="SignUp" />
          <div>
            <Link to="/login" className="backToHome">
              Cancel
            </Link>
          </div>
          <ul>{this.liList}</ul>
        </form>
      </div>
    );
  }
}

export default EngSignUp;
