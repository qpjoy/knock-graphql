const express = require('express');
const assert = require('assert');
const graphqlHTTP = require('express-graphql');
const { MongoClient } = require('mongodb');
const pg = require('pg');
const DataLoader = require('dataloader');

const { nodeEnv } = require('./util');

const pgConfig = require('../config/pg')[nodeEnv];

const pgPool = new pg.Pool(pgConfig);

const mConfig = require('../config/mongo')[nodeEnv];
const pgdb = require('../database/pgdb');

const app = express();
const ncSchema = require('../schema');

MongoClient.connect(mConfig.url, (err, mPool) => {
  assert.equal(err, null);

  app.use('/graphql', (req, res) => {
    const loaders = {
      usersByIds: new DataLoader(pgdb.getUsersByIds)
    };

    graphqlHTTP({
      schema: ncSchema,
      graphiql: true,
      context: { pgPool, mPool, loaders },
    })(req, res);
  });

  const PORT = process.env.PORT || 3333;
  app.listen(PORT, () => {
    console.log(`Running in ${nodeEnv} mode... `);
    console.log(`http://localhost:${PORT}/graphql`);
  });
});
