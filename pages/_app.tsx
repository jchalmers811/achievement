import Amplify, { Auth, Hub } from "aws-amplify";
import { useState, useEffect } from "react";
import config from "../src/aws-exports";

Amplify.configure({
  ...config,
  ssr: true,
});

const initialFormState = {
  username: "",
  password: "",
  email: "",
  authCode: "",
  formType: "signUp",
};

function App({ Component, pageProps }) {
  const [formState, updateFormState] = useState(initialFormState);
  const [user, updateUser] = useState(null);

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      updateUser(user);
      updateFormState(() => ({ ...formState, formType: "signedIn" }));
    } catch (e) {
      updateUser(null);
    }
  };

  const setAuthListener = async () => {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signIn":
          console.log("user signed in");
          break;
        case "signUp":
          console.log("user signed up");
          break;
        case "signOut":
          updateFormState(() => ({ ...formState, formType: "signUp" }));
          console.log("user signed out");
          break;
        case "signIn_failure":
          console.log("user sign in failed");
          break;
        case "configured":
          console.log("the Auth module is configured");
        default:
          break;
      }
    });
  };

  useEffect(() => {
    checkUser();
    setAuthListener();
  }, []);

  const onChange = (e) => {
    e.persist();
    updateFormState(() => {
      return { ...formState, [e.target.name]: e.target.value };
    });
  };

  const signUp = async () => {
    const { username, password, email } = formState;
    await Auth.signUp({ username, password, attributes: { email } });
    updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
  };

  const confirmSignUp = async () => {
    const { username, authCode } = formState;
    await Auth.confirmSignUp(username, authCode);
    updateFormState(() => ({ ...formState, formType: "signIn" }));
  };
  const signIn = async () => {
    const { username, password } = formState;
    await Auth.signIn(username, password);
    updateFormState(() => ({ ...formState, formType: "signedIn" }));
  };

  const signOut = async () => {
    await Auth.signOut();
   
  };

  const toggleSignUp = async () => {
    const { formType } = formState;
    updateFormState(() => ({
      ...formState,
      formType: formType === "signUp" ? "signIn" : "signUp",
    }));
  };

  const { formType } = formState;
  return (
    <div>
      <div>
        {formType === "signUp" && (
          <div>
            <input
              name="username"
              onChange={onChange}
              placeholder="username"
            ></input>
            <input
              name="password"
              type="password"
              onChange={onChange}
              placeholder="password"
            ></input>
            <input name="email" onChange={onChange} placeholder="email"></input>
            <button onClick={signUp}>Sign Up</button>
            <button onClick={toggleSignUp}>Sign In</button>
          </div>
        )}
        {formType === "confirmSignUp" && (
          <div>
            <input
              name="authCode"
              onChange={onChange}
              placeholder="Confirmation Code"
            ></input>
            <button onClick={confirmSignUp}>Confirm Sign Up</button>
          </div>
        )}
        {formType === "signIn" && (
          <div>
            <input
              name="username"
              onChange={onChange}
              placeholder="username"
            ></input>
            <input
              name="password"
              type="password"
              onChange={onChange}
              placeholder="password"
            ></input>
            <button onClick={signIn}>Sign In</button>
          </div>
        )}
        {formType === "signedIn" && (
          <div>
            <div>
              <button onClick={signOut}>Sign Out</button>
            </div>
            <Component {...pageProps} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
