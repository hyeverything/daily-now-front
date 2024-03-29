import { useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";

import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import { userInfo } from "Interface/User";
import FindPw from "./FindPw";
import logo from "asset/img/logo.webp";
import holyddung from "asset/img/holyddung.png";

const useStyles = makeStyles({
  authContainer: {
    padding: "100px",
    width: "100%",
    minWidth: "400px",
    height: "100vh",
  },
  authContainerMobile: {
    width: "100%",
    height: "100vh",
    padding: 0,
    margin: 0,
    paddingTop: "100px",
  },
  authBox: {
    padding: "50px 0",
    borderRadius: "50px",
    background: "#ffffff",
    boxShadow: "13px 13px 34px #b1b1b1, -13px -13px 34px #ffffff",
    overflow: "hidden",
    textAlign: "center",
    minWidth: "400px",
    height: "100%",
    minHeight: "680px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  authBoxMobile: {
    width: "100%",
    height: "100%",
    padding: 0,
    paddingTop: "50px",
    textAlign: "center",
    position: "relative",
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    margin: "8px",
    width: "350px",
  },
  button: {
    marginTop: "20px",
    "& button": {
      margin: "10px",
    },
    marginBottom: "30px",
  },
  loginHoly: {
    position: "absolute",
    right: "6%",
    bottom: "-4%",
  },
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: "10px",
  },
});

interface AuthProps {
  typeNum: string;
  typeName: string;

  handleLogIn: (data: userInfo) => void;
  handleIsAdmin: (value: boolean) => void;
}
export default function Auth(Props: AuthProps) {
  const { typeNum, handleLogIn, handleIsAdmin } = Props;
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width: 380px)");
  const history = useHistory();

  const emailInput = useRef<HTMLInputElement>();
  const [error, setError] = useState(Object);
  const [isLoggedIn, setIsLoggedIn] = useState("");

  /**
   * 이메일, 비밀번호 입력 처리 함수
   */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.id === "email") {
      setEmail(value);
    } else setPassword(value);
  };

  /**
   * 로그인 처리 함수
   */
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const loginInfo = {
      email: email,
      password: password,
    };

    fetch(`${process.env.REACT_APP_SERVER}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(loginInfo),
    })
      .then((res) => {
        res.json().then((data) => {
          if (res.ok) {
            handleLogIn(data);
            setIsLoggedIn("true");

            handleCheckAdmin(data.auth_token);

            window.sessionStorage.setItem("email", email);
            window.sessionStorage.setItem("id", data.id);
            window.sessionStorage.setItem("username", data.username);
            window.sessionStorage.setItem("auth_token", data.auth_token);
            history.push("/");
          } else {
            setError(data);
            for (let elem in data) {
              document.getElementById(elem)?.setAttribute("error", "");
            }
            setPassword("");
            setEmail("");

            if (emailInput.current) {
              emailInput.current.focus();
            }
            setIsLoggedIn("false");
          }
        });
      })
      .catch((error) => console.log(error));
  };

  /**
   * 관리자 권한 확인 함수
   * @param token 세션에 저장되어 있는 현재 사용자 토큰
   */
  const handleCheckAdmin = (token: string) => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/api/admin/is_admin`, {
        headers: {
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        window.sessionStorage.setItem("isAdmin", "true");
        handleIsAdmin(true);
      })
      .catch(function (error) {
        window.sessionStorage.setItem("isAdmin", "false");
        handleIsAdmin(false);
        console.log(error);
      });
  };

  /**
   * 비밀번호 발급 페이지 이동
   */
  const handleFindPw = () => {
    history.push("/auth/find_pw");
  };

  return (
    <Container
      className={isMobile ? classes.authContainerMobile : classes.authContainer}
    >
      <Container className={isMobile ? classes.authBoxMobile : classes.authBox}>
        <img src={logo} width="80px" alt="데일리나우와 함께해요!" />
        <h2>Daily Now 💙</h2>
        <p>
          매일이 행복한 투자
          <br />
          <b>데일리나우가</b> 함께 합니다
        </p>

        {typeNum === "01" ? (
          // 로그인폼
          <form className={classes.loginForm}>
            {isLoggedIn === "true" ? (
              <Alert severity="success">로그인 되었습니다</Alert>
            ) : isLoggedIn === "false" ? (
              <Alert severity="error">
                로그인에 실패하였습니다. 다시 시도해주세요.
              </Alert>
            ) : null}
            <FormControl
              className={classes.input}
              error={error && error.hasOwnProperty("email") ? true : undefined}
            >
              {/* 이메일 */}
              <InputLabel htmlFor="email">Email(ID)</InputLabel>
              <Input
                autoFocus
                inputRef={emailInput}
                onChange={handleChange}
                value={email}
                id="email"
                aria-describedby="my-helper-text"
                type="email"
              />
              <FormHelperText id="my-helper-text">
                {error && error.hasOwnProperty("email")
                  ? "이메일(ID)을 입력해주세요."
                  : "Enter your email."}
              </FormHelperText>
            </FormControl>
            <FormControl
              className={classes.input}
              error={
                error && error.hasOwnProperty("password") ? true : undefined
              }
            >
              {/* 비밀번호*/}
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                onChange={handleChange}
                value={password}
                id="password"
                aria-describedby="my-helper-text"
                type="password"
              />
              <FormHelperText id="my-helper-text">
                {error && error.hasOwnProperty("password")
                  ? "비밀번호를 입력해주세요."
                  : "Enter your password."}
              </FormHelperText>
            </FormControl>
            <div className={classes.button}>
              <Button
                variant="outlined"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                로그인
              </Button>
              <Button variant="outlined" color="primary" onClick={handleFindPw}>
                비밀번호 찾기
              </Button>
            </div>
          </form>
        ) : (
          /* 비밀번호 재발급 */
          <FindPw />
        )}
        <img
          className={classes.loginHoly}
          src={holyddung}
          width={isMobile ? "180px" : "220px"}
          alt="뚱이와 홀리"
          style={{ zIndex: 1 }}
        />
      </Container>
    </Container>
  );
}
