import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/Register.css';
import axios from '../backend/routes/api/axios';


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$]).{8,24}/;
const REGISTER_URL = "/register";

const Register = () => {

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidUser(result);
  }, [user]);


  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd])


  const handleSubmit = async (e) => {
    e.preventDefault();
    const a = USER_REGEX.test(user);
    const b = PWD_REGEX.test(pwd);
    if (!a || !b) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);

    }
    catch (err) {
      if (!err?.response) {
        setErrMsg('No server Response');
      }
      else if (err.response?.status === 409){
        setErrMsg('Username taken')
      }
      
      else {
        setErrMsg('Registration Failed')
      }
      errRef.current.focus();
    }


  }
  return (
    <>
      {success ? (
        <section>
          <h1>Hello, {user}</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section>
      ) : (
        <section className="form">
          <p ref={errRef} className={errMsg ? "error" : "hide"} aria-live="assertive">{errMsg}</p>
          <h1 className="form__title">Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor='username' className="label">Username:
              <span className={validUser ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} /></span>
              <span className={validUser || !user ? "hide" : "invalid"}>
                < FontAwesomeIcon icon={faTimes} /></span>
            </label>
            <br />
            <input
              className="input"
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validUser ? "false" : "true"}
              aria-describedby='usernote'
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <br />
            <p id="note" className={userFocus && user && !validUser ? "instructions" : "hide"}>
              <FontAwesomeIcon icon={faInfoCircle} className="icon" />
              4 to 24 characters. <br />
              Must begin with a letter. <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
            <label htmlFor='pwd' className="label">Password:
              <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} /></span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                < FontAwesomeIcon icon={faTimes} /></span></label>
            <br />
            <input
              className="input"
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "hide"}>
              <FontAwesomeIcon icon={faInfoCircle} className="icon" />
              8 to 24 characters. <br />
              Must include uppercase and lowercase letters, a number and a special character. <br />
              Allowed special characters: <span aria-label="exclamption mark">!</span>
              <span aria-label="at symbol">@</span>
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar-sing">$</span>
            </p>
            <label htmlFor='confirm_pwd' className="label">Confirm password:
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} /></span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                < FontAwesomeIcon icon={faTimes} /></span></label>
            <br />
            <input
              className="input"
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="matchnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p id="matchnote" className={matchFocus && !validPwd ? "instructions" : "hide"}>
              <FontAwesomeIcon icon={faInfoCircle} className="icon" />
              8 to 24 characters. <br />
              Must match the first password input field.
            </p>
            <button
              className="button"
              disabled={!validUser || !validPwd || !validMatch ? true : false}>Sign Up</button>
          </form>
          <p>You have an account? <a href= "#">Sign in</a></p>
        </section>
      )}
    </>
  )
}

export default Register