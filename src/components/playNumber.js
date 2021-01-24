const PlayNumber = (props) => {
  const number = props.number;

  const handleClick = () => {
    console.log(props.number);
  };

  return(
    <button className="number" onClick={handleClick}>{number}</button>
  );
};

export default PlayNumber;