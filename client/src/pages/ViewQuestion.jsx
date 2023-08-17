import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditQuestion from "../components/EditQuestion";
import "./styles-pages/ViewQuestion.css";

const ViewPost = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [question, setQuestion] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const params = useParams();

  const getQuestion = async () => {
    try {
      const postBody = await axios.get(
        `http://localhost:4000/questions/${params.questionId}`
      );
      setQuestion(postBody.data.data[0]);
      console.log(postBody.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async () => {
    try {
      await axios.delete(`http://localhost:4000/questions/${question._id}`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getQuestion();
  }, [isUpdate]);

  return (
    <div className="view-question-holder">
      <div className="question-name">
        <h1>{question.name}</h1>
      </div>
      <div className="question-body">{question.question}</div>
      <div className="question-category">Category: {question.category}</div>
      <div className="button-holder">
        <button
          onClick={() => {
            setPopup(true);
          }}
        >
          Edit
        </button>
        {popup && (
          <EditQuestion
            handleClose={() => {
              setPopup(false);
              setIsUpdate(true);
            }}
            questionId={question._id}
          />
        )}
        <button onClick={deleteHandler}>Delete</button>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewPost;
