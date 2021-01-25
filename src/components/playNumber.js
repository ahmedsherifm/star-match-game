import colors from "../utils/colors";

const PlayNumber = (props) => {
  const number = props.number;
  const status = props.status;

  const handleClick = () => {
    props.onClick(number, status);
  };

  return (
    <button
      className="number"
      onClick={handleClick}
      style={{ backgroundColor: colors[status] }}
    >
      {number}
    </button>
  );
};

export default PlayNumber;
