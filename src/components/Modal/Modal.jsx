import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export function Modal({ showImage, onClose }) {
  useEffect(() => {
    function handleKeyDown(evt) {
      if (evt.code === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  function handleBackdropClick(evt) {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  }

  return createPortal(
    <div className="overlay" onClick={handleBackdropClick}>
      <div className="modal">
        <img src={showImage.lgImgURL} alt={showImage.tags} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  showImage: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webImgURL: PropTypes.string,
    lgImgURL: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,

  onClose: PropTypes.func.isRequired,
};
