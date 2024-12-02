import { useMutation } from "convex/react";
import { useCallback, useMemo, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id} from "../../../../convex/_generated/dataModel";

type RequestType = { 
    workspaceId: Id<"workspaces">,
    memberId: Id<"members">,
    };

type ResponseType = Id<"conversations"> | null;


type Options = {
    onSuccess?: (data: ResponseType) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
    throwError?: boolean;
};

export const useCreateOrGetConversation = (options: Options = {}) => {
    const [data, setData] = useState<ResponseType>(null);
    const [error, setError] = useState<Error | null>(null);
    const [status, setStatus] = useState<"success" | "error" | "settled" | "pending" | null>(null);

    const isPending = useMemo(() => status === "pending", [status]);
    const isSuccess = useMemo(() => status === "success", [status]);
    const isError = useMemo(() => status === "error", [status]);
    const isSettled = useMemo(() => status === "settled", [status]);

    const mutation = useMutation(api.conversations.createOrGet);

    const mutate = useCallback(async (values: RequestType, operations?: Options) => {
        try {
            setData(null);
            setError(null);
            setStatus("pending");

            const response = await mutation(values);
            setData(response);
            setStatus("success");
            
            // 合并全局选项和操作特定选项
            const mergedOptions = { ...options, ...operations };
            mergedOptions.onSuccess?.(response);
            return response;
        } catch (error) {
            setError(error as Error);
            setStatus("error");
            
            const mergedOptions = { ...options, ...operations };
            mergedOptions.onError?.(error as Error);
            if (mergedOptions.throwError) {
                throw error;
            }
        } finally {
            setStatus("settled");
            const mergedOptions = { ...options, ...operations };
            mergedOptions.onSettled?.();
        }
    }, [mutation, options]);

    return {
        mutate,
        data,
        error,
        isPending,
        isSuccess,
        isError,
        isSettled,
    };
};