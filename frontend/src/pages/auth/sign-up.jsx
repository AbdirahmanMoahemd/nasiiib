import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { register } from "@/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import background from "../../data/images/background.jpg";
import { Message } from "primereact/message";
import { ProgressSpinner } from "primereact/progressspinner";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(null);
  const [isVisible, setVisible] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const toggle = () => {
    setVisible(!isVisible);
  };



  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  const {
    loading: loadingCreate,
    error: errorCreate,
    userInfo: user,
    success: successCreate,
  } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
    if (successCreate) {
      navigate('/sign-in')
    }
  }, [dispatch, navigate,userInfo, successCreate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Passwords do Not Match");
    } else {
      dispatch(register(name, email, password, phone));
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <img
        src={background}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div className="container mx-auto p-4">
        <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
        <div className="container mx-auto p-4">
          <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Sign Up
              </Typography>
            </CardHeader>
            <form onSubmit={submitHandler}>
            
            <CardBody className="flex flex-col gap-4">
            {message && (
            <Message severity="error" sticky="true">
              {message}
            </Message>
          )}
          {loadingCreate && (
            <ProgressSpinner
              style={{ width: "20px", height: "20px" }}
              strokeWidth="6"
              fill="var(--surface-ground)"
              animationDuration=".5s"
            />
          )}
          {errorCreate && <Message severity="error" text={errorCreate} />}
              <Input label="Name" size="lg" 
               onChange={(e) => setName(e.target.value)}/>
              <Input type="email" label="Email" size="lg" 
               onChange={(e) => setEmail(e.target.value)}/>
              <Input type="number" label="phone number" size="lg" 
              onChange={(e) => setPhone(e.target.value)}/>
              <Input type="password" label="Password" size="lg" 
              onChange={(e) => setPassword(e.target.value)}/>
              <Input type="password" label="Confirm Password" size="lg" 
              onChange={(e) => setConfirmPassword(e.target.value)}/>
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" variant="gradient" fullWidth>
                Sign Up
              </Button>
              <Typography variant="small" className="mt-6 flex justify-center">
                Already have an account?
                <Link to="/sign-in">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Sign in
                  </Typography>
                </Link>
              </Typography>
            </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
