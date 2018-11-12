import { appendAfter, mount } from '@/utils';

import Skills from '@/components/Skills';
import Companies from '@/components/Companies';
import ThemeSwtich from '@/components/ThemeSwitch.js';

async function App() {
  const $el = document.querySelector('#app');

  // Pegando os parâmetros passados na url.
  const { theme } = window.location.search.includes('?')
    ? window.location.search
      .slice(1)
      .split('&')
      .map((item) => item.split('='))
      .reduce((query, param) => {
        const [key, value] = param;

        query[key] = value;

        return query;
      }, {}): {};

  // Para facilitar a instanciação do componente,
  // cada componente tem sua função `mount`,
  // a qual recebe os parâmetros e retorna a instância.

  // Já função importada `mount` acima é simplesmente
  // um "wrapper": recebe o componente e os parâmetros
  // do componente e chama o método `mount` do componente
  // passando os parâmetros recebidos.

  const companies = await mount(Companies);
  const skills = await mount(Skills);

  // Inserindo componentes no DOM.

  appendAfter(
    skills.$el,
    document.querySelector('#formacao')
  );

  appendAfter(
    companies.$el,
    document.querySelector('#informacoes-pessoais')
  );

  // Não cria nem monta o <ThemeSwitch>
  // caso a página seja específica do tema.
  const { href } = window.location;

  if (!(
    (
      !href.includes('dark-theme.html') &&
      href.includes('light-theme.html')
    ) ||
    (
      href.includes('dark-theme.html') &&
      !href.includes('light-theme.html')
    )
    )) {
    const themeSwitch = await mount(ThemeSwtich, {
      theme: theme === 'dark' ? theme : 'light'
    });

    appendAfter(
      themeSwitch.$el,
      document.querySelector('#daniel-piva-lemes-felicio a')
    );
  }

  return () => { return { $el, state }; };
};

App.mount = () => App();

export default App;
