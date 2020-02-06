import { delayCheck } from './delay-check';

function killApp(applicationId: string, timeout = 10000, delay = 1000) {
  toastLog(`停止应用${applicationId}中...`);

  let ele = delayCheck(
    timeout,
    delay,
    () => {
      return (
        textContains('FORCE STOP').findOnce() ||
        textContains('Force stop').findOnce() ||
        textContains('强制停止').findOnce()
      );
    },
    () => {
      openAppSetting(applicationId);
    }
  );

  if (!ele) {
    throw new Error('无法停止应用, exit');
  }

  ele.click();
  sleep(1000);

  ele = textContains('OK').findOnce() || textContains('确定').findOnce();
  ele?.click();

  sleep(3000);
}

export { killApp };