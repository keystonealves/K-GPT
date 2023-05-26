import { ChatMessage } from "@/types/ChatMessage";
import IconUser from "./icons/IconUser";
import IconRobot from "./icons/IconRobot";

type Props = {
    item: ChatMessage;
}

export const ChatMessageItem = ({ item }: Props) => {
    return (
        <div className={`py-5 ${item.author === 'ai' && 'bg-gray-600/50'}`}>
            <div className="max-w-4xl m-auto flex">
                <div className={`w-10 h-10 flex justify-center items-center mx-4 md:ml-4 rounded ${item.author === 'ai' ? 'bg-green-600' : 'bg-blue-800' }`}>
                    {item.author === 'me' ? <IconUser width={24} height={24} /> : <IconRobot width={24} height={24} />}
                </div>

                <div className="flex-1 text-base whitespace-pre-wrap">
                    {item.body}
                </div>

            </div>
        </div>
    )
}