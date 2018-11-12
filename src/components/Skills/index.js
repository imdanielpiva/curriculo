import { Component } from '@/utils';
import request from '@/request';

import './styles.css';

const {
  mount,
  mountNodeFrom,
  mountNodesFrom,
  createNestedElements
} = Component;

const CATEGORIES_MAPPINGS = {
  devops: 'DevOps',
  tool: 'Ferramentas',
  concept: 'Conceitos',
  language: 'Linguagens',
  platform: 'Plataformas',
  framework: 'Frameworks',
  'online-tool': 'Workflow',
  database: 'Banco de Dados',
};

const CATEGORIES_SEQUENCE = [
  'language',
  'concept',
  'tool',
  'framework',  
  'platform',
  'database',
  'online-tool',
  'devops'
];

function renderSkillSets() {
  new Promise();
}

function Skills() {
  const skillsByCategory = (categories = []) => categories
    .reduce((byCategory, categoryItem) => {
      const categoryItems = byCategory[categoryItem.category];

      if (categoryItems !== undefined) {
        categoryItems.push(categoryItem);
      } else {
        byCategory[categoryItem.category] = [categoryItem];
      }

      return byCategory;
    }, {});

  return async () => {
    // Requisição dos recursos sobre habilidade.
    const { ok, status, ...response} = await request
      .get('/curriculum', {
        params: { skills: true }
      });

    if (!ok) return false;

    const { data: skillsList } = await response.json();

    // Criando os elementos DOM
    // desse componente dinamicamente.
    const [
      section,
      [anchor, [heading]],
      [content, [mainList]]
    ] = createNestedElements([
      'section',
      ['a', ['h2']],
      ['section', ['ul']]
    ]);

    // Carregando e criando o component de forma assíncrona.
    const SkillItem = await Component.lazy('SkillItem');

    const categorizedSkills = skillsByCategory(skillsList);

    const sequencialCategoriesList = CATEGORIES_SEQUENCE
      .map((key) => categorizedSkills[key]);
    
    // Usando `for of` para garantir a sequência de
    // inserção  dos elementos DOM em sua árvore.
    for (const categoryItems of sequencialCategoriesList) {
      const [parent, ...children] = createNestedElements([
        'li',
        ['a', ['h3']],
        ['ul']
      ]);

      const [[anchor, [categoryHeading]], [list]] = children;
      const categoryId = categoryItems[0].category;

      for (const skill of categoryItems) {
        const skillElement = await mount(SkillItem, skill);

        // Adicionando o elemento DOM da instância
        // do componente <SkillItem> a lista de habilidades;

        mountNodeFrom(skillElement.$el, list);
      }

      categoryHeading.textContent = CATEGORIES_MAPPINGS[
        categoryId
      ];

      categoryHeading.setAttribute('id', categoryId);
      anchor.setAttribute('href', `#${categoryId}`);

      list.classList.add('skills__list');
      parent.classList.add('skills__set');
      categoryHeading.classList.add('skills__category-heading');

      mountNodesFrom({ parent, children });
      mountNodeFrom(parent, mainList);
    };

    // Adicionando as atributos de cada elemento DOM.
    section.setAttribute('id', 'competencias-tecnicas');
    anchor.setAttribute('href', '#competencias-tecnicas');

    // Adicionando as classes de cada elemento DOM.
    content.classList.add('skills__content', 'subsection');
    mainList.classList.add('skills__category', 'flex', 'wrap', 'justify-start');
    section.classList.add('section', 'section--border-bottom', 'fadeIn');

    // Adicionando texto aos elementos.
    heading.textContent = 'Competências Técnicas';

    // Adicionando a lista de children
    // ao elemento DOM do componente.
    mountNodesFrom({
      children: [[anchor, [heading]], [content, [mainList]]],
      parent: section
    });

    return { $el: section };
  };
};

Skills.mount = async props => (await Skills(props))();

export default Skills;
