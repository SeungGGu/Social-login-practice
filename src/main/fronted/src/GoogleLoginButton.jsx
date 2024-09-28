import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ setUserInfo }) => {
    const handleSuccess = (response) => {
        console.log('Login Success:', response);
        const idToken = response.credential;

        // idToken을 백엔드로 전달하여 사용자 정보 가져오기
        fetch('http://localhost:8080/api/userinfo', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${idToken}`,
            },
            credentials: 'include',
        })
            .then((res) => {
                console.log('Response:', res);
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error(`Request failed with status ${res.status}`);
                }
            })
            .then((data) => {
                console.log('User authenticated:', data);
                setUserInfo(data);
            })
            .catch((error) => console.error('Error during fetching user info:', error));
    };

    const handleError = (error) => {
        console.error('Login Failed:', error);
    };

    return (
        <GoogleOAuthProvider clientId="311577874472-0na5rcj6fk873kue695c5uth3tlujdau.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                theme="outline"
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleLoginButton;
