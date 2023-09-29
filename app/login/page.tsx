/* eslint-disable react/no-unescaped-entities */
"use client";
import Input from "@/components/Input/Input";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
interface InitialStateProps {
  email: string;
  password: string;
}
const initialState: InitialStateProps = {
  email: "",
  password: "",
};

const Page = () => {
  const router = useRouter();
  const [state, setState] = useState<InitialStateProps>(initialState);
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    signIn("credentials", {
      ...state,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.refresh();
      }

      if (callback?.error) {
        throw new Error("Wrong Credentials");
      }
    });
    router.push("/");
  };
  function handleChange(e: any) {
    setState({ ...state, [e.target.name]: e.target.value });
  }
  return (
    <form className="text-center" onSubmit={onSubmit}>
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <Input
          placeholder="Email"
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          value={state.email}
        />
        <Input
          placeholder="Password"
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          value={state.password}
        />
        <button type="submit">Submit</button>
      </div>
      <div>
        <div>
          Haven't got an account ? <Link href="/register">Sign up</Link>
        </div>
      </div>
    </form>
  );
};
export default Page;
