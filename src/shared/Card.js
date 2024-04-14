function Card({ title, children, instructions, ...props }) {
  return (
    <section
      {...props}
      className='card w-[445px] max-w-[90%] my-8 mx-auto p-12 bg-card_color rounded-2xl'
    >
      <h2 className='font-bold text-xl mb-4'>{title}</h2>
      <article className='mb-4'>
        <h3 className='mb-4'>Instructions</h3>
        <ol className='list-decimal'>
          {instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </article>
      <hr className='border-t-2 border-primary_blue mb-8' />
      {children}
    </section>
  );
}

export default Card;
