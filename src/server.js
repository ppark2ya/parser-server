import { GraphQLServer, PubSub } from "graphql-yoga";
import cors from "cors";
import logger from "morgan";
import schema from "./schema";

const PORT = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT = "/playground";
const GRAPHQL_ENDPOINT = "/graphql";
const SUBSCRIPTION_ENDPOINT = "/subscription";

const appOptions = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
  subscription: SUBSCRIPTION_ENDPOINT
};

const server = new GraphQLServer({
  schema,
  context: req => {
    const { connection: { context = null } = {} } = req;
    return {
      req: req.request,
      pubSub: new PubSub(),
      context
    };
  }
});

server.express.use(cors());
server.express.use(logger("dev"));
const handleAppStart = () =>
  console.log(
    `Graphql Server running on http://localhost:${PORT}${PLAYGROUND_ENDPOINT}`
  );

server.start(appOptions, handleAppStart);
