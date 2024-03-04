
import { LogInTemplate } from "../../components/templates/LogInTemplate";
import loginImage  from "/public/assets/images/login.png";
import ImageAtom from "../../components/atoms/Image";
import LogIn from "../../components/organisms/LogIn";
import { useContext, useState } from "react";
import { getUserDetails, logIn } from "../../utils/services";
import { Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext, UserType } from "../../store/user";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth } from "../../store/auth";

export const LogInPage = () => {
  const { login } = useAuth()
  const [passwordError, setPasswordError] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleLogIn = (userDetails: any) => {
    let body = {
      email: userDetails.email,
      password: userDetails.password,
    };
    login(body);
    navigate('/dashboard')
  };
  const handleGoogleSignIn = () => {
    
 };

  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleForgotPassword = (mail: any) => {
    getUserDetails(mail).then((res) => {
      if (res.status == 200) {
        navigate("/forgot-password");
      } else {
        setPasswordError(false);
      }
    });
  };
  return (
    <LogInTemplate
      image={<ImageAtom src={loginImage} width="100%" height="99.6%" />}
      content={
        <StyleBox>
          <LogIn
            onClickSignIn={handleLogIn}
            isUserDataValid={passwordError}
            onClickGoogleCard={handleGoogleSignIn}
            onClickForgotPassword={handleForgotPassword}
            onClickSignUpLink={handleSignUp}
          />
        </StyleBox>
      }
    />
  );
};
const StyleBox = styled(Box)({
  paddingTop: "5%",
});
