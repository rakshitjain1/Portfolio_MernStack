import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { clearAllUserErrors, getUser, resetProfile, updatePassword } from '@/store/slice/userSlice'
import { toast } from 'react-toastify'
import SpecialLoadingButton from './SpecialLoadingButton;'

function UpdatePassword() {
  const [currentPassword, setcurrentPassword] = useState("")
  const [newPassword, setnewPassword] = useState("")
  const [comfirmPassword, setcomfirmPassword] = useState("")
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const { loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  )

  const dispatch = useDispatch()

  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, comfirmPassword))
  }

  useEffect(() => {
    if (error) {
      toast.error(error)
      dispatch(clearAllUserErrors())
    }
    if (isUpdated) {
      dispatch(getUser())
      dispatch(resetProfile())
    }
    if (message) {
      toast.success(message)
    }
  }, [dispatch, loading, error, isUpdated])

  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Update Password</h1>
              <p className="text-balance text-muted-foreground">
                Update Your Dashboard Password
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label>Current Password</Label>
                <div className="relative">
                  <Input
                    type={showPasswords.current ? 'text' : 'password'}
                    value={currentPassword}
                    placeholder="CurrentPassword"
                    onChange={(e) => setcurrentPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        current: !prev.current,
                      }))
                    }
                    className="absolute inset-y-0 right-2 flex items-center"
                  >
                    {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>New Password</Label>
                <div className="relative">
                  <Input
                    type={showPasswords.new ? 'text' : 'password'}
                    value={newPassword}
                    placeholder="NewPassword"
                    onChange={(e) => setnewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        new: !prev.new,
                      }))
                    }
                    className="absolute inset-y-0 right-2 flex items-center"
                  >
                    {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Confirm New Password</Label>
                <div className="relative">
                  <Input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={comfirmPassword}
                    placeholder="ComfirmPassword"
                    onChange={(e) => setcomfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        confirm: !prev.confirm,
                      }))
                    }
                    className="absolute inset-y-0 right-2 flex items-center"
                  >
                    {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              {!loading ? (
                <Button
                  onClick={() => handleUpdatePassword()}
                  className="w-full"
                >
                  Update Password
                </Button>
              ) : (
                <SpecialLoadingButton content={"Updating"} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UpdatePassword
