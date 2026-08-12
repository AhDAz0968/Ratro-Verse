import "../../styles/MessagesDashboard.css";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

function MessagesDashboard() {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);

    const [messages, setMessages] = useState([]);

    //load data
    useEffect(() => {
        fetchMessages();
    }, []);

    //fetch data
    async function fetchMessages() {

        const { data, error } = await supabase
            .from('contact_messages')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("FETCH MESSAGES ERROR:", error);
            return;
        }

        console.log("MESSAGES:", data);

        setMessages(data);
    }




    // Search messages
    const filteredMessages = messages.filter((message) =>
        message.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message?.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // Delete message
    async function deleteMessage(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (!confirmDelete) return;

        const { error } = await supabase
            .from('contact_messages')
            .delete()
            .eq('id', id);

        if (error) {
            console.error("DELETE MESSAGE ERROR:", error);
            alert("Failed to delete message");
            return;
        }

        await fetchMessages();

        alert("Message deleted!");
    }


    return (

        <div className="messagesDashboard">

            <div className="messagesHeader">

                <h1>MESSAGE TERMINAL</h1>

            </div>

            <div className="messageSearch">

                <input
                    type="text"
                    placeholder="SEARCH MESSAGES..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

            </div>

            <div className="messagesTableContainer">

                <table className="messagesTable">

                    <thead>

                        <tr>

                            <th>NAME</th>

                            <th>EMAIL</th>

                            <th>TOPIC</th>

                            <th>DATE</th>

                            <th>ACTION</th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredMessages.map((message) => (

                            <tr key={message.id}>

                                <td>
                                    {message.name}
                                </td>

                                <td>

                                    <a
                                        href={`mailto:${message.email}`}
                                        className="messageEmail"
                                    >
                                        {message.email}
                                    </a>

                                </td>

                                <td>
                                    {message.topic}
                                </td>

                                <td>
                                    {new Date(message.created_at).toLocaleDateString()}
                                </td>

                                <td>

                                    <button
                                        className="viewMessageBtn"
                                        onClick={() =>
                                            setSelectedMessage(message)
                                        }
                                    >
                                        VIEW
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            
            {selectedMessage && (

                <div className="messageModalOverlay">

                    <div className="messageModal">

                        <div className="messageModalHeader">

                            <h2>
                                MESSAGE DETAILS
                            </h2>

                            <button
                                className="closeMessageX"
                                onClick={() =>
                                    setSelectedMessage(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        {/* MESSAGE INFORMATION */}

                        <div className="messageDetails">


                            <div className="messageDetailItem">

                                <span>NAME</span>

                                <p>
                                    {selectedMessage.name}
                                </p>

                            </div>


                            <div className="messageDetailItem">

                                <span>EMAIL</span>

                                <p>

                                    <a
                                        href={`mailto:${selectedMessage.email}`}
                                        className="modalEmail"
                                    >
                                        {selectedMessage.email}
                                    </a>

                                </p>

                            </div>


                            <div className="messageDetailItem">

                                <span>TOPIC</span>

                                <p>
                                    {selectedMessage.topic}
                                </p>

                            </div>


                            <div className="messageDetailItem">

                                <span>MESSAGE</span>

                                <p className="fullMessage">
                                    {selectedMessage.message}
                                </p>

                            </div>


                            <div className="messageDetailItem">

                                <span>DATE</span>

                                <p>
                                    {new Date(selectedMessage.created_at).toLocaleString()}
                                </p>

                            </div>


                        </div>


                        {/* MODAL ACTIONS */}
                        <div className="messageModalActions">

                            <button
                                className="replyMessageBtn"
                                onClick={() =>
                                    window.location.href =
                                    `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.topic}`
                                }
                            >
                                REPLY
                            </button>


                            <button
                                className="deleteMessageBtn"
                                onClick={ async () => {

                                    await deleteMessage(selectedMessage.id);

                                    setSelectedMessage(null);

                                }}
                            >
                                DELETE
                            </button>


                            <button
                                className="closeMessageBtn"
                                onClick={() =>
                                    setSelectedMessage(null)
                                }
                            >
                                CLOSE
                            </button>

                        </div>


                    </div>

                </div>

            )}

        </div>

    );
}

export default MessagesDashboard;