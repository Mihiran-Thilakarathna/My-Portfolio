// Defers heavy work so it doesn't jank the intro or the reveal.
let written = false;
let done = false;
const onWritten = new Set<() => void>();
const onDone = new Set<() => void>();

// The signature is fully written and sits still until the intro fades out
export const markIntroWritten = () => {
  written = true;
  onWritten.forEach(run => run());
  onWritten.clear();
};

export const markIntroDone = () => {
  markIntroWritten();
  done = true;
  onDone.forEach(run => run());
  onDone.clear();
};

// Runs `task` while the finished signature is on screen (any hitch is invisible there).
// Returns a cancel function.
export const whenIntroWritten = (task: () => void) => {
  if (written) {
    task();
    return () => {};
  }
  onWritten.add(task);
  return () => {
    onWritten.delete(task);
  };
};

// Runs `task` on idle, `settle` ms after the intro ends. Returns a cancel function.
export const whenIdleAfterIntro = (task: () => void, settle = 1800) => {
  let timer = 0;
  let idle = 0;
  const schedule = () => {
    timer = window.setTimeout(() => {
      if ('requestIdleCallback' in window) idle = window.requestIdleCallback(task, { timeout: 2000 });
      else task();
    }, settle);
  };
  if (done) schedule();
  else onDone.add(schedule);
  return () => {
    onDone.delete(schedule);
    clearTimeout(timer);
    if (idle) window.cancelIdleCallback(idle);
  };
};
