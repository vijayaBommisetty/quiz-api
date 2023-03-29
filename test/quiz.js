const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('GET /quiz/:numberOfQuestions', () => {
  it('should return a JSON response with status 200 and an array of random quiz questions of the specified size', (done) => {
    chai.request(server)
      .get('/quiz/5')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have.property('data').to.be.an('array').with.lengthOf(5);
        done();
      });
  });
  
  it('should handle invalid requests with status 500 and an error message', (done) => {
    chai.request(server)
      .get('/quiz/1000')
      .end((err, res) => {
        console.log("jjjjj",res.body)
        res.should.have.status(500);
        res.body.should.be.an('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('message').eql('Failed to load quiz questions');
        done();
      });
  });
});
