const reservation = require('../models').Reservation;

module.exports = {

    getById(req, res) {
      return reservation
        .findByPk(req.params.id, {
          include: [],
        })
        .then((doc) => {
          if (!doc) {
            return res.status(404).send({
              status_response: 'Not Found',
              errors: 'Status Not Found',
            });
          }
          const status = {
            status_response: 'OK',
            status: doc,
            errors: null
          }
          return res.status(200).send(status);
        })
        .catch((error) => {
          res.status(400).send({
            status_response: 'Bad Request',
            errors: error
          });
        });
    },
  
    list(req, res) {
      return reservation.findAll({
          limit: 10,
          include: [],
          order: [
            ['createdAt', 'DESC']
          ],
        })
        .then(docs => {
          const statuses = {
            status_response: 'OK',
            count: docs.length,
            statuses: docs.map(doc => {
              return doc
            }),
            errors: null
          }
          res.status(200).send(statuses);
        })
        .catch((error) => {
          res.status(400).send({
            status_response: 'Bad Request',
            errors: error
          });
        });
    },
  
    listStatusUser(req, res) {
      return reservation
        .findAll({
          limit: 10,
          include: [],
          where: {
              user_id: req.userId,
          },
          order: [
            ['createdAt', 'DESC']
          ],
        })
        .then(docs => {
          const statuses = {
            status_response: 'OK',
            count: docs.length,
            statuses: docs.map(doc => {
              return doc
            }),
            errors: null
          }
          res.status(200).send(statuses);
        })
        .catch((error) => {
          res.status(400).send({
            status_response: 'Bad Request',
            errors: error
          });
        });
    },
  
    add(req, res) {
      return reservation
        .create({
          user_id: req.userId,
          name: req.body.name,
          destination: req.body.destination,
          date: req.body.date,
          carName: req.body.carName,
          passenger: req.body.passenger
        })
        .then((doc) => {
          const status = {
            status_response: 'Created',
            status: doc,
            errors: null
          }
          return res.status(201).send(status);
        })
        .catch((error) => {
          res.status(400).send({
            status_response: 'Bad Request',
            errors: error
          });
        });
    },
  
    update(req, res) {
      return reservation
        .findByPk(req.params.id, {})
        .then(status => {
          if (!status) {
            return res.status(404).send({
              status_response: 'Bad Request',
              errors: 'Status Not Found',
            });
          }
  
          if (status.user_id !== req.userId) {
            return res.status(403).send({
              status_response: "Bad Request",
              errors: "Different User Id",
            });
          }
  
          return reservation
            .update({
              title: req.body.title || status.title,
              body: req.body.body || status.body
            })
            .then((doc) => {
              const status = {
                status_response: 'OK',
                status: doc,
                errors: null
              }
              return res.status(200).send(status);
            })
            .catch((error) => {
              res.status(400).send({
                status_response: 'Bad Request',
                errors: error
              });
            });
        })
        .catch((error) => {
          res.status(400).send({
            status_response: 'Bad Request',
            errors: error
          });
        });
    },
  
    delete(req, res) {
      return reservation
        .findByPk(req.params.id)
        .then(status => {
          if (!status) {
            return res.status(400).send({
              status_response: 'Bad Request',
              errors: 'Status Not Found',
            });
          }
  
          if (status.user_id !== req.userId) {
            return res.status(403).send({
              status_response: "Bad Request",
              errors: "Different User Id",
            });
          }
  
          return reservation
            .destroy()
            .then(() => res.status(204).send({
              status_response: 'No Content',
              errors: null,
            })) // Kenapa respons nya ga keluar di postman? padahal berhasil 
            .catch((error) => {
              res.status(400).send({
                status_response: 'Bad Request',
                errors: error
              });
            });
        })
        .catch((error) => {
          res.status(400).send({
            status_response: 'Bad Request',
            errors: error
          });
        });
    },
  }