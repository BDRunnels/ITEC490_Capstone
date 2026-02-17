import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import GoToTop from "../gototop/goToTop";
import Spinner from "../spinner/spinner";

const HomePage = ({filmData}) => {

    return(
        <Fragment>
            <br/>
            <h1 className="text-center"> The Super SIEM </h1>
            <div className="text-center">
                <h5> This is our Project </h5>
                <h5> Please use the links to select a page </h5>
                {/* { filmData ? filmData.map((film) => {
                    let filmId = ''
                    switch (film.episode_id) {
                        case 1: filmId = <img src='https://static.displate.com/460x640/displate/2017-02-28/da4a30fb53b2d14ea4504d8b5bf9f9ea.jpg' className="img-fluid" alt={film.title} />
                            break;
                        case 2: filmId = <img src='https://static.displate.com/460x640/displate/2017-02-28/afdd444f9dc42ccfe670b788e5b7b28a.jpg' className="img-fluid" alt={film.title} />
                            break;
                        case 3: filmId = <img src='https://static.displate.com/460x640/displate/2019-07-05/f0f5d90d8eab22c13098a0b5080f8f1d_080a44bc0ff0c1a37cb81aadb5592704.jpg' className="img-fluid" alt={film.title}/>
                            break;
                        case 4: filmId = <img src='https://static.displate.com/460x640/displate/2020-06-05/a1f4dc0d6566f95e095bbb3853172b26_25df69202becc94d4312fa630598d153.jpg' className="img-fluid" alt={film.title}/>
                            break;
                        case 5: filmId = <img src='https://static.displate.com/460x640/displate/2019-07-05/1775b27a536bec0511c19ffd7b62bd64_dd9669b9894bb1ef40cd09f24ad33975.jpg' className="img-fluid" alt={film.title}/>
                            break;
                        case 6: filmId = <img src='https://static.displate.com/460x640/displate/2019-07-05/580b3f84015725da31e5d4bf00ae73dc_59d3581d089062a2dd5ce3777b67de9c.jpg' className="img-fluid" alt={film.title}/>
                            break;
                        case 7: filmId = <img src='https://static.displate.com/460x640/displate/2018-03-21/1f0100fe38dbca34c83f74ccaf4edfb1_bf43bf7ad3264f5267f7f3436b87777f.jpg' className="img-fluid" alt={film.title}/>
                    };
                    return (
                    
                        <div className='bg-image container-fluid hover-overlay hover-zoom col-md-4 col-4 p-2 my-2' key={film.episode_id}>  
                            {filmId}
                            <Link to={`/films/${film.episode_id}`} className='text-bg-dark'>    
                                <div className='mask text-center'>    
                                    <div className='d-flex justify-content-center align-items-center h-100'
                                    style={{
                                    background: 'linear-gradient(45deg, rgba(255,255,255,.5), rgba(15, 14, 214, .5))',
                                    cursor: 'pointer'
                                    }}
                                    >
                                    </div>                            
                                </div>
                            </Link>     
                        </div>
                            

                    )
                }) : <Spinner/>
                } */}
            </div>
            <GoToTop />
        </Fragment> 
   );
};

export default HomePage;