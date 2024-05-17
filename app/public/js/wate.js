(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports)
    : typeof define === "function" && define.amd
      ? define(["exports"], factory)
      : ((global =
          typeof globalThis !== "undefined" ? globalThis : global || self),
        factory((global.adminlte = {})));
})(this, function (exports) {
  "use strict";

  const domContentLoadedCallbacks = [];
  const onDOMContentLoaded = (callback) => {
    if (document.readyState === "loading") {
      // add listener on the first call when the document is in loading state
      if (!domContentLoadedCallbacks.length) {
        document.addEventListener("DOMContentLoaded", () => {
          for (const callback of domContentLoadedCallbacks) {
            callback();
          }
        });
      }
      domContentLoadedCallbacks.push(callback);
    } else {
      callback();
    }
  };
});
