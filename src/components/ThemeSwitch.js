import { Component } from '@/utils';

const {
  createElement,
  createNestedElements,
  mountNodesFrom
} = Component;

function ThemeSwitch({ theme }) {
  return () => {
    let value = theme;

    const [
      themeControl,
      [
        [heading],
        [
          themeControlController,
          [
            lightControl,
            [lightInput, lightLabel]
          ],
          [
            darkControl,
            [darkInput, darkLabel]
          ]
        ]
      ]
    ] = createNestedElements([
      'div',
      [
        ['h2'],
        [
          'div',
          [
            'div',
            ['input', 'label']
          ],
          [
            'div',
            ['input', 'label']
          ]
        ]
      ]
    ]);

    const app = document.body.firstElementChild;
    const styleEl = createElement('style');

    mountNodesFrom({
      parent: themeControl,
      children: [
        [heading],
        [
          themeControlController,
          [
            [
              lightControl,
              [lightInput, lightLabel]
            ],
            [
              darkControl,
              [darkInput, darkLabel]
            ]
          ]
        ]
      ]
    });

    document.head.appendChild(styleEl);

    // Adicionando as classes aos elementos DOM.
    themeControl.classList.add('theme-control', 'fadeIn');
    heading.classList.add('theme-control__title');
    themeControlController.classList.add('theme-control__controllers');
    lightControl.classList.add('theme-control__input');
    darkControl.classList.add('theme-control__input');

    // Adicionando conteúdo de texto aos elementos DOM.
    heading.textContent = 'Tema';
    lightLabel.textContent = 'Light';
    darkLabel.textContent = 'Dark';

    // Adicionando attributos aos elementos DOM.
    lightInput.setAttribute('id', 'light');
    lightInput.setAttribute('type', 'radio');
    lightInput.setAttribute('name', 'switch');
    lightInput.setAttribute('value', 'light');
    lightInput.setAttribute('checked', true);
    lightLabel.setAttribute('for', 'light');
  
    darkInput.setAttribute('id', 'dark');
    darkInput.setAttribute('type', 'radio');
    darkInput.setAttribute('name', 'switch');
    darkInput.setAttribute('value', 'dark');
    darkLabel.setAttribute('for', 'dark');

    lightInput.addEventListener('change', () => {
      styleEl.textContent = `
        .theme--light {
          background: white;
        }

        .theme--light a, p,
        span, label, td {
          color: var(--light-grey-1) !important;
        }
      
        .theme--light
        h1, h2, h3,
        h4, h5, h6, div {
          color: var(--black) !important;
        }
      `;

      value = lightInput.value;

      app.classList.remove('theme--dark');
      app.classList.add('theme--light');
    });

    darkInput.addEventListener('change', () => {
      styleEl.textContent = `
        .theme--dark {
          background: var(--black);
        }
        
        .theme--dark
        a, p, span, label, h1, h2, h3,
        h4, h5, h6, div, th,
        tr, td {
          font-weight: lighter;
          color: white !important;
        }
      `;

      value = darkInput.value;

      app.classList.remove('theme--light');
      app.classList.add('theme--dark');
    });

    // Disparando o evento `change` para o input,
    // assim logo que o componente é iniciado
    // é aplicado o tema light.
    if (value === 'light') {
      lightInput.checked = true;

      lightInput.dispatchEvent(new CustomEvent('change'));
    } else {
      darkInput.checked = true;

      darkInput.dispatchEvent(new CustomEvent('change'));
    }

    return { $el: themeControl };
  };
}

ThemeSwitch.mount = props => ThemeSwitch(props)();

export default ThemeSwitch;
