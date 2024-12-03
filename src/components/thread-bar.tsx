import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface ThreadBarProps {
  count?: number;
  image?: string;
  timestamp?: number;
  onClick?: () => void;
}

export const ThreadBar = ({
  count,
  image,
  timestamp,
  onClick,
}: ThreadBarProps) => {
  // console.log("ThreadBar received props:", { count, image, timestamp });

  if (!count || !timestamp) {
    return null;
  }

  return (
    <button
      className="p-1 rounded-md hover:bg-white border border-transparent hover:border-border flex items-center justify-start group/thread-bar transition max-w-[600px]"
      onClick={onClick}
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <Avatar className="size-6 shrink-0">
          <AvatarImage src={image} />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
        <span className="text-xs text-sky-700 hover: underline font-bold truncate">
          {count} {count > 1 ? "replies" : "reply"}
        </span>

        <span className="text-xs text-muted-foreground truncate group-hover/thread-bar:block hidden">
          Last reply{" "}
          {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
        </span>
        <span className="text-xs text-muted-foreground truncate hover/thread-bar:block hidden">
          View Thread
        </span>
      </div>
    </button>
  );
};
