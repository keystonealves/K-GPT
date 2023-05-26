import Link from "next/link";
import { ChatMessageInput } from "./ChatMessageInput";

type Props = {
    disabled: boolean;
    onSendMessage: (message: string) => void;
}

export const Footer = ({ disabled, onSendMessage }: Props) => {
    return (
        <footer className="w-full border-t border-t-gray-600 p-2">
            <div className="max-w-4xl m-auto mb-4">
                <ChatMessageInput
                    disabled={disabled}
                    onSend={onSendMessage}
                />
                <div className="pt-3 text-center text-xs text-gray-300">
                    Desenvolvido por Keystone, inspirado na versão oficial em 05/23, apenas para fins acadêmicos.<br/>
                    <Link href={"https://keystonealves.com"} className="underline">
                        Conheça melhor meus trabalhos clicando aqui</Link>
                </div>
            </div>
        </footer>
    );
}