import { v4 } from 'uuid';
import AutoInput from '../components/AutoInput';
import Button from '../components/Button';
import Select from '../components/Select';
import { statusOpt, typeOpt } from '../utils/constants';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../redux/slices/jobSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const AddJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

   
    const formData = new FormData(e.target);

    
    const newJob = Object.fromEntries(formData.entries());

    
    newJob.id = v4();
    newJob.date = Date.now();

    
    api
      .post('/jobs', newJob)
      
      .then(() => {
        
        dispatch(createJob(newJob));
        toast.success('Yeni başvuru eklendi');

       
        navigate('/');
      })
      
      .catch(() => toast.error('Bir sorun oluştu'));
  };

  return (
    <div className="add-page">
      <section className="container">
        <h2>Yeni İş Ekle</h2>

        <form onSubmit={handleSubmit}>
          <AutoInput label="Pozisyon" name="position" />
          <AutoInput label="Şirket" name="company" />
          <AutoInput label="Lokasyon" name="location" />

          <Select label="Durum" name="status" options={statusOpt} />
          <Select label="Tür" name="type" options={typeOpt} />

          <div>
            <Button text="Oluştur" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;