import PropTypes from 'prop-types';

export function Button({ onLoadMore }) {
  return (
    <button className="button" type="button" onClick={() => onLoadMore()}>
      Load more
    </button>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
