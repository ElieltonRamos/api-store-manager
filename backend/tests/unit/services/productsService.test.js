const { expect } = require('chai');
const sinon = require('sinon');
const services = require('../../../src/services');
const models = require('../../../src/models');
const mockDBProducts = require('../../mocks/mockDataBase');

describe('Realizando testes unitários para a camada service', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('A função listAllProducts deve retornar todos os produtos e o status da requisição em caso de sucesso', async function () {
    sinon.stub(models, 'findAllProducts').resolves(mockDBProducts);

    const { status, data } = await services.listAllProducts();
    expect(data).to.be.an('array');
    expect(status).to.be.equal('OK');
  });

  it('A função listAllProducts deve retornar um array vazio e o status not found em caso de erro', async function () {
    sinon.stub(models, 'findAllProducts').resolves([]);

    const { status, data } = await services.listAllProducts();
    expect(data).to.deep.equal({ message: 'Not found' });
    expect(status).to.be.equal('NOT_FOUND');
  });
});