import { Link, useNavigate } from "react-router-dom";  // Import useNavigate
import { useState } from "react";
import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
// import { useToast } from "@/components/ui/use-toast";
import { toast } from 'react-hot-toast';

const initialState = {
  email: '',
  password: '',
};

function AuthLogin() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  // const { toast } = useToast();
  const navigate = useNavigate();  // Initialize useNavigate

  function onSubmit(event) {
    event.preventDefault();
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast.success(data?.payload.message || "Login successful!");

        // Navigate to the admin dashboard if the user is an admin
        if (data.payload.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          console.log("login ___")
          navigate('/shop/home');  // Redirect non-admin users
        }
      } else {
        toast.error(data?.payload?.message || "Login failed");
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
        <p className="mt-2">
          Don&apos;t have an account
          <Link className="font-medium ml-2 text-primary hover:underline" to='/auth/register'>Register</Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={'Sign In'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
