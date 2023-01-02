const { Server } = require("./src/models/server");

require("dotenv").config();

const server = new Server();
server.listen();

// https://www.codeblocq.com/2016/01/Untrack-files-already-added-to-git-repository-based-on-gitignore/
