import ImageAtom from "../../components/atoms/Image";
import Signup from "../../components/organisms/Signup";
import { LogInTemplate } from "../../components/templates/LogInTemplate";
import login from "/public/assets/images/signUp.png";
import { signup } from "../../utils/services/index";

import { Box, styled } from "@mui/material";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "../../store/user";
import { useAuth } from "../../store/users";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);
  const [error, setError] = useState<boolean>(false);

  const handleSignUp = async (userDetails: any) => {
    try {
      const response = await signup(userDetails);
      updateUser({
        id: response.data.id,
        fullName: response.data.fullName,
        email: response.data.email,
        password: response.data.password,
        balance: response.data.balance,
      });
      sessionStorage.setItem("email", response.data.email);
      navigate("/dashboard");
    } catch (error) {
      setError(true);
    }
  };

  const handleLogIn = () => {
    navigate("/login");
  };
  return (
    <LogInTemplate
      image={<ImageAtom src={login} width="100%" height="99.6%" />}
      content={
        <StyleBox>
          <Signup
            alertMessage={error}
            onClickSignup={handleSignUp}
            onClickGoogleCard={() => {}}
            onClickLoginLink={handleLogIn}
          />
        </StyleBox>
      }
    />
  );
};
const StyleBox = styled(Box)({
  paddingTop: "3%",
});
