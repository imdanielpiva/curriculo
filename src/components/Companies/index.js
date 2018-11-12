import { Component, setClassName } from '@/utils';
import request from '@/request';
import CompanyItem from '@/components/CompanyItem';

import './styles.css';

const {
  mount,
  mountNodeFrom,
  mountNodesFrom,
  createNestedElements
} = Component;

function Companies() {
  return async () => {
    // Requisição dos recursos sobre experiência profissional.
    const { ok, status, ...response} = await request
      .get('/curriculum', {
        params: { companies: true }
      });

    if (!ok) return false;

    const { data: companiesList } = await response.json();

    const [
      parent,
      ...children
    ] = createNestedElements([
      'section',
      ['a', ['h2']],
      'ul'
    ]);

  mountNodesFrom({
      parent,
      children
    });

    const [[anchor, [heading]], list] = children;

    parent.setAttribute('id', 'experiencia-profissional');
    anchor.setAttribute('href', '#experiencia-profissional');

    setClassName('work-experience__list', list);
    setClassName('section section--border-bottom fadeIn', parent);

    heading.textContent = 'Experiência Profissional';

    for (const company of companiesList) {
      const companyItemElement = await mount(CompanyItem, company);

      mountNodeFrom(companyItemElement.$el, list);
    }

    return { $el: parent };
  };
}

Companies.mount = async () => (await Companies())();

export default Companies;
