import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

export function ImageGalleryItem({ image }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const { tags, webImgURL } = image;
  return (
    <>
      <img
        className="imageGalleryItem-image"
        src={webImgURL}
        alt={tags}
        onClick={() => setShowModal(true)}
      />
      {showModal && <Modal showImage={image} onClose={toggleModal} />}
    </>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webImgURL: PropTypes.string,
    lgImgURL: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
};
