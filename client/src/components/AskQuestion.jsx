import "./styles-components/AskQuestion.css";
import { useState } from "react";
import axios from "axios";

const AskQuestion = (props) => {
  const [question, setQuestion] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/questions", {
        name,
        question,
        category,
      });
      props.handleClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="popup-ask-question">
      <div className="ask-question-card">
        <button className="close-popup" onClick={props.handleClose}>
          X
        </button>
        <div className="form">
          <form
            className="form-holder"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <label>Question</label>
            <textarea
              id="name"
              value={name}
              cols={40}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></textarea>
            <label>Provide context for your question</label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => {
                setQuestion(e.target.value);
              }}
              rows={10}
              cols={100}
            ></textarea>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option disabled value="">
                Category
              </option>
              <option value="software">Software</option>
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="science">Science</option>
              <option value="other">Others</option>
            </select>
            <button type="submit" id="submit-button">
              Ask
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
