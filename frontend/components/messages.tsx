import {Message} from "@/@types/Message";

export default function Messages({ messages } :{ messages: Message[] }) {
    return (
        <ul className="messages">
            {messages.map((message) => (
                <li key={message.id}>{message.text}</li>
            ))}
        </ul>
    );
}
