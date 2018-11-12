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
  +-- __dist/__<br>
  |   +-- <i>arquivos de distribuição...</i><br>
  +-- __src/__<br>
  |   +-- footer.html<br>
  |   +-- header.html<br>
  +---- __assets/__<br>
  |   +---- __css/__<br>
  |   +------ styles.css<br>
  |   +---- __font/__<br>
  |   +------ <i>arquivos de fonte ...</i><br>
  +---- __components__<br>
  |   +---- __Companies/__<br>
  |   +------ index.js<br>
  |   +------ styles.css<br>
  |   +---- __SkillItem/__<br>
  |   +------ index.js<br>
  |   +------ styles.css<br>
  |   +----- __Skills/__<br>
  |   +------ index.js<br>
  |   +------ styles.css<br>
  |   +----- App.js<br>
  |   +----- CompanyItem.js<br>
  |   +----- ThemeSwitch.js<br>
  +---- __public/__<br>
  |   +-- index.html<br>
  |   +-- dark-theme.html<br>
  |   +-- light-theme.html<br>
  +---- __request/__<br>
  |   +-- request.js<br>
  |   +-- index.js<br>
  +-- bind.js<br>
  +-- meta.json<br>
  +-- utils.js<br>
  +-- index.js<br>
  +-- __tests/__<br>
  |   +---- __unit/__<br>
  |   +------ <i>arquivos de testes unitários...</i><br>
  | <i>arquivos de configuração...</i><br>

## Autor

<a href="https://linkedin.com/in/imdanielpiva" target="_blank">Daniel Piva Lemes Felicio</a>
