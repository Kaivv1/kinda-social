import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { api } from "../constants";
import { getErrorData } from "../error";
import toast from "react-hot-toast";

function registerApi({ ...args }: RegisterArgs) {
  return axios.post<{ msg: string }>(`${api}/users/register`, { ...args });
}

export function useRegister() {
  const { mutate: register, isPending: isLoading } = useMutation({
    mutationFn: (args: RegisterArgs) => registerApi({ ...args }),
    onSuccess: () => {
      toast.success("registered successfully");
    },
    onError: (err: AxiosError) => {
      const { code, msg } = getErrorData(err);
      console.log(msg);
      if (code! > 499) {
        toast.error(msg!);
      }
    },
  });

  return { register, isLoading };
}
