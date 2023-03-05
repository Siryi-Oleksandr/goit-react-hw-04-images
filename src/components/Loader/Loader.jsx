import { ThreeDots } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <div className="loader-container">
      <ThreeDots
        height="100"
        width="100"
        radius="20"
        color="#3f51b5"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
      ;
    </div>
  );
};
