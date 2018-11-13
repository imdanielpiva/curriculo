import { Component, setClassName } from '@/utils';

const {
  mountNodesFrom,
  createNestedElements
} = Component;

import './styles.css';

const LEVELS_MAPPINGS = {
  basic: 'Básico',
  advanced: 'Avançado',
  proficient: 'Proficiente'
};

function SkillItem({
  name,
  level = ''
}) {
  return async () => {
    const [
      parent,
      rest
    ] = createNestedElements([
      'li',
      [
        'div',
        [
          'div',
          [
            'h4',
            'p'
          ]
        ]
      ]
    ]);

    const [
      contentEl,
      [
        textAndDescriptionEl,
        [headingEl, descriptionEl]
      ]
    ] = rest;

    // Aplicando classes aos elementos
    setClassName('skill-item', parent);
    setClassName('skill-item__content', contentEl);
    setClassName('skill-item__text-content', textAndDescriptionEl);

    headingEl.textContent = name;
    descriptionEl.textContent = LEVELS_MAPPINGS[level];
  
    const template = [
      [
        contentEl,
        [
          textAndDescriptionEl,
          [
            headingEl,
            descriptionEl
          ]
        ]
      ]
    ];

    mountNodesFrom({
      parent,
      children: template
    });

    return { $el: parent };
  };
}

SkillItem.mount = async props => (await SkillItem(props))();

export default SkillItem;
