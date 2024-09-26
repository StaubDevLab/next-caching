import Messages from '@/components/messages';
import {getMessages} from "@/lib/messages";

export default async function MessagesPage() {
    /*const response = await fetch('http://next-caching-backend:8080/messages',{
        next:{
            tags:["msg"]
        }
    });
    const messages = await response.json();*/
    const messages = await getMessages();

    if (!messages || messages.length === 0) {
        return <p>No messages found</p>;
    }

    return <Messages messages={messages} />;
}
