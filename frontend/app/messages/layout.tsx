import {ReactNode} from "react";

export default async function MessagesLayout({ children }: { children: ReactNode }) {
    const response = await fetch('http://next-caching-backend:8080/messages', {
        headers: {
            'X-ID': 'layout',
        },
    });
    const messages = await response.json();
    const totalMessages = messages.length;

    return (
        <>
            <h1>Important Messages</h1>
            <p>{totalMessages} messages found</p>
            <hr />
            {children}
        </>
    );
}