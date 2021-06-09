import { setLoading } from '@/store/store';

const init = () => {
  setLoading(true);
  // loadVersion();
  // loadConfig(settings.local.configUrl)
  //   .then((response) => {
  //     applySettings(response.data);
  //   })
  //   .finally(() => {
  //       setLoading(false);
  //     }
  //   )
};

export default init;
