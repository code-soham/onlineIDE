import Question from "../models/Question.model.js";

const createQuestion = async (req, res) => {
  try {
    const { statement, inputParams, outputParams, difficulty, category } =
      req.body;
    const question = await Question.createQuestion(
      {
        statement,
        inputParams,
        outputParams,
        difficulty,
        category,
      },
      res.locals.user._id
    );
    res.status(200).json({
      resCode: 200,
      resMessage: "Question created successfully",
      question,
    });
  } catch (err) {
    res.status(200).json({
      resCode: 400,
      error: err,
      resMessage: "Question creation failed",
    });
  }
};
const updateQuestion = async (req, res) => {
  try {
    const { statement, inputParams, outputParams, difficulty, category } =
      req.body;
    const question = await Question.updateQuestion(req.params.id, {
      statement,
      inputParams,
      outputParams,
      difficulty,
      category,
    });
    res.status(200).json({
      resCode: 200,
      resMessage: "Question updated successfully",
      question,
    });
  } catch (err) {
    res.status(200).json({
      resCode: 400,
      resMessage: "Question updation failed",
    });
  }
};
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.deleteQuestion(req.params.id);
    res.status(200).json({
      resCode: 200,
      resMessage: "Question deleted successfully",
      question,
    });
  } catch (err) {
    res.status(200).json({
      resCode: 400,
      resMessage: "Question deletion failed",
    });
  }
};
const getQuestion = async (req, res) => {
  try {
    const question = await Question.getQuestion(req.params.id);
    res.status(200).json({
      resCode: 200,
      resMessage: "Question fetched successfully",
      question,
    });
  } catch (err) {
    res.status(200).json({
      resCode: 400,
      resMessage: "Question fetching failed",
    });
  }
};
const getQuestions = async (req, res) => {
  try {
    const questions = await Question.getQuestions(req.params);
    res.status(200).json({
      resCode: 200,
      resMessage: "Questions fetched successfully",
      questions,
    });
  } catch (err) {
    res.status(200).json({
      resCode: 400,
      resMessage: "Questions fetching failed",
    });
  }
};
const addTestCase = async (req, res) => {
  try {
    const { input, output } = req.body;
    const question = await Question.addTestCase(req.params.id, {
      input,
      output,
    });
    res.status(200).json({
      resCode: 200,
      resMessage: "Test case added successfully",
      question,
    });
  } catch (err) {
    res.status(200).json({
      resCode: 400,
      resMessage: "Test case addition failed",
    });
  }
};
const updateTestCase = async (req, res) => {
  try {
    const { input, output } = req.body;
    const question = await Question.updateTestCase(
      req.params.id,
      req.params.testCaseId,
      {
        input,
        output,
      }
    );
    res.status(200).json({
      resCode: 200,
      resMessage: "Test case updated successfully",
      question,
    });
  } catch (err) {
    res.status(200).json({
      resCode: 400,
      resMessage: "Test case updation failed",
    });
  }
};
const deleteTestCase = async (req, res) => {
  try {
    const question = await Question.deleteTestCase(
      req.params.id,
      req.params.testCaseId
    );
    res.status(200).json({
      resCode: 200,
      resMessage: "Test case deleted successfully",
      question,
    });
  } catch (err) {
    res.status(200).json({
      resCode: 400,
      resMessage: "Test case deletion failed",
    });
  }
};

export default {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestion,
  getQuestions,
  addTestCase,
  updateTestCase,
  deleteTestCase,
};
