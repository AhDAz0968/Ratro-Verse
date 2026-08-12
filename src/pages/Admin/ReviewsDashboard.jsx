import "../../styles/ReviewsDashboard.css";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

function ReviewsDashboard() {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedReview, setSelectedReview] = useState(null);
    const [reviews, setReviews] = useState([]);

    //load data
    useEffect(() => {
        fetchReviews();
    }, []);

    //fetching data
    async function fetchReviews() {

        const { data, error } = await supabase
            .from('reviews')
            .select(`
                id,
                user_id,
                game_id,
                rating,
                review_text,
                profiles (
                    username
                ),
                games (
                    title
                )
            `)
            .order('id', { ascending: true });

        if (error) {
            console.error("FETCH REVIEWS ERROR:", error);
            return;
        }

        console.log("REVIEWS:", data);

        setReviews(data);
    }
    

    // Create stars
    function displayStars(rating) {

        return "⭐".repeat(rating);

    }


    // Search reviews
    const filteredReviews = reviews.filter((review) =>
        review.profiles?.username
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||

        review.games?.title
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||

        review.review_text
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
    );


    // Delete review
    async function deleteReview(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this review?"
        );

        if (!confirmDelete) return;

        const { error } = await supabase
            .from('reviews')
            .delete()
            .eq('id', id);

        if (error) {
            console.error("DELETE REVIEW ERROR:", error);
            alert("Failed to delete review");
            return;
        }

        await fetchReviews();

        alert("Review deleted!");
    }


    return (
        <div className="reviewsDashboard">

            <div className="reviewsHeader">

                <h1>REVIEW LOGS</h1>

            </div>

            <div className="reviewSearch">

                <input
                    type="text"
                    placeholder="SEARCH REVIEWS..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

            </div>


            <div className="reviewsTableContainer">

                <table className="reviewsTable">

                    <thead>

                        <tr>

                            <th>USER</th>

                            <th>GAME</th>

                            <th>RATING</th>

                            <th>REVIEW</th>

                            <th>ACTION</th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredReviews.map((review) => (

                            <tr key={review.id}>

                                <td>
                                    {review.profiles?.username}
                                </td>

                                <td>
                                    {review.games?.title}
                                </td>

                                <td>

                                    <span className="reviewRating">
                                        {displayStars(review.rating)}
                                    </span>

                                </td>

                                <td className="reviewComment">

                                    {review.review_text}

                                </td>

                                <td className="reviewActions">

                                    <button
                                        className="viewReviewBtn"
                                        onClick={() => setSelectedReview(review)
                                        }
                                    >
                                        VIEW
                                    </button>


                                    <button
                                        className="deleteReviewBtn"
                                        onClick={() => deleteReview(review.id)
                                        }
                                    >
                                        DELETE
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>


            {/* REVIEW DETAIL POPUP */}

            {selectedReview && (

                <div className="reviewModalOverlay">

                    <div className="reviewModal">


                        <div className="reviewModalHeader">

                            <h2>
                                REVIEW DETAILS
                            </h2>

                            <button
                                className="closeModalX"
                                onClick={() =>
                                    setSelectedReview(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        <div className="reviewDetails">

                            <div className="reviewDetailItem">

                                <span>USER</span>

                                <p>
                                    {selectedReview.profiles?.username}
                                </p>

                            </div>


                            <div className="reviewDetailItem">

                                <span>GAME</span>

                                <p>
                                    {selectedReview.games?.title}
                                </p>

                            </div>


                            <div className="reviewDetailItem">

                                <span>RATING</span>

                                <p className="modalRating">

                                    {displayStars(
                                        selectedReview.rating
                                    )}

                                </p>

                            </div>


                            <div className="reviewDetailItem">

                                <span>COMMENT</span>

                                <p className="modalComment">

                                    {selectedReview.review_text}

                                </p>

                            </div>

                        </div>


                        <div className="modalActions">

                            <button
                                className="modalDeleteBtn"
                                onClick={async () => {

                                    await deleteReview(selectedReview.id);

                                    setSelectedReview(null);

                                }}
                            >
                                DELETE
                            </button>


                            <button
                                className="modalCloseBtn"
                                onClick={() =>
                                    setSelectedReview(null)
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

export default ReviewsDashboard;