function Card({ title, children, ...props }) {
  return (
    <div {...props} className='card'>
      <h2>{title}</h2>
      {children}
    </div>
  );
}

export default Card;
