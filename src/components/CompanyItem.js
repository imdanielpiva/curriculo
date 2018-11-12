import {
  setClassName,
  appendNestedElements,
  createNestedElements
} from '@/utils';

function CompanyItem({
  name,
  role,
  endDate,
  startDate,
  description
}) {
  return async () => {
    const [
      parent,
      ...children
    ] = createNestedElements([
      'li',
      [
        'div',
        ['h3', 'h4', 'p']
      ],
      'table',
      [
        'tbody',
        [
          'tr',
          ['th', 'th']
        ],
        [
          'tr',
          ['td', 'td']
        ]
      ]
    ]);

    const [
      [
        descriptionContainer,
        [companyNameEl, roleEl, paragraph]
      ],
      table,
      [
        tBody,
        [trTitles, [startDateTitleEl, endDateTitleEl]],
        [trContent, [startDateEl, endDateEl]]
		  ]
    ] = children;

    appendNestedElements({
      parent,
      children: [
        [
          descriptionContainer,
          [companyNameEl, roleEl, paragraph]
        ],
        [table, [tBody]]
      ]
    });

    appendNestedElements({
      parent: tBody,
      children: [
        [trTitles, [startDateTitleEl, endDateTitleEl]],
        [trContent, [startDateEl, endDateEl]]
      ]
    });

    // Adicionando conteúdo em texto aos elementos DOM.
    roleEl.textContent = role;
    companyNameEl.textContent = name;
    paragraph.textContent = description;
    endDateEl.textContent = new Date(endDate).toLocaleDateString();
    startDateEl.textContent = new Date(startDate).toLocaleDateString();
    startDateTitleEl.textContent = 'Ínicio';
    endDateTitleEl.textContent = 'Término';

    // Adicionando classes e estilos aos elementos DOM.
    paragraph.style.color = '#6a737d'

    setClassName('table__row-text', startDateEl);
    setClassName('table__row-text', endDateEl);
    setClassName('table__col-title', startDateTitleEl);
    setClassName('table__col-title', endDateTitleEl);

    return { $el: parent };
  };
}

CompanyItem.mount = async props => (await CompanyItem(props))();

export default CompanyItem;
