"use client";
import { useQuery } from "convex/react";

import {api} from "../../../../convex/_generated/api";

import {Id} from "../../../../convex/_generated/dataModel";

interface UseGetChannelProps {
    id: Id<"channels">;

};

export const useGetChannel = ({id}: UseGetChannelProps) => {
    if(id === undefined){
        return {data: null, isLoading: false};
    }
    const data = useQuery(api.channels.getById, {id});
    const isLoading = data === undefined;
    return {data, isLoading};
};