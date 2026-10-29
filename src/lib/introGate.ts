// Defers heavy work until after the intro so it doesn't jank the reveal.
let done = false;
const waiting = new Set<() => void>();

export const markIntroDone = () => {
  done = true;
  waiting.forEach(run => run());
  waiting.clear();
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
  else waiting.add(schedule);
  return () => {
    waiting.delete(schedule);
    clearTimeout(timer);
    if (idle) window.cancelIdleCallback(idle);
  };
};
