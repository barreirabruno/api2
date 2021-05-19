## Caso de uso

1. ✅ Recebe uma requisição do tipo **POST** na rota **/api/calculate-property-price**
2. ✅ Recebe a quantidade de metros quadrados no  corpo da requisição, pela propriedade **landSize**
3. ✅ A propriedade **landSize** deve ser maior que 10 ou menor que 10000
4. ✅ Busca o preço do metro quadrado na **API1**
5. ✅ Retorna **200** com a quantidade de metros quadrados, preço do metro quadrado e o valor do imóvel

## Exceções

1. ✅ Retorna **400** caso a propriedade landSize seja menor que 10 ou maior que 10000
2. ✅ Retorna **500** se de erro ao buscar o preço do metro quadrado na API1