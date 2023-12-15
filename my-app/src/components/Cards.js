import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import { useAuthContext } from "../hooks/useAuthContext";
import { useFeedbackContext } from "../context/FeedbackContext";
import { useEffect } from "react";
import AddCommentIcon from '@mui/icons-material/AddComment';



export default function Cardcontainer({ cardId, ...props }) {
  const { feedbacks, comments, dispatch } = useFeedbackContext();
  const [isAddingFeedback, setIsAddingFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const { user } = useAuthContext();
  const [commentText, setCommentText] = useState("");

  // Load feedback from local storage when the component mounts
  useEffect(() => {
    const storedFeedback = localStorage.getItem(`feedback_${cardId}`);
    const storedComments = localStorage.getItem(`comments_${cardId}`);

    if (storedFeedback) {
      dispatch({ type: "ADD_FEEDBACK", cardId, feedback: storedFeedback });
    }

  }, [cardId, dispatch]);

  const handleAddFeedback = () => {
    setIsAddingFeedback(true);
  };

  const handleSaveFeedback = () => {
    const feedback = feedbackText;
    dispatch({ type: "ADD_FEEDBACK", cardId, feedback });

    // Save feedback to local storage
    localStorage.setItem(`feedback_${cardId}`, feedback);

    setIsAddingFeedback(false);
  };

  const handleFeedbackChange = (event) => {
    setFeedbackText(event.target.value);
  };


  return (
    <Card sx={{ maxWidth: 345, minHeight: "100%" }}>
      <CardHeader
        avatar={<Avatar aria-label="recipe">{props.avatar}</Avatar>}
        title={props.title}
        subheader={props.type}
        action={
          user.role === "facilitator" || "teamlead"  ? ( // Check user's role
            <IconButton
              aria-label="delete"
              sx={{ alignItems: "flex-start" }}
              onClick={handleAddFeedback}
            >
              <AddIcon />
            </IconButton>
          ) : null
        }
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.details}
        </Typography>
      </CardContent>

      {isAddingFeedback ? (
        <CardContent className="addfeedback">
          <div className="addfeedback-content">
            <>
              <TextField
                multiline
                fullWidth
                value={feedbackText}
                onChange={handleFeedbackChange}
                label="Feedback"
              />
              <IconButton
                aria-label="delete"
                sx={{ float: "right" }}
                onClick={handleSaveFeedback}
              >
                <CheckIcon />
              </IconButton>
            </>
          </div>
        </CardContent>
      ) : (
        // Display feedback or "No feedback" message
        <CardContent className="feedbackui">
          {feedbacks[cardId] ? (
            <>
              <p style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
                Feedback from facilitator:
              </p>
              <div className="feedback-content">{feedbacks[cardId]}</div>
            </>
          ) : (
            <p style={{ fontSize: 14, fontWeight: 600 }}>
              No feedback from facilitator yet !
            </p>
          )}   
        
        </CardContent>
      )}

      <CardActions>
        <Chip
          avatar={<Avatar>TO:</Avatar>}
          label={props.recipient ? props.recipient : "Team Lead"}
        />
      </CardActions>
    </Card>
  );
}
