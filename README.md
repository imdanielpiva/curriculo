# Currículo [![Build Status](https://travis-ci.org/imdanielpiva/curriculo.svg?branch=master)](https://travis-ci.org/imdanielpiva/curriculo)

Uma aplicação web sobre sobre meu currículo, originalmente criada para participar do processo seletivo da Advise Londrina.

## Detalhes

É possível acessar o website clicando <a href="https://danielpiva.surge.sh" target="_blank">aqui</a>. O website aceita o parâmetro `theme` como query, onde os valores podem ser `light` ou `dark`, ex.: `https://danielpiva.surge.sh?theme=dark`. Essa aplicação não utiliza nenhum framework ou biblioteca para criação e manipulação da interface.

- [x] SEO
- [x] Acessibilidade
- [x] HTML, CSS + JavaScript
- [x] Webpack + Babel
- [x] Continuous integration

## Rodando o Projeto
Para rodar o projeto você precisa no mínimo ter o  [`node`](http://nodejs.org) e opcionalmente [`yarn`](http://yarnpkg.com) e [`git`](https://git-scm.com/downloads).


```bash

> git clone https://github.com/imdanielpiva/curriculo.git

> cd curriculo

# sirva o projeto localmente
> yarn serve

```

## Estrutura de Pastas

.
  +-- __dist/__
  |   +-- <i>arquivos de distribuição...</i>
  +-- __src/__
  |   +-- footer.html
  |   +-- header.html
  +---- __assets/__
  |   +---- __css/__
  |   +------ styles.css
  |   +---- __font/__
  |   +------ <i>arquivos de fonte ...</i>
  +---- __components__
  |   +---- __Companies/__
  |   +------ index.js
  |   +------ styles.css
  |   +---- __SkillItem/__
  |   +------ index.js
  |   +------ styles.css
  |   +----- __Skills/__
  |   +------ index.js
  |   +------ styles.css
  |   +----- App.js
  |   +----- CompanyItem.js
  |   +----- ThemeSwitch.js
  +---- __public/__
  |   +-- index.html
  |   +-- dark-theme.html
  |   +-- light-theme.html
  +---- __request/__
  |   +-- request.js
  |   +-- index.js
  +-- bind.js
  +-- meta.json
  +-- utils.js
  +-- index.js
  +-- __tests/__
  |   +---- __unit/__
  |   +------ <i>arquivos de testes unitários...</i>
  | <i>arquivos de configuração...</i>

## Autor

<a href="https://linkedin.com/in/imdanielpiva" target="_blank">Daniel Piva Lemes Felicio</a>
