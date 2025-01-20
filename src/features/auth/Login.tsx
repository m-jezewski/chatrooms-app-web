import {Formik, FormikHelpers} from "formik";
import {TextInput} from "../../shared/TextInput.tsx";
import {InputLabel} from "../../shared/InputLabel.tsx";
import {AppButton} from "../../shared/AppButton.tsx";
import {object, string} from "yup";

interface formValues {
    email: string;
    password: string;
}

export const Login = () => {

    const handleSubmit = (values: formValues, formikHelpers: FormikHelpers<formValues>) => {
        console.log(values, formikHelpers);
    }

    return (
        <div
            className="rounded-lg min-w-80 flex flex-col justify-center align-middle frounded-lg bg-gradient-to-tr from-fuchsia-950 from-10% via-pink-900 to-rose-900 to-90% p-5 shadow-rose-700/50 shadow-sm">
            <h1 className="font-medium text-xl text-center">Login</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={object({
                    email: string()
                        .email()
                        .required(),
                    password: string().required().min(5).max(100)
                })}
                onSubmit={handleSubmit}
            >
                {(formikConfig) => (
                    <form
                        className={"flex flex-col gap-3 w-full mt-2"}
                        onSubmit={(e) => {
                            e.preventDefault();
                            formikConfig.submitForm();
                        }}
                    >
                        <div>
                            <InputLabel htmlFor={"email"}>Email</InputLabel>
                            <TextInput name={"email"} type={"email"} placeholder={"youremail@domain.com"}/>
                        </div>
                        <div>
                            <InputLabel htmlFor={"email"}>Password</InputLabel>
                            <TextInput name={"password"} type={"password"}/>
                        </div>
                        <AppButton className={"mt-2"}>
                            Login
                        </AppButton>
                        <p className={"text-sm text-center mt-4 text-gray-300"}>Does not have an account?</p>
                        <div className={"flex gap-4"}>
                            <AppButton type={"button"} className={"w-1/2"}>
                                Register
                            </AppButton>
                            <AppButton type={"button"} className={"w-1/2"}>
                                Demo account
                            </AppButton>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}