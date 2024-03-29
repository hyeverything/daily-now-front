import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from "@material-ui/core";
import { Autocomplete, Alert, AlertTitle } from "@material-ui/lab";
import { userInfo } from "Interface/User";
import { makeStyles } from "@material-ui/core/styles";
import { companyInfo } from "./P2PList";

interface P2PRegisterProps {
  userObj: userInfo | null;
  open: boolean;
  allCompany: Array<companyInfo>;

  handleClose: () => void;
  handleP2PUpdated: () => void;
  getAllCompany: () => void;
  handleChangeAllCompany: (company: companyInfo[]) => void;
  getUserDataOfCompany: (
    refresh: number,
    id?: number,
    nickname?: string
  ) => void;
}

const useStyles = makeStyles({
  p2pField: {
    display: "flex",
    justifyContent: "space-evenly",
  },
});

export default function P2PRegister(props: P2PRegisterProps) {
  const {
    userObj,
    handleClose,
    open,
    handleP2PUpdated,
    allCompany,
    getUserDataOfCompany,
  } = props;

  /**
   * 연동 회사 등록 폼 입력 핸들러
   */
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [P2PId, setP2PId] = useState(0);
  const [P2PName, setP2PName] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    switch (e.target.id) {
      case "p2pName":
        setP2PName(value);
        break;
      case "email":
        setUserName(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  /**
   * 연동 회사 등록 함수
   * @param e MouseEvent
   */
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();

    const p2pInfo = {
      username: userName,
      user_password: password,
      company_id: P2PId,
    };

    if (isAuthentic) {
      if (props.userObj !== null) {
        fetch(`${process.env.REACT_APP_SERVER}/api/register/company_register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: "Token " + props.userObj.auth_token,
          },
          body: JSON.stringify(p2pInfo),
        })
          .then((res) => {
            if (res.ok) {
              res.json().then((data) => {
                let value = Object.keys(data)[0];
                let message = Object.keys(data)[1];

                /**
                 * 0 : 등록 완료
                 * 1 or 2 : 등록 실패
                 */
                if (value === "0") {
                  alert("계정 등록이 완료되었습니다. ");
                  setRegistrationError({
                    open: true,
                    isTrue: false,
                    message: "",
                  });
                  /**
                   * 계정 최초 등록 시, 최초 데이터를 자동으로 가져오게 해야한다.
                   * 1 (실시간 데이터 flag), 회사 아이디, 닉네임을 보내 가져오도록 한다.
                   */
                  getUserDataOfCompany(1, P2PId, P2PName);
                  handleP2PUpdated();
                  handleClose();
                } else {
                  alert("이미 동일한 계정이 존재합니다. ");
                  setRegistrationError({
                    open: true,
                    isTrue: true,
                    message: message,
                  });
                }
              });
            }
          })
          .catch((error) => console.log(error));
      }
    } else {
      alert("회원 인증을 먼저 해주세요.");
    }
  };

  /**
   * 회원 정보 유효성 검사 함수
   */
  const [isRegistrationError, setRegistrationError] = useState({
    open: false,
    isTrue: false,
    message: "",
  });
  const [isAuthError, setAuthError] = useState({
    open: false,
    isTrue: false,
    message: "",
  });
  const [isAuthentic, setIsAuthentic] = useState(false);
  const handleAuth = () => {
    if (userObj !== null && userName && password) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER}/api/${P2PName}/is_valid`,
          {
            id: userName,
            pwd: password,
          },
          {
            headers: {
              Authorization: "Token " + userObj.auth_token,
            },
          }
        )
        .then((res) => {
          if (res.status === 200) {
            setAuthError({
              open: true,
              isTrue: false,
              message: "인증되었습니다.",
            });
            setIsAuthentic(true);
          }
        })
        .catch(function (error) {
          setAuthError({
            open: true,
            isTrue: true,
            message: "유효하지 않은 회원입니다. 다시 시도해주세요.",
          });
          initializeForm();
        });
    } else {
      alert("잘못된 입력입니다. 정확히 작성해주세요.");
    }
  };

  /**
   * 입력 폼 초기화 함수
   */
  const initializeForm = () => {
    setUserName("");
    setPassword("");
    setP2PName("");
    setValue(null);
    setInputValue("");
    setFilteredCompany([]);
  };

  useEffect(() => {
    // 폼이 닫혀있을 때만 초기화한다.
    if (!open) {
      initializeForm();
    }
    if ((!open && isAuthError.open) || isRegistrationError.open) {
      setAuthError({
        open: false,
        isTrue: false,
        message: "",
      });
      setRegistrationError({
        open: false,
        isTrue: false,
        message: "",
      });
      setIsAuthentic(false);
    }
  }, [open, isAuthError, isRegistrationError]);

  /**
   * 회사 검색 결과 핸들러
   */
  const [value, setValue] = useState<string | null>();
  const [inputValue, setInputValue] = useState("");
  const [filteredCompany, setFilteredCompany] = useState<companyInfo[]>([]);

  useEffect(() => {
    if (value !== null && typeof value === "string") {
      setFilteredCompany(
        allCompany.filter((company) => {
          return company.company_name.includes(value);
        })
      );

      let company = [
        {
          id: 0,
          company_name: "",
          nickname: "",
        },
      ];
      company = allCompany.filter((company) => value === company.company_name);
      if (company.length !== 0) {
        setP2PId(company[0].id);
        setP2PName(company[0].nickname);
      }
    }
  }, [value]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">연동 회사 등록</DialogTitle>
      <Collapse in={isRegistrationError.open}>
        <Alert severity={isRegistrationError.isTrue ? "error" : "success"}>
          <AlertTitle>
            등록 {isRegistrationError.isTrue ? "실패" : "성공"}
          </AlertTitle>
          <strong>{isRegistrationError.message}</strong>
        </Alert>
      </Collapse>
      <Collapse in={isAuthError.open}>
        <Alert severity={isAuthError.isTrue ? "error" : "success"}>
          <AlertTitle>인증 {isAuthError.isTrue ? "실패" : "성공"}</AlertTitle>
          <strong>{isAuthError.message}</strong>
        </Alert>
      </Collapse>
      <DialogContent>
        <DialogContentText>
          연동할 회사와 회원 ID, 패스워드를 입력해주세요.
        </DialogContentText>
        <Autocomplete
          id="company-search"
          value={value}
          onChange={(event: any, newValue: string | null) => {
            setValue(newValue);
          }}
          options={(value === null ? allCompany : filteredCompany).map(
            (company) => company.company_name
          )}
          renderInput={(params: any) => (
            <TextField
              {...params}
              label="연동할 회사"
              margin="normal"
              variant="outlined"
            />
          )}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
        />
        <TextField
          onChange={handleChange}
          value={userName}
          id="email"
          label="Email(ID)"
          type="email"
          fullWidth
        />
        <TextField
          onChange={handleChange}
          value={password}
          id="password"
          label="Password"
          type="password"
          fullWidth
        />
        <Button
          variant="contained"
          color="secondary"
          style={{ display: "block", margin: "20px auto" }}
          onClick={handleAuth}
        >
          회원 인증 (필수)
        </Button>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          type="submit"
          onClick={handleSubmit}
          color="primary"
        >
          등록
        </Button>
        <Button variant="contained" onClick={handleClose} color="default">
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}
