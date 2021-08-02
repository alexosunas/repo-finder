import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import {repoPayloadValidation, commitPayloadValidation, errorHandler} from "../middlewares/payload-validation";

export const middyfy = (handler) => {
  return middy(handler)
      .use(repoPayloadValidation())
      .use(middyJsonBodyParser())
      .use(errorHandler())
};

export const commitMiddyfy = (handler) => {
  return middy(handler)
      .use(commitPayloadValidation())
      .use(middyJsonBodyParser())
      .use(errorHandler())
};
