import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"

export const middyfy = (handler) => {
  return middy(handler)
      .use(middyJsonBodyParser())
};

export const commitMiddyfy = (handler) => {
  return middy(handler)
      .use(middyJsonBodyParser())
};
