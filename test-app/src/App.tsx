import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import "./App.css";

function App() {
    const testSchema = z.string();

    testSchema.parse("tuna");

    const userSchema = z
        .object({
            email: z.string().email(),
            password: z
                .string()
                .min(8, "Password must be at least 8 characters")
                .max(20, "Password must be shorter than 20 characters"),
            passwordConfirm: z.string(),
        })
        .refine((data) => data.password === data.passwordConfirm, {
            message: "Passwords don't match",
        });

    const { reset, handleSubmit, formState, register } = useForm({
        defaultValues: {
            email: "",
            password: "",
            passwordConfirm: "",
        },
        mode: "all",
        delayError: 1000,
        resolver: zodResolver(userSchema),
    });

    console.log(formState);
    const { isValidating, isSubmitted, errors } = formState;
    console.log(isValidating);
    console.log(isSubmitted);
    console.log(errors);

    // console.log(register("email"));

    // console.log(formState);

    return (
        <div className="App">
            <form onSubmit={handleSubmit(console.log, console.log)}>
                <input {...register("email")} />
                <input type={"password"} {...register("password")} />
                <input type={"password"} {...register("passwordConfirm")} />
                <input type={"submit"} />
            </form>
        </div>
    );
}

export default App;
