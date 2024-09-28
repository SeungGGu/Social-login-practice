import React, { useState } from 'react';
import GoogleLoginButton from './GoogleLoginButton';

function App() {
    const [userInfo, setUserInfo] = useState(null); // 사용자 정보를 저장할 상태

    return (
        <div className="App">
            <h1>Google Social Login</h1>
            {/* Google 로그인 버튼에 setUserInfo 함수를 props로 전달 */}
            <GoogleLoginButton setUserInfo={setUserInfo} />

            {/* 로그인된 사용자가 있으면 사용자 정보 표시 */}
            {userInfo ? (
                <div>
                    <h2>Welcome, {userInfo.name}!</h2>
                    <p>Email: {userInfo.email}</p>
                </div>
            ) : (
                <p>Please log in to see your information.</p>
            )}
        </div>
    );
}

export default App;