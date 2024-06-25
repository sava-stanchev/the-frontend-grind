import { useState } from "react";
import { HeartIcon, SpinnerIcon } from "./Icons";
import "./App.css";

export default function App() {
  const [liked, setLiked] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  async function likeUnlikeAction() {
    try {
      setIsPending(true);
      setErrorMessage(null);

      const response = await fetch(
        "https://www.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: liked ? "unlike" : "like",
          }),
        }
      );

      if (!response.ok) {
        const res = await response.json();
        setErrorMessage(res.message);
        return;
      }

      setLiked(!liked);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="button-container">
      <button
        className={[
          "like-button",
          liked ? "like-button--liked" : "like-button--default",
        ]
          .filter(Boolean)
          .join(" ")}
        disabled={isPending}
        onClick={() => {
          likeUnlikeAction();
        }}
      >
        {isPending ? <SpinnerIcon /> : <HeartIcon />}
        {liked ? "Liked" : "Like"}
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}
