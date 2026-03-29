package com.email.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class Ajay1 {
    @ExceptionHandler(Ajay2.class)
    public ResponseEntity<String> invalid(){
        return new ResponseEntity<>("you illegal entry", HttpStatus.NOT_FOUND);
    }

}
