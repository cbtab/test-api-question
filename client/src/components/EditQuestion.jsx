import "./styles-components/AskQuestion.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EditQuestion = (props) => {
  const [question, setQuestion] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);

  const getCurrentQuestion = async () => {
    const result = await axios(
      `http://localhost:4000/questions/${props.questionId}`
    );
    setName(result.data.data[0].name);
    console.log(result.data.data[0].name);
    setQuestion(result.data.data[0].question);
    setCategory(result.data.data[0].category);
    console.log(result.data.data);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/questions/${props.questionId}`, {
        name,
        question,
        category,
      });
      setIsUpdate(false);
      props.handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentQuestion();
  }, []);
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
            <input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
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
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
