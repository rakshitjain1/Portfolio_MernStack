import { clearAllForgotResetPassErrors, forgotPassword } from "@/store/slice/forgotResetPasswordSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton;";

import img from "../img/forgot.png"

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navgateTo = useNavigate();

  const handelForgotPassword = () => {
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
    toast.error(error)
    dispatch(clearAllForgotResetPassErrors)
    }
    if(isAuthenticated){
      navgateTo("/");
    }
    if(message !== null){
      toast.success(message);
    }
  }, [dispatch, isAuthenticated, error, loading]);

  return ( <>
   <div cassName="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className=" min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to Request to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                {/* <Label>Password</Label> */}
                <Link
                  to="/login"
                  className="ml-auto inline-block text-sm underline"
                >
                  Remenber your Password ?
                </Link>
              </div>
              {/* <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /> */}
            </div>
            {loading ? (
              <SpecialLoadingButton content={"Requesting"} />
            ) : (
              <Button
                onClick={handelForgotPassword}
                className="w-full"
              >
                Request for Reset password
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-muted">
        <img src={img} alt="login" />
      </div>
    </div>
  </>
  )
};

export default ForgotPassword;
