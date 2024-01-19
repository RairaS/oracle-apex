/// <reference types="Cypress" />

beforeEach(function () {
  cy.visit('https://apex.oracle.com/pls/apex/r/raira/qa-application/home?session=9548180782295')

})

describe('Acessar a aplicação Oracle APEX', () => {
  it('Verificar se o login foi bem-sucedido', () => {

    cy.url().should('include', '/QA Application');
  });

});


describe('Teste de gráfico na aplicação Oracle APEX', () => {
  let valoresDoGrafico;

   cy.xpath('//*[@id="R64979335471665156418_jet"]/svg[1]/g/g/g[1]/g[1]/g[1]/g[1]/g[2]/polygon')
    .invoke('attr', 'points')
    .then((points) => {
      valoresDoGrafico = points.split(' ');
    });
});


describe('Teste de Alteração de Quantidade e Atualização do Gráfico', () => {
  it('Acessa a tabela e altera a quantidade do pedido 10 para 20', () => {


    cy.contains('td.a-GV-cell.u-tE', '10')
      .parents('tr')
      .as('linhaDoPedido10');

    cy.get('@linhaDoPedido10')
      .find('td.a-GV-cell.u-tE')
      .invoke('text')
      .then((quantidade) => {
        if (quantidade.trim() === '20') {
          cy.log('A quantidade já é 20. Nenhuma alteração necessária.');
        } else {
          cy.get('@linhaDoPedido10')
            .find('td.a-GV-cell.u-tE')
            .click()
            .clear()
            .type('20');
        }
      });
  });

  describe('Teste de Alteração de Quantidade e Atualização do Gráfico', () => {
    it('Acessa a tabela e altera a quantidade do pedido 10 para 20', () => {

      cy.get('@linhaDoPedido10')
        .find('td.a-GV-cell.u-tE')
        .invoke('text')
        .should('eq', '20');

    });
  });



  describe('Alteração de Localização na Tabela', () => {
    it('Acessa a tabela e altera a localização do pedido 10 para "Deli"', () => {
      cy.contains('td.a-GV-cell.u-tS', 'Store A')
        .parents('tr')
        .as('linhaDoPedido10');

      cy.get('@linhaDoPedido10')
        .find('td.a-GV-cell.u-tS')
        .invoke('text')
        .then((localizacaoAtual) => {
          if (localizacaoAtual.trim() === 'Deli') {
            cy.log('A localização já é "Deli". Nenhuma alteração necessária.');
          } else {
            cy.get('@linhaDoPedido10')
              .find('td.a-GV-cell.u-tS')
              .click()
              .clear()
              .type('Deli')
          }
        });

      cy.get('@linhaDoPedido10')
        .find('td.a-GV-cell.u-tS')
        .invoke('text')
        .should('eq', 'Deli');

    });
  })
});
