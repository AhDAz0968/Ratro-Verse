import "../../styles/MessagesDashboard.css";
import { useState } from "react";

function MessagesDashboard() {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);


    // Temporary message data
    // Later you can replace this with Supabase data
    const messages = [
        {
            id: 1,
            name: "John",
            email: "john@gmail.com",
            subject: "Game Suggestion",
            message: "You should add Chrono Trigger and EarthBound.",
            date: "12/08/2026"
        },
        {
            id: 2,
            name: "Tom",
            email: "tom@gmail.com",
            subject: "Bug Report",
            message: "I found a bug when trying to search for games.",
            date: "11/08/2026"
        },
        {
            id: 3,
            name: "Anna",
            email: "anna@gmail.com",
            subject: "Feedback",
            message: "The website looks really cool. I love the retro design!",
            date: "10/08/2026"
        }
    ];


    // Search messages
    const filteredMessages = messages.filter((message) =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
    );


    // Delete message
    function deleteMessage(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this message?"
        );

        if (!confirmDelete) return;

        console.log("DELETE MESSAGE:", id);

        // Later:
        // Supabase delete function goes here
    }


    return (

        <div className="messagesDashboard">


            {/* =========================
                HEADER
            ========================= */}

            <div className="messagesHeader">

                <h1>MESSAGE TERMINAL</h1>

            </div>


            {/* =========================
                SEARCH
            ========================= */}

            <div className="messageSearch">

                <input
                    type="text"
                    placeholder="SEARCH MESSAGES..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

            </div>


            {/* =========================
                MESSAGE TABLE
            ========================= */}

            <div className="messagesTableContainer">

                <table className="messagesTable">

                    <thead>

                        <tr>

                            <th>NAME</th>

                            <th>EMAIL</th>

                            <th>SUBJECT</th>

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
                                    {message.subject}
                                </td>

                                <td>
                                    {message.date}
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


            {/* =========================
                MESSAGE DETAIL MODAL
            ========================= */}

            {selectedMessage && (

                <div className="messageModalOverlay">

                    <div className="messageModal">


                        {/* MODAL HEADER */}

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

                                <span>SUBJECT</span>

                                <p>
                                    {selectedMessage.subject}
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
                                    {selectedMessage.date}
                                </p>

                            </div>


                        </div>


                        {/* MODAL ACTIONS */}

                        <div className="messageModalActions">

                            <button
                                className="replyMessageBtn"
                                onClick={() =>
                                    window.location.href =
                                    `mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`
                                }
                            >
                                REPLY
                            </button>


                            <button
                                className="deleteMessageBtn"
                                onClick={() => {

                                    deleteMessage(
                                        selectedMessage.id
                                    );

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