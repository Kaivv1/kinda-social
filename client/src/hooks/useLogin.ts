import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { api } from "../constants";
import { getErrorData } from "../error";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function loginApi({ ...args }: LoginArgs) {
  return axios.post<User>(
    `${api}/users/login`,
    { ...args },
    {
      withCredentials: true,
    }
  );
}

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationKey: ["user"],
    mutationFn: (args: LoginArgs) => loginApi({ ...args }),
    onSuccess: ({ data }) => {
      toast.success(`Logged in as ${data.username}`);
      queryClient.setQueryData(["user"], () => [data]);
      navigate("/");
    },
    onError: (err: AxiosError) => {
      const { code, msg } = getErrorData(err);
      console.log(msg);
      if (code! > 499 || code === 409) {
        toast.error(msg!);
      }
    },
  });

  return { login, isLoading };
}
