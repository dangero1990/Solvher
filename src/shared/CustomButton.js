export default function CustomButton({ text, ...props }) {
  return (
    <button
      className='text-white bg-primary_blue font-bold border-none uppercase py-2 px-4 rounded-3xl'
      {...props}
    >
      {text}
    </button>
  );
}
