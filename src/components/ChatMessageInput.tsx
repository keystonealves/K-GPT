import { KeyboardEvent, useEffect, useRef, useState } from "react";
import IconSend from "./icons/IconSend";

type Props = {
    disabled: boolean;
    onSend: (message: string) => void;
}

export const ChatMessageInput = ({ disabled, onSend }: Props) => {

    const [text, setText] = useState('');
    const textEl = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if(textEl.current) {
            textEl.current.style.height = '0px';
            let scrollHeight = textEl.current.scrollHeight;
            textEl.current.style.height = scrollHeight + 'px';
        }
    },[text, textEl]);

    const handleTextKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.shiftKey) return;
        if(event.code.toLowerCase() === 'enter' || event.code.toLowerCase() === 'numpadenter') {
            event.preventDefault();
            handleSendMessage();
        }
    }

    const handleSendMessage = () => {
        if(!disabled && text.trim() !== '') {
            onSend(text);
            setText('');
        }
    }


    return (
        <div className={`flex justify-center items-center border border-gray-800/50 bg-gpt-lightgray p-2 rounded-md
        ${disabled && 'opacity-50'}`}>

            <textarea
            ref={textEl}
            className="flex-1 border-0 bg-transparent resize-none outline-none h-6 max-h-48 overflow-y-auto "
            placeholder="Digite uma mensagem"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleTextKeyDown}
            disabled={disabled}
            >

            </textarea>

            <div onClick={handleSendMessage} className={`self-end p-2 rounded
                ${text.length ? 'opacity-100 hover:bg-black/20 cursor-pointer ' : 'opacity-20'}
            `}>
                <IconSend width={16} height={16} />
            </div>

        </div>
    );
}