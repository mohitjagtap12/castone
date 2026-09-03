import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MessageSquare,
  Send,
  User,
  ShieldCheck,
  CheckCheck,
} from 'lucide-react';

export const ChatView: React.FC = () => {
  const { currentUser, chatMessages, sendChatMessage } = useApp();
  const [selectedThread, setSelectedThread] = useState<string>('thread_trader_farmer_1');
  const [inputMessage, setInputMessage] = useState('');

  // Group messages by thread
  const threadMap = chatMessages.reduce((acc, msg) => {
    if (!acc[msg.threadId]) acc[msg.threadId] = [];
    acc[msg.threadId].push(msg);
    return acc;
  }, {} as Record<string, typeof chatMessages>);

  const activeMessages = threadMap[selectedThread] || [];
  const otherParticipantName = activeMessages[0]?.receiverId === currentUser.id
    ? activeMessages[0]?.senderName
    : activeMessages[0]?.receiverName || 'Farmer / Partner';

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    sendChatMessage(
      'usr_farmer_1',
      otherParticipantName,
      inputMessage,
      selectedThread,
      'Direct Agro Query'
    );
    setInputMessage('');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
      
      {/* Threads Sidebar */}
      <div className="md:col-span-4 border-r border-slate-200 p-4 space-y-3 bg-slate-50/50">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          Agro Conversations
        </h3>

        <div className="space-y-1.5">
          {Object.keys(threadMap).map((tId) => {
            const msgs = threadMap[tId];
            const last = msgs[msgs.length - 1];
            const isSelected = selectedThread === tId;

            return (
              <div
                key={tId}
                onClick={() => setSelectedThread(tId)}
                className={`p-3 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-white border-emerald-500 shadow-sm'
                    : 'bg-transparent border-transparent hover:bg-white hover:border-slate-200'
                }`}
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-900 truncate">
                    {last.senderId === currentUser.id ? last.receiverName : last.senderName}
                  </span>
                  <span className="text-[10px] text-slate-400">{last.timestamp}</span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">{last.message}</p>
                {last.contextTag && (
                  <span className="inline-block mt-1 px-1.5 py-0.2 text-[9px] font-semibold bg-emerald-50 text-emerald-800 rounded-sm">
                    {last.contextTag}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Chat Window */}
      <div className="md:col-span-8 flex flex-col justify-between h-full bg-white">
        
        {/* Chat Top Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              {otherParticipantName.charAt(0)}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">{otherParticipantName}</h4>
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Verified AgroWorld Member
              </span>
            </div>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[400px]">
          {activeMessages.map((msg) => {
            const isMe = msg.senderId === currentUser.id;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-md p-3 rounded-2xl text-xs space-y-1 ${
                    isMe
                      ? 'bg-emerald-700 text-white rounded-br-xs'
                      : 'bg-slate-100 text-slate-800 rounded-bl-xs'
                  }`}
                >
                  <p className="leading-relaxed">{msg.message}</p>
                  <div
                    className={`flex justify-end items-center gap-1 text-[9px] ${
                      isMe ? 'text-emerald-200' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="w-3 h-3" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Input Box */}
        <form onSubmit={handleSend} className="p-3 border-t border-slate-200 flex gap-2 bg-slate-50">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message, counter rate, or farm query..."
            className="flex-1 text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 bg-white"
          />
          <button
            type="submit"
            className="p-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-xs transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
