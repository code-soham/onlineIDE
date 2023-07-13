//controller for sphere engine endpoint
import axios from "axios";
import fs from "fs";
import Question from "../models/Question.model.js";
const submit = async (req, res, next) => {
  const file = await fs.promises.readFile(req.files.source.path, "utf-8");
  const question = await Question.getQuestion(req.params.qid);
  const testCasesInput = question.testCases.map((testCase) => testCase.input);
  let runID, outputURL;
  //combine inputs into one string with number on top
  let tc = testCasesInput.reduce((acc, curr, index) => {
    return `${acc}${curr}\n`;
  }, "");
  tc = `${testCasesInput.length}\n${tc}`;
  //   console.log(tc);
  axios({
    method: "post",
    url: `${process.env.SPHERE_ENGINE_ENDPOINT}/api/v4/submissions?access_token=${process.env.SPHERE_ENGINE_ACCESS_TOKEN}`,
    data: {
      compilerId: req.fields.compilerId,
      input: tc,
      source: file,
    },
  })
    .then((response) => {
      req.data = response.data;
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};
const verdictify = async (req, res) => {
  let runID = req.data?.id;
  console.log(runID);
  let verdictURI = `${process.env.SPHERE_ENGINE_ENDPOINT}/api/v4/submissions/${runID}?access_token=${process.env.SPHERE_ENGINE_ACCESS_TOKEN}`;
  axios({
    method: "get",
    url: verdictURI,
  })
    .then((resp) => {
      if (resp.data.executing) {
        res.status(200).json({
          resCode: 200,
          resMessage: "Submission successful",
          verdict: "executing",
          sphereID: runID,
        });
        return;
      }
      console.log(resp.data.result.streams);
      res.status(200).json({
        resCode: 200,
        resMessage: "Submission successful",
        verdict: resp.data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({
        resCode: 400,
        resMessage: "Could not fetch verdict",
      });
    });
};
const getVerdict = async (req, res) => {
  console.log(req.params.runID);
  let runID = req.params.runID;
  let verdictURI = `${process.env.SPHERE_ENGINE_ENDPOINT}/api/v4/submissions/${runID}?access_token=${process.env.SPHERE_ENGINE_ACCESS_TOKEN}`;
  axios({
    method: "get",
    url: verdictURI,
  })
    .then((resp) => {
      if (resp.data.executing) {
        res.status(200).json({
          resCode: 200,
          resMessage: "Submission successful",
          verdict: "executing",
        });
        return;
      }
      console.log(resp.data.result.streams);
      res.status(200).json({
        resCode: 200,
        resMessage: "Submission successful",
        verdict: resp.data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(200).json({
        resCode: 400,
        resMessage: "Could not fetch verdict",
      });
    });
};

export default { submit, verdictify, getVerdict };
