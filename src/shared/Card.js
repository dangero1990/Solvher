function Card({ title, children, ...props }) {
  return (
    <div {...props} className='card'>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default Card;
