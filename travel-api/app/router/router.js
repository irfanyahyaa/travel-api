const verifySignUpController = require('../controllers').verifySignUp;
const verifySignController = require('../controllers').verifySign;
const reservationController = require('../controllers').reservation;
const verifyJwtTokenController = require('../controllers').verifyJwtToken;

module.exports = function (app) {

	//User Auth
	app.post('/api/auth/signup',
		[
      		verifySignUpController.checkDuplicateUserNameOrEmail,
			verifySignUpController.checkRolesExisted
		],
		(req, res) => {
			verifySignController.signup(req, res);
		});

	app.post('/api/auth/signin', (req, res) => {
		verifySignController.signin(req, res);
	});
	
	//Reservation
	app.get('/api/status', (req, res) => {
		reservationController.list(req, res);
	});
	app.get('/api/statususer', [verifyJwtTokenController.verifyToken], (req, res) => {
		reservationController.listStatusUser(req, res);
	});
	app.get('/api/status/:id',
		[
			verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		(req, res) => {
			reservationController.getById(req, res);
		});
	app.post('/api/reservation',
		[
			verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		(req, res) => {
			reservationController.add(req, res);
		});
	app.put('/api/status/:id',
		[
			verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		(req, res) => {
			reservationController.update(req, res);
		});
	app.delete('/api/status/:id',
		[
			verifyJwtTokenController.verifyToken,
			verifyJwtTokenController.isAdmin
		],
		(req, res) => {
			reservationController.delete(req, res);
		});
}