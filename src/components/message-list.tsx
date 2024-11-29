import { format, isToday, isYesterday } from "date-fns";
import { GetMessagesReturnType } from "@/features/members/api/use-get-messages";
import { Message } from "./message";

interface MessageListProps {
  memberName?: string;
  memberImage?: string;
  channelName?: string;
  channelCreationTime?: number;
  variant?: "channel" | "thread" | "conversation";
  data: GetMessagesReturnType | undefined;
  loadMore: () => void;
  isLoadingMore: boolean;
  canLoadMore: boolean;
}

const formatDateLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";

  return format(date, "EEEE, MMMM d");
};

export const MessageList = ({
  memberName,
  memberImage,
  channelName,
  channelCreationTime,
  variant = "channel",
  data,
  loadMore,
  isLoadingMore,
  canLoadMore,
}: MessageListProps) => {
  const groupedMessages = data?.reduce(
    (groups, message) => {
      const date = new Date(message._creationTime);
      const dateKey = format(date, "yyyy-MM-dd");
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].unshift(message);
      return groups;
    },
    {} as Record<string, typeof data>
  );

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column-reverse",
        paddingBottom: "1rem",
        overflowY: "auto",
      }}
      className="messages-scrollbar"
    >
      {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
        <div key={dateKey}>
          <div
            style={{
              textAlign: "center",
              margin: "0.5rem 0",
              position: "relative",
            }}
          >
            <hr
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                borderTop: "1px solid #D1D5DB",
              }}
            />
            <span
              style={{
                position: "relative",
                display: "inline-block",
                backgroundColor: "white",
                padding: "0.25rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                border: "1px solid #D1D5DB",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              }}
            >
              {formatDateLabel(dateKey)}
            </span>
          </div>
          {messages.map((message, index) => {
            return (
              <Message
                key={message._id}
                id={message._id}
                memberId={message.memberId}
                authorImage={message.user.image}
                authorName={message.user.name}
                isAuthor={false}
                reactions={message.reactions}
                body={message.body}
                image={message.image}
                updateAt={message.updatedAt}
                createdAt={message._creationTime}
                isEditing={false}
                setEditingId={() => {}}
                isCompact={false}
                hidnThreadButton={false}
                threadCount={message.threadCount}
                threadImage={message.threadImage}
                threadTimestamp={message.threadTimestamp}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};
