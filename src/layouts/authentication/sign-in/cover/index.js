import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-in-cover.jpeg";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { signinUser } from "core/actions/AuthActions";

function Cover() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  function onChange(event) {
    setUser((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }
  const login = () => {
    const { email, password } = user;
    const data = { email, password };
    dispatch(signinUser(data, navigate));
  };
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to Sign In
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <TextField
                required
                fullWidth
                variant="outlined"
                type="email"
                name="email"
                placeholder="Please enter your email address."
                className="outlined-input"
                value={user.email}
                onChange={(e) => onChange(e)}
              />
            </MDBox>
            <MDBox mb={2}>
              <TextField
                required
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                name="password"
                placeholder="************"
                className="outlined-input"
                value={user.password}
                onChange={(e) => onChange(e)}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={login}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up/cover"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
