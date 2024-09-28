package com.sb.googletest.controller;

import com.sb.googletest.dto.UserInfo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class GoogleLoginController {

    // Google의 client ID
    private static final String GOOGLE_CLIENT_ID = "311577874472-0na5rcj6fk873kue695c5uth3tlujdau.apps.googleusercontent.com";

    @GetMapping("/userinfo")
    public ResponseEntity<UserInfo> getUserInfo(@RequestHeader("Authorization") String authorizationHeader) {
        // "Bearer "를 제거하여 idToken 추출
        String idToken = authorizationHeader.replace("Bearer ", "");

        try {
            // Google ID 토큰을 검증하기 위한 디코더 생성
            JwtDecoder jwtDecoder = JwtDecoders.fromIssuerLocation("https://accounts.google.com");
            Jwt decodedJwt = jwtDecoder.decode(idToken);

            // 토큰에서 이메일과 이름 추출
            String email = decodedJwt.getClaimAsString("email");
            String name = decodedJwt.getClaimAsString("name");

            // 검증된 사용자 정보 반환
            UserInfo userInfo = new UserInfo(email, name);
            return ResponseEntity.ok(userInfo);
        } catch (JwtException e) {
            // 토큰 검증 실패 시 401 반환
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
