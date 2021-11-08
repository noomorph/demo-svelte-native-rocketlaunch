export function CachePendingPromise() {
  let originalFunc: (...args: any[]) => Promise<unknown>;
  let value: Promise<unknown>;
  let isPending = false;

  function reset() {
    isPending = false;
  }

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    originalFunc = descriptor.value;

    descriptor.value = function CachePendingPromise__wrapper() {
      if (!isPending) {
        try {
          isPending = true;
          value = originalFunc.apply(this, arguments);
          value.then(reset, reset);
        } finally {
          reset();
        }
      }

      return value;
    };
  };
}
