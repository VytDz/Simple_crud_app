import { setLoading, setlistOfResrevations } from '@/store/store';
import { findReservations } from '@/services/dataService';

const init = ():void => {
  setLoading(true);
  findReservations().then((res: any) => {
    if (res.data && res.data.length > 0) {
      setlistOfResrevations(res.data);
    } else {
      // eslint-disable-next-line
      console.error('No data found');
    }
  }).finally(
    setLoading(false),
  );
};

export default init;
