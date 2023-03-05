import React, { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImagesWithQuery, handleFetchData } from '../services/api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Error } from './Error/Error';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (query === '') {
      return setStatus('idle');
    }

    setStatus('pending');

    async function fetchData() {
      try {
        const data = await fetchImagesWithQuery(query, page);

        // when bad request
        if (data.images.length === 0) {
          setImages([]);
          setTotalPages(0);
          setStatus('not found');

          return toast.info(`"${query}" not found!`);
        }

        const handleImages = handleFetchData(data.images);
        setImages(prevImages => [...prevImages, ...handleImages]);
        setStatus('resolved');
        setTotalPages(data.totalPages);
      } catch (error) {
        setError(error);
        setStatus('rejected');
        toast.error(`Something went wrong`);
      }
    }

    fetchData();
  }, [query, page]);

  const handleSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const availablePages = totalPages > page;

  return (
    <div>
      <Searchbar onSubmit={handleSubmit} />
      {status === 'pending' && <Loader />}
      {images.length > 0 && <ImageGallery images={images} />}
      {availablePages && <Button onLoadMore={loadMore} />}
      {status === 'rejected' && <Error error={error.message} />}
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
}
