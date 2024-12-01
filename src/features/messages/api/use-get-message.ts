"use client";
import { useQuery } from "convex/react";

import {api} from "../../../../convex/_generated/api";

import {Id} from "../../../../convex/_generated/dataModel";

interface UseGetMessageProps {
    id: Id<"messages">;

};

export const UseGetMessage = ({id}: UseGetMessageProps) => {
    if(id === undefined){
        return {data: null, isLoading: false};
    }
    const data = useQuery(api.messages.getById, {id});
    const isLoading = data === undefined;
    return {data, isLoading};
};