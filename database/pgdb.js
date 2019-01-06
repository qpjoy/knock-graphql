/* eslint-disable no-trailing-spaces */
const humps = require('humps');
const _ = require('lodash');


module.exports = pgPool => {

  const orderedFor = (rows, collection, field) => {
    const data = humps.camelizeKeys(rows);
    const inGroupsOfField = _.groupBy(data, field);

    return collection.map(element => {
      const elementArray = inGroupsOfField[element];
      if(elementArray) {
        return elementArray[0];
      }
      return {};
    });
  }

  return {
    getUsersByIds(userIds) {
      return pgPool.query(`
      select * from users
      where id = ANY($1)
      `, [userIds]).then(res => {
        // return humps.camelizeKeys(res.rows);
        return orderedFor(res.rows, userIds, 'id');
      }); // returns first row
    },
    getUserByApiKey(userId) {
      return pgPool.query(`
      select * from users
      where api_key = $1
      `, [userId]).then(res => {
        return humps.camelizeKeys(res.rows[0]);
      }); // returns first row
    },

    getContests(user) {
      return pgPool.query(`
      select * from contests
      where created_by = $1
      `, [user.id]).then(res => humps.camelizeKeys(res.rows));
    },

    getNames(contest) {
      return pgPool.query(`
      select * from names 
      where contest_id = $1
      `, [contest.id]).then(res => humps.camelizeKeys(res.rows));
    },
  }


};
