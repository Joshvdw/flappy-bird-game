mergeInto(LibraryManager.library, {
  UnityToFrontend: function (functionName) {
    try {
      window.dispatchReactUnityEvent("UnityToFrontend", Pointer_stringify(functionName));
    } catch (e) {
      console.warn("Failed to dispatch event");
    }
  },
});
