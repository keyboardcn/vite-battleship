import React, { useState, useEffect } from "react";
import { getAllBooks, loginUser, logoutUser } from "../apiServices/authService";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setAccessToken, setUser } from "../redux/accessTokenSlice";
import {
  ButtonComponent,
  CenterCardComponent,
  PageComponent,
  SectionComponent,
} from "../commons/common.components";
import { LabelInputComponent, } from "../commons/LabelInput.component";
import { IUser, LoggedUserComponent } from "./components/loggedUser.component";
import { ErrorHandler } from "../Exceptions/exception.services";
import { ToastContainer } from "react-toastify";

export default function UserProfileHomeComponent() {
  const [email, setEmail] = useState<string>("jane.smith@example.com");
  const [password, setPassword] = useState<string>("password123");
  const [mode, setMode] = useState<"signin" | "signup" | "logged">("signin");


  const [loggedUser, setLoggedUser] = useState<IUser>({
    name: "Jan Smith",
    email: "jane.smith@example.com",
    author_id: "12344",
    books: "not known",
    dateModified: "fjdlajfdj"
  })

  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.loggedUser.accessToken);
  const authenticated = useAppSelector(state => state.loggedUser.authanticated);

  const swithSignInUp = () => {
    setMode(mode == "signin" ? "signup" : "signin");
  };

  useEffect(() => {
    if (authenticated) { setMode("logged") };
  }, [authenticated]);

  useEffect(() => {
    if (mode === "signup") {
      setEmail("");
      setPassword("");
    } else {
      setEmail("jane.smith@example.com");
      setPassword("password123");
    }
  }, [mode]);

  function handleSignInClk() {
    switch (mode) {
      case "signin":
        handleLogin();
        break;
      case "signup":
        console.log("Not implemented!");
        break;
      case "logged":
        handleLogout();
      default:
        console.log("Not Implemented!");
    }
  }

  const handleLogin = () => {
    console.log(`Logging in with email: ${email} and password: ${password}`);
    loginUser(email, password)
      .then((response) => {
        console.log("Login successful:", response, response.data);
        dispatch(setAccessToken({ accessToken: response.data.accessToken }));
        dispatch(setUser({ user: response.data.user }));
      })
      .catch((error) => {
        console.error("Login failed:", error);
        new ErrorHandler(error);
      });
  };
  const handleLogout = () => {
    logoutUser()
      .then((response) => {
        console.log("Logout successful:", response.data);
        dispatch(setAccessToken({ accessToken: null }));
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const handleGetAllBooks = async () => {
    const books = await getAllBooks();
    console.log("Fetched books:", books);
  };

  useEffect(() => {
    if (accessToken) {
      console.log("Current Access Token:", accessToken);
    }
  }, [accessToken]);

  return (
    <PageComponent>
      <h2 className="m-6 font-bold text-primary-700 text-5xl max-md:text-2xl items-center">
        USER PROFILE
      </h2>
      {mode == "logged" &&
        <LoggedUserComponent
          props={loggedUser}
        ></LoggedUserComponent>}
      {mode != "logged" && (<SectionComponent>
        <CenterCardComponent id="user-profile-label-input">
          <LabelInputComponent
            labelData={{
              id: "user-profile-label",
              htmlFor: "user-profile-input",
              content: "Email",
            }}
            inputData={{
              id: "user-profile-input",
              type: "email",
              value: email,
            }}
            onChange={(e) => setEmail(e.target.value)}
          ></LabelInputComponent>
          <LabelInputComponent
            labelData={{
              id: "user-name-label",
              htmlFor: "user-name-input",
              content: "Password",
            }}
            inputData={{
              id: "user-name-input",
              type: "password",
              value: password,
            }}
            onChange={(e) => setPassword(e.target.value)}
          ></LabelInputComponent>
        </CenterCardComponent>
        <CenterCardComponent id="btn-input-card">
          <ButtonComponent
            id="sign-in-up-btn"
            content={mode.toLowerCase()}
            onClick={handleSignInClk}
          ></ButtonComponent>
        </CenterCardComponent>
        <CenterCardComponent id="switch-sign-up-in">
          <a
            className="font-bold text-primary-600 border border-qua-300 rounded-3xl p-2 bg-primary-300"
            onClick={() => swithSignInUp()}
          >
            {mode == "signin"
              ? "Create a NEW account"
              : "Existing user SIGNIN"}
          </a>
        </CenterCardComponent>
        <SectionComponent>
          <div className="input-wrapper">
            <button
              style={{ display: "block", width: "100%" }}
              onClick={() => handleGetAllBooks()}
            >
              Get All Books
            </button>
          </div>
        </SectionComponent>
      </SectionComponent>)}
      <ToastContainer></ToastContainer>
    </PageComponent>
  );
}
