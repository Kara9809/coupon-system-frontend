import './Login.css'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as zod from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { LoginRequestModel } from '../../../Models/LoginRequestModel';
import { loginApi } from '../../../Services/LoginApiService';
import notificationService from '../../../Services/NotificationService';
import store from '../../../Redux/Store';
import { loginAction } from '../../../Redux/Slices/AuthSlice';
import { LoginResponceModel } from '../../../Models/LoginResponceModel';

type Props = {}

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const schema = zod.object({
        email: zod.string().email("email has to be valid e.g name@example.com"),
        password: zod.string().min(4, "Password has to be 4 character minimum"),
        clientType: zod.string()
    })


    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } =
        useForm<LoginRequestModel>({ mode: "all", resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<LoginRequestModel> = (data: LoginRequestModel) => {
        return loginApi(data)
            .then(res => {
                const data: LoginResponceModel = res.data
                store.dispatch(loginAction(data));
                console.log(data)

                notificationService.successPlainText("Login successful");
                navigate("/home")
                // if (res?.clientType === "ADMIN") {
                //     navigate("/admin");
                // }  else if (data.clientType === "COMPANY") {
                //     navigate("/company");
                // } else if (data.clientType === "CUSTOMER") {
                //     navigate("/customer");
                // } else {
                //     navigate("/home");
                // }
            })
            .catch(err => {
                console.log(err.response?.data?.detail)
                notificationService.errorAxiosApiCall(err)
            });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Login</h1>

                <form className="login-form" onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
                    <div className="form-group">
                        <label htmlFor="email" className={errors?.email ? "error-label" : ""}>
                            {errors?.email ? errors.email.message : "Email"}
                        </label>
                        <input
                            {...register("email")}
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className={errors?.email ? "error-input" : ""}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className={errors?.password ? "error-label" : ""}>
                            {errors?.password ? errors.password.message : "Password"}
                        </label>
                        <input
                            {...register("password")}
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className={errors?.password ? "error-input" : ""}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="clientType">Select User Type</label>
                        <select {...register("clientType")} name="clientType">
                            <option value="ADMIN">Admin</option>
                            <option value="COMPANY">Company</option>
                            <option value="CUSTOMER">Customer</option>
                        </select>
                    </div>

                    <button className="login-button" disabled={!isValid || isSubmitting}>
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;