# Customer Success Balancing

![Tests](https://github.com/hugofabricio/cs-balancing/actions/workflows/build.yml/badge.svg)

## Solução

Na solução, foquei na otimização, mantendo um número menor de execuções.

Para atingir o objetivo, os pontos abaixos foram bem importantes:

- Remoção dos customers success indisponíveis.
- Ordenação dos customers success e clientes pelo score.
- Manter o score mínimo atual para ser utilizado durante as interações, evitando executar o restante quando for igual ao atual

Criei também algumas regras de validação para contemplar as premissas marcadas abaixo e seus respectivos cenários.

## Premissas contempladas

- [x] Todos os CSs têm níveis diferentes
- [x] Não há limite de clientes por CS
- [x] Clientes podem ficar sem serem atendidos
- [x] Clientes podem ter o mesmo tamanho
- [x] 0 < n < 1.000
- [x] 0 < m < 1.000.000
- [ ] 0 < id do cs < 1.000
- [ ] 0 < id do cliente < 1.000.000
- [x] 0 < nível do cs < 10.000
- [ ] 0 < tamanho do cliente < 100.000
- [x] Valor máximo de t = n/2 arredondado para baixo

## Como rodar os testes

No terminal, execute os comandos:

```bash
cd javascript
yarn
yarn test
```

Ou usando o NPM:

```bash
cd javascript
npm install
npm test
```
