import React from 'react';

function Simplelogin(){
    return(<>
        <h2 className="easyLogin">더욱 간편한 로그인</h2>
          <div className="easyWay">
            <ul className="easyWayBtns">
              <li className="qrCode"><a href="/">QR코드 로그인</a></li>
              <li className="disposable"><a href="/">일회용 번호 로그인</a></li>
            </ul>
            <ul className="findAccount">
              <li><a href="/">아이디 찾기</a></li>
              <li><a href="/">비밀번호 찾기</a></li>
              <li><a href="/">회원가입</a></li>
            </ul>
          </div>
    </>)
}

export default Simplelogin;