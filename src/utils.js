export const hasXMLHttpRequestCORS = ('withCredentials' in new XMLHttpRequest());

export const hasXDomainSupport = typeof window.XDomainRequest !== undefined;

export const mount = (Component, props) => Component.mount(props);

export const getParent = (element = []) => ({
  element: element[0],
  append,
  remove
});

export const getChildren = (element = []) => ({
  list: element.children,
  append,
  remove
})

export const remove = element => element.remove();

export const append = (element, target) => target.appendChild(element);

export const appendAfter = (element, target) =>
  target.insertAdjacentElement('afterend', element);

export const createElement = tagName => document.createElement(tagName);

export const lazyComponent = async component =>
  import(`@/components/${component}`);

export const appendNestedElements = ({ parent, children = [] }) => {
  children.forEach((childOrChildren) => {
    if (Array.isArray(childOrChildren)) {
      const firstChild = childOrChildren[0];
      
       if (childOrChildren.length >= 1) {
        append(firstChild, parent);

        if (childOrChildren.length >= 2) {
          const childrenAfterFirstChild = childOrChildren.slice(1)[0];

          if (Array.isArray(childrenAfterFirstChild)) {
            appendNestedElements({
              parent: firstChild,
              children: childrenAfterFirstChild
            });
          } else {
            append(childrenAfterFirstChild, parent);
          }
        }
      }

      return;
    }

    append(childOrChildren, parent);
  });

  return parent;
};

export const createNestedElements = (tagNames = []) =>
  tagNames.reduce((createdElements, childOrChildren) => {
    if (Array.isArray(childOrChildren)) {
      createdElements.push(createNestedElements(childOrChildren));

      return createdElements;
    }

    createdElements.push(createElement(childOrChildren));

    return createdElements;
  }, []);

export const domStyleObjectToStr = (object = {}) =>
  Object
    .keys(object)
    .reduce((styleStr, key) => (`${key}:${object[key]};`), '');

export const setElementStyle = (element, style) =>
  element.setAttribute('style', domStyleObjectToStr(style));

export const querifySimple = (object = {}) => {
  const paramsKeyList = Object.keys(object);
    
  
  const query = paramsKeyList.reduce((queryStr, key) => {
    if (!paramsKeyList.length) {
      return `${key}=${object[key]}`;
    }

    return `${queryStr}&${key}=${object[key]}`;
  }, '');

    return query ? `?${query}` : '';
};

export const swapElementClasses = ({
  classes = ['', ''],
  element
}) => {
  const [first, second] = classes;

  element.classList.remove(first);
  element.classList.add(second);

  return [second, first];
};

export const Component = {
  parent: getParent,
  children: getChildren,
  setStyle: setElementStyle,
  swapClasses: swapElementClasses,
  createElement,
  createNestedElements,
  unMount: remove,
  mount,
  mountNodeFrom: append,
  mountNodesFrom: appendNestedElements,
  lazy: async component =>
    (await lazyComponent(component)).default
};

