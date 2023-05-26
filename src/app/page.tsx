"use client"

import { ChatArea } from "@/components/ChatArea";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { SidebarChatButton } from "@/components/SidebarChatButton";
import { Chat } from "@/types/Chat";
import { openai } from "@/utils/openai";
import { useEffect, useState } from "react";
import { v4 as uuidv4} from 'uuid';

const Page = () => {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [chatActiveId, setChatActiveId] = useState<string>('');
  const [AiLoading, setAiLoading] = useState(false);
  const [chatActive, setChatActive] = useState<Chat>();

  useEffect(() => {
    setChatActive(chatList.find(item => item.id === chatActiveId));
  },[chatActiveId, chatList]);

  
  useEffect(() => {
    if(AiLoading) getAiResponse()
  },[AiLoading]);


  const openSidebar = () => setSidebarOpened(true);
  const closeSidebar = () => setSidebarOpened(false);



  const getAiResponse = async () => {
    let chatListClone = [...chatList];
    let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId);
    if(chatIndex > -1) {
      const response = await openai.generate(
        openai.translateMessages(chatListClone[chatIndex].messages)
      );

      if(response) {
        chatListClone[chatIndex].messages.push({
          id: uuidv4(),
          author: 'ai',
          body: response
        });
      }    
    }      

    setChatList(chatListClone);
    setAiLoading(false);
  }




  const handleClearConversations = () => {
    if(AiLoading) return;

    setChatActiveId('');
    setChatList([]);
  }




  const handleNewChat = () => {
    if(AiLoading) return;

    setChatActiveId('');
    closeSidebar();
  }



  const handleSendMessage = (message: string) => {
    if(!chatActiveId) {

      // Creating new chat
      let newChatId = uuidv4();
      setChatList([{
        id: newChatId,
        title: message,
        messages: [
          { id: uuidv4(), author: 'me', body: message}
        ]
      },...chatList])

      setChatActiveId(newChatId);

    } else {

      // Updating existing chat
      let chatListClone = [...chatList];
      let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId);
      chatListClone[chatIndex].messages.push({
        id: uuidv4(), author: 'me', body: message
      });

      setChatList(chatListClone);
    }
    setAiLoading(true);
  }




  const handleSelectChat = (id: string) => {
    if(AiLoading) return;

    let item = chatList.find(item => item.id === id);
    if(item) setChatActiveId(item.id);
    closeSidebar();
  }



  const handleDeleteChat = (id: string) => {
    let chatListClone = [...chatList];
    let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId);
    chatListClone.splice(chatIndex, 1);

    setChatList(chatListClone);
    setChatActiveId('');
  }



  const handleEditChat = (id: string, newTitle: string) => {
    let chatListClone = [...chatList];
    let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId);
    chatListClone[chatIndex].title = newTitle;

    setChatList(chatListClone);
  }




  return (
    <main className="flex min-h-screen bg-gpt-gray text-white">

      {/* Barra lateral com histórico */}
      <Sidebar
        open={sidebarOpened}
        onClose={closeSidebar}
        onClear={handleClearConversations}
        onNewChat={handleNewChat}
      >

        {chatList.map(item => (
          <SidebarChatButton
            key={item.id}
            chatItem={item}
            active={item.id === chatActiveId}
            onClick={handleSelectChat}
            onDelete={handleDeleteChat}
            onEdit={handleEditChat}
          />
        ))}
      </Sidebar>

      {/* Section principal */}
      <section className="flex flex-col w-full">
        
        {/* Header da Section */}
        <Header
          openSidebarClick={openSidebar}
          title={chatActive ? chatActive.title : 'Nova conversa'}
          newChatClick={handleNewChat}
        />


        {/* Área do Chat principal */}
        <ChatArea chat={chatActive} loading={AiLoading} />


        {/* Área do Footer (Mensagem) */}
        <Footer
          onSendMessage={handleSendMessage}
          disabled={AiLoading}
        />

      </section>
    </main>
  );
}

export default Page;