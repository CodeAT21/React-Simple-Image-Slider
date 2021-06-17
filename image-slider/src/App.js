import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ImageSlider from './ImageSlider';
import './App.css';

function App() {
  const [isLoading, setLoading] = useState(false)
  const [isError, setError] = useState(false)
  const [isdata, setData] = useState({});
  const [allimage, setimage] = useState({});
 
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setError(false);
      axios.get("http://localhost:8080/ViewImage")
        .then(res => { // then print response status
          if(res.data.success === true){
            setData(res.data.listall);
            const images = res.data.listall.map((itemall) => (itemall.image));
            setimage(images)
            setLoading(true);
          }
        })
    } catch (error) { setError(true); }
    
  };

return (<>
    {isError && <div>Something went wrong ...</div>}
    <div className="banners">
          {isLoading === false ? (
            <div>Loading ...</div>
          ) : ( <>
              <ImageSlider images={allimage} alldata={isdata}/> 
        </> )}
    </div>

    {/* Json output */}

     <pre>{JSON.stringify(isdata, null, 2)} </pre>
</>
  );
}
export default App;