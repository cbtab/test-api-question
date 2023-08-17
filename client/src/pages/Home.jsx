import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AskQuestion from "../components/AskQuestion";
import "./styles-pages/Home.css";

const Home = () => {
  const [popup, setPopup] = useState(false);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const getQuestions = async () => {
    try {
      const allQuestions = await axios.get("http://localhost:4000/questions");
      setQuestions(allQuestions.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQuestions();
  }, [questions]);

  return (
    <div>
      <div className="create-question">
        <button
          onClick={() => {
            setPopup(true);
          }}
        >
          Ask question
        </button>
        {popup && (
          <AskQuestion
            handleClose={() => {
              setPopup(false);
            }}
          />
        )}
      </div>
      {questions.map((question, index) => {
        return (
          <div className="question-card" key={index}>
            <div className="question-holder">{question.name}</div>
            <button
              id="view-button"
              onClick={() => {
                navigate(`/questions/${question._id}`);
              }}
            >
              View
            </button>
            <p>Category: {question.category}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
