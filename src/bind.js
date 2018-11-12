// É necessário adicionar esse código manualmente
// ao início do bundle pincipal, pois o Babel
// só colocaria ele após precisar desse método,
// mesmo ele não existindo. Isso é para o IE.

if (!Function.prototype.bind) {
  Function.prototype.bind = function (context /* ...args */) {
    var fn = this;
    var args = Array.prototype.slice.call(arguments, 1);

    if (typeof(fn) !== 'function') {
      throw new TypeError('Function.prototype.bind - context must be a valid function');
    }

    return function () {
      return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
    };
  };
}
