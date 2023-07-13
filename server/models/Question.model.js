import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema(
  {
    input: {
      type: String,
      required: [true, "Please enter a input"],
    },
    output: {
      type: String,
      required: [true, "Please enter a output"],
    },
  }
);
const QuestionSchema = new mongoose.Schema(
  {
    statement: {
      type: String,
      required: [true, "Please enter a question"],
    },
    inputParams: {
      type: String,
      required: [true, "Please enter a inputParams"],
    },
    outputParams: {
      type: String,
      required: [true, "Please enter a outputParams"],
    },
    testCases: [testCaseSchema],
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    category: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

//add update and delete functions
QuestionSchema.statics = {
  createQuestion: async function (data, author) {
    try {
      const question = await this.create({ ...data, author });
      return question;
    } catch (err) {
      throw err;
    }
  },
  updateQuestion: async function (id, data) {
    try {
      const question = await this.findByIdAndUpdate(id, data, {
        new: true,
      });
      return question;
    } catch (err) {
      throw err;
    }
  },
  deleteQuestion: async function (id) {
    try {
      const question = await this.findByIdAndDelete(id);
      return question;
    } catch (err) {
      throw err;
    }
  },
  addTestCase: async function (id, data) {
    try {
      const question = await this.findByIdAndUpdate(
        id,
        { $push: { testCases: data } },
        { new: true }
      );
      return question;
    } catch (err) {
      throw err;
    }
  },
  updateTestCase: async function (id, testCaseId, data) {
    console.log(id, testCaseId, data);
    try {
      const question = await this.findOneAndUpdate(
        { _id: id, "testCases._id": testCaseId },
        {
          $set: {
            "testCases.$": data,
          },
        },
        { new: true }
      );
      return question;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  deleteTestCase: async function (id, testCaseId) {
    try {
      const question = await this.findByIdAndUpdate(
        id,
        { $pull: { testCases: { _id: testCaseId } } },
        { new: true }
      );
      return question;
    } catch (err) {
      throw err;
    }
  },
  getQuestion: async function (id) {
    try {
      const question = await this.findById(id);
      return question;
    } catch (err) {
      throw err;
    }
  },

  getQuestions: async function (query) {
    try {
      const questions = await this.find(query);
      return questions;
    } catch (err) {
      throw err;
    }
  },
};

const Question = mongoose.model("Question", QuestionSchema);
export default Question;
