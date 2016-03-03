var home = require('../../app/controllers/home'),
	//app = require('../../server'),
	routes = require('../../app/routes');

describe('Routes', function(){
	var app = {
		get: sinon.spy(),
		post: sinon.spy(),
		delete: sinon.spy(),
		use : sinon.spy()
	};

	beforeEach(function(){
		routes(app);
	});

	describe('GETs', function() {
		it('should handle get /employees', function(){
			expect(app.use).to.be.calledWith(routes.router);
		});
	});

/*
	describe('POSTs', function() {
		it('should handle post /employees', function(){
			expect(app.post).to.be.calledWith('/employees',home.create);
		});
	});

	describe('DELETEs', function() {
		it('should handle /employees/:id', function(){
			expect(app.delete).to.be.calledWith('/employees/:id', home.remove);
		});
	});
*/

});