import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { mutation } from '../../../../convex/_generated/server';
import { use, useCallback } from "react";

type RequestType = any;
type ResponseType = any;

type Options = {
    onSuccess?: () => void;
    onError?: () => void;
    onSettled?: () => void;
};

export const useCreateWorkspace = (options: Options = {}) => {
    const mutation = useMutation(api.workspaces.create);

    const mutate = useCallback(async(values: any, operations?: Options) => {
        try{
            const response = await mutation(values);
            options.onSuccess?.();
        } catch {
            options.onError?.();
        } finally {
            options.onSettled?.();
        }
    }, [mutation]);

    return {
        mutate,
    };
};