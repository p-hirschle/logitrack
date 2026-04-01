package com.logitrack.backend.controller;

import com.logitrack.backend.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        log.debug("Tentativa de login:");
        log.debug("Username: '{}'", username);
        log.debug("Password Length: {}", (password != null ? password.length() : "null"));

        try {
            // tentativa de autenticação
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            log.debug("Autenticação feita com sucesso para: '{}'", username);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            String token = jwtService.generateToken(userDetails);

            return ResponseEntity.ok(Map.of(
                "message", "Login successful",
                "token", token
            ));
        } catch (BadCredentialsException e) {
            log.warn("Autenticação falhou para usuário: '{}'", username);
            return ResponseEntity.status(401).body(Map.of("message", "Usuário ou senha inválidos"));
        } catch (Exception e) {
            log.error("Erro de autenticação para usuário: '{}': {}", username, e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("message", "Erro interno no servidor: " + e.getMessage()));
        }
    }
}
