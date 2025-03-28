import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'
import img from "../img/forgot.png"
import { Link, useNavigate, useParams } from 'react-router-dom'
import SpecialLoadingButton from './sub-components/SpecialLoadingButton;'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllForgotResetPassErrors, resetPassword } from '@/store/slice/forgotResetPasswordSlice'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { getUser } from '@/store/slice/userSlice'

function ResetPassword() {
  const {token} = useParams();
  const [password , setPassword] = useState("")
  const [ComfirmPassword , setComfirmPassword] = useState("")

    const { loading, error, message } = useSelector(
      (state) => state.forgotPassword
    );
    const { isAuthenticated } = useSelector((state) => state.user);
    
  const dispatch = useDispatch();

  const navgateTo = useNavigate();

  
    const handelResetPassword = () => {
      dispatch(resetPassword(token ,password ,ComfirmPassword));
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
          dispatch(getUser())
        }
      }, [dispatch, isAuthenticated, error, loading]);


  return (
    <>
            <div cassName="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className=" min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1>
            <p className="text-balance text-muted-foreground">
             Set a New password
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label >Password</Label>
              <Input
              
                type="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label >Comfirm Password</Label>
              <Input
                type="password"
                placeholder="m@example.com"
                value={ComfirmPassword}
                onChange={(e) => setComfirmPassword(e.target.value)}
                required
              />
            </div>
          
            {loading ? (
              <SpecialLoadingButton content={"Resetting password"} />
            ) : (
              <Button
                onClick={handelResetPassword}
                className="w-full"
              >
                 Reset password
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
}

export default ResetPassword