import { setLoading, setlistOfResrevations } from '@/store/store';
import { getAll } from '@/services/dataService';

const init = () => {
  setLoading(true);
  getAll().then((res: any) => {
    if (res.data && res.data.length > 0) {
      setlistOfResrevations(res.data);
    } else {
      console.error('No data found');
    }
  }).finally(
    setLoading(false),
  );
};

export default init;
