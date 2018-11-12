import {
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

    paragraph.style.color = 'var(--light-grey-1);'
    startDateEl.classList.add('table__row-text');
    endDateEl.classList.add('table__row-text');
    startDateTitleEl.classList.add('table__col-title');
    endDateTitleEl.classList.add('table__col-title');

    return { $el: parent };
  };
}

CompanyItem.mount = async props => (await CompanyItem(props))();

export default CompanyItem;
